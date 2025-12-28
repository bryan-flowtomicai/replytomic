import { getSupabaseAdmin } from './supabase';

// Tier limits
const TIER_LIMITS = {
  free: 25,
  creator_pro: -1, // unlimited
  agency: -1, // unlimited
};

// Get current month in YYYY-MM format
function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Check if Supabase is configured
function checkSupabase() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn('Supabase not configured - database operations will be skipped');
    return null;
  }
  return supabase;
}

// Get or create user by Clerk ID
export async function getOrCreateUser(clerkUserId: string, email?: string, name?: string) {
  const supabase = checkSupabase();
  
  // If Supabase is not configured, return a mock user for development
  if (!supabase) {
    return { 
      user: {
        id: 'dev-user-id',
        clerk_user_id: clerkUserId,
        email: email || '',
        name: name || '',
        subscription_tier: 'free',
        subscription_status: 'active',
        onboarding_completed: false,
      }, 
      error: null 
    };
  }

  // First try to find existing user
  const { data: existingUser, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single();

  if (existingUser) {
    return { user: existingUser, error: null };
  }

  // Create new user if not found
  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert({
      clerk_user_id: clerkUserId,
      email: email || '',
      name: name || '',
      subscription_tier: 'free',
      subscription_status: 'active',
    })
    .select()
    .single();

  if (createError) {
    console.error('Error creating user:', createError);
    return { user: null, error: createError };
  }

  // Create initial analytics record
  await supabase
    .from('analytics')
    .insert({
      user_id: newUser.id,
      total_replies_generated: 0,
      total_time_saved_minutes: 0,
      platform_breakdown: {},
      favorite_tones: {},
    });

  return { user: newUser, error: null };
}

// Get user's usage for current month
export async function getMonthlyUsage(userId: string) {
  const supabase = checkSupabase();
  const month = getCurrentMonth();
  
  if (!supabase) {
    return {
      usage: {
        user_id: userId,
        month,
        reply_count: 0,
        platforms_used: {},
      },
      error: null,
    };
  }

  const { data, error } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting usage:', error);
    return { usage: null, error };
  }

  if (!data) {
    return {
      usage: {
        user_id: userId,
        month,
        reply_count: 0,
        platforms_used: {},
      },
      error: null,
    };
  }

  return { usage: data, error: null };
}

// Check if user can generate (hasn't hit limit)
export async function canUserGenerate(userId: string, tier: string): Promise<{ canGenerate: boolean; remaining: number; limit: number }> {
  const limit = TIER_LIMITS[tier as keyof typeof TIER_LIMITS] || TIER_LIMITS.free;
  
  if (limit === -1) {
    return { canGenerate: true, remaining: -1, limit: -1 };
  }

  const { usage } = await getMonthlyUsage(userId);
  const currentCount = usage?.reply_count || 0;
  const remaining = Math.max(0, limit - currentCount);

  return {
    canGenerate: currentCount < limit,
    remaining,
    limit,
  };
}

// Increment usage count
export async function incrementUsage(userId: string, platform: string, repliesGenerated: number = 5) {
  const supabase = checkSupabase();
  if (!supabase) return { error: null };
  
  const month = getCurrentMonth();
  const { usage } = await getMonthlyUsage(userId);
  
  if (!usage || usage.reply_count === 0) {
    const { error } = await supabase
      .from('usage')
      .insert({
        user_id: userId,
        month,
        reply_count: repliesGenerated,
        platforms_used: { [platform]: repliesGenerated },
      });
    return { error };
  }

  const platformsUsed = usage.platforms_used || {};
  platformsUsed[platform] = (platformsUsed[platform] || 0) + repliesGenerated;

  const { error } = await supabase
    .from('usage')
    .upsert({
      user_id: userId,
      month,
      reply_count: (usage.reply_count || 0) + repliesGenerated,
      platforms_used: platformsUsed,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,month',
    });

  return { error };
}

// Save generation to history
export async function saveGeneration(
  userId: string,
  platform: string,
  commentText: string,
  originalPost: string | null,
  tonesRequested: string[],
  replies: any[]
) {
  const supabase = checkSupabase();
  if (!supabase) return { generation: null, error: null };

  const { data, error } = await supabase
    .from('generations')
    .insert({
      user_id: userId,
      platform,
      comment_text: commentText,
      original_post: originalPost,
      tones_requested: tonesRequested,
      replies,
    })
    .select()
    .single();

  return { generation: data, error };
}

// Get user's generation history
export async function getGenerationHistory(userId: string, limit: number = 20) {
  const supabase = checkSupabase();
  if (!supabase) return { generations: [], error: null };

  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { generations: data || [], error };
}

// Update analytics
export async function updateAnalytics(userId: string, platform: string, tonesUsed: string[], repliesCount: number) {
  const supabase = checkSupabase();
  if (!supabase) return { error: null };

  const { data: analytics } = await supabase
    .from('analytics')
    .select('*')
    .eq('user_id', userId)
    .single();

  const platformBreakdown = analytics?.platform_breakdown || {};
  platformBreakdown[platform] = (platformBreakdown[platform] || 0) + repliesCount;

  const favoriteTones = analytics?.favorite_tones || {};
  tonesUsed.forEach(tone => {
    favoriteTones[tone] = (favoriteTones[tone] || 0) + 1;
  });

  const timeSaved = (analytics?.total_time_saved_minutes || 0) + (repliesCount * 2.5);

  const { error } = await supabase
    .from('analytics')
    .upsert({
      user_id: userId,
      total_replies_generated: (analytics?.total_replies_generated || 0) + repliesCount,
      total_time_saved_minutes: Math.round(timeSaved),
      platform_breakdown: platformBreakdown,
      favorite_tones: favoriteTones,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
    });

  return { error };
}

// Get user analytics/stats
export async function getUserStats(userId: string) {
  const supabase = checkSupabase();
  if (!supabase) {
    return {
      analytics: null,
      usage: { reply_count: 0, platforms_used: {} },
      error: null,
    };
  }

  const [analyticsResult, usageResult] = await Promise.all([
    supabase.from('analytics').select('*').eq('user_id', userId).single(),
    getMonthlyUsage(userId),
  ]);

  return {
    analytics: analyticsResult.data,
    usage: usageResult.usage,
    error: analyticsResult.error || usageResult.error,
  };
}

// Update user subscription tier
export async function updateUserTier(userId: string, tier: 'free' | 'creator_pro' | 'agency', stripeCustomerId?: string) {
  const supabase = checkSupabase();
  if (!supabase) return { error: null };

  const { error } = await supabase
    .from('users')
    .update({
      subscription_tier: tier,
      stripe_customer_id: stripeCustomerId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  return { error };
}
