import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser, getUserStats, canUserGenerate } from "@/lib/db";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    const { user, error: userError } = await getOrCreateUser(
      clerkUserId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser?.firstName || clerkUser?.username || undefined
    );

    if (userError || !user) {
      return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
    }

    const { analytics, usage, error: statsError } = await getUserStats(user.id);
    
    if (statsError) {
      console.error("Error getting stats:", statsError);
    }

    const { remaining, limit } = await canUserGenerate(user.id, user.subscription_tier);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.subscription_tier,
        onboardingCompleted: user.onboarding_completed,
      },
      usage: {
        thisMonth: usage?.reply_count || 0,
        remaining,
        limit,
        platformsUsed: usage?.platforms_used || {},
      },
      stats: {
        totalGenerated: analytics?.total_replies_generated || 0,
        timeSavedMinutes: analytics?.total_time_saved_minutes || 0,
        platformBreakdown: analytics?.platform_breakdown || {},
        favoriteTones: analytics?.favorite_tones || {},
      },
    });
  } catch (error) {
    console.error("Error in usage API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
