# ReplyTomic - Multi-Platform AI Reply Generator

## 🎯 Project Overview
Build a web application that generates AI-powered replies for comments across YouTube, Instagram, TikTok, Twitter/X, LinkedIn, Facebook, and Reddit. Users select their platform, paste a comment (optionally with original post context), and get 5 platform-optimized reply options in different tones.

**Domain:** replytomic.xyz
**Goal:** Launch by Sunday night, get first paying customer by Wednesday.
**Target Market:** Content creators, influencers, social media managers, brands managing multiple platforms

---

## 📋 CURSOR PROMPT - COPY THIS ENTIRE SECTION

```
Build me a Next.js 14 web application called "ReplyTomic" - an AI-powered reply generator for social media comments across multiple platforms (YouTube, Instagram, TikTok, Twitter/X, LinkedIn, Facebook, Reddit).

TECH STACK:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Clerk for authentication
- Anthropic Claude API (Sonnet 4)
- Stripe for payments
- Supabase for database
- Vercel for hosting

CORE FEATURES:

1. LANDING PAGE (/):
   - Hero section with clear value prop: "Reply to Every Comment in Seconds, Not Hours"
   - Subheading: "AI-powered replies for YouTube, Instagram, TikTok, Twitter, LinkedIn & more"
   - Platform logos displayed prominently
   - Problem/Solution section:
     * Problem: "Content creators waste 10+ hours per week responding to comments"
     * Solution: "ReplyTomic generates platform-optimized replies in 15 seconds"
   - How it works (3 steps):
     1. Select your platform (YouTube, Instagram, etc.)
     2. Paste the comment (optionally add original post for context)
     3. Get 5 AI-generated reply options → copy & paste
   - Social proof section: "Join 500+ creators saving 10 hours per week"
   - Pricing table (Free, Creator Pro, Agency tiers)
   - CTA buttons: "Start Free" and "Get Started"
   - Modern design with gradient background (purple/blue theme)
   - Platform comparison table showing character limits and tone differences

2. DASHBOARD (/dashboard):
   - Protected route (requires Clerk auth)
   - Platform selector (prominent dropdown):
     * YouTube
     * Instagram
     * TikTok
     * Twitter/X
     * LinkedIn
     * Facebook
     * Reddit
     * Discord
   - Display platform-specific icon and character limit info
   - Optional context section:
     * Collapsible textarea: "Add original post for better context (optional)"
     * Placeholder: "Paste your original post/video title/caption here..."
   - Main comment input area:
     * Large textarea: "Paste the comment you want to reply to"
     * Character counter showing current length
     * Platform-specific character limit indicator
   - Tone selector (multi-select):
     * Helpful/Detailed
     * Casual/Friendly  
     * Witty/Humorous
     * Professional
     * Engaging/Question-based
   - Button: "Generate Replies" (with loading state showing funny messages)
   - Results section (shows after generation):
     * Display 5 reply variations
     * Each reply card shows:
       - Tone label badge with color coding
       - Reply text (optimized for platform)
       - Character count with color (green if under limit, yellow if close, red if over)
       - Copy button (with "Copied!" feedback animation)
       - Platform-appropriate emoji indicators
     * "Generate More" button to get different options
   - Usage counter: 
     * Free tier: "X/25 replies used this month"
     * Pro tier: "∞ Unlimited replies"
   - History sidebar (Pro tier):
     * Last 20 generated reply sets
     * Show platform icon, truncated comment, timestamp
     * Click to reload into generator
     * Search/filter by platform
   - Quick stats card:
     * Total replies generated
     * Time saved estimate (avg 2.5 min per reply)
     * Most-used platform
     * Favorite tone

3. AUTHENTICATION:
   - Clerk sign-up/sign-in with social options (Google, GitHub)
   - Onboarding flow after signup:
     * "What platforms do you create on?" (multi-select)
     * "What's your content niche?" (dropdown)
     * "How many comments do you get per week?" (estimate)
   - User profile page
   - Settings page with:
     * Personal info (name, content niche, primary platform)
     * Personalization settings:
       - Default platform selection
       - Preferred tones
       - Brand voice notes (Agency tier)
       - Emoji preference (low/medium/high)
     * Subscription status and billing
     * Usage statistics

4. PAYMENT SYSTEM:
   - Stripe integration with 3 tiers
   - Free tier: 25 replies/month, 3 platforms, 3 tone options
   - Creator Pro: $29/month - unlimited replies, all platforms, all tones, history, extension
   - Agency: $99/month - everything + 10 team seats, brand voice training, bulk mode, analytics
   - Upgrade prompts when hitting limits:
     * "You've used 25/25 free replies this month"
     * "Upgrade to Creator Pro for unlimited replies at $29/mo"
     * Show time saved calculation: "You've saved 1.2 hours this month. Imagine saving 10+ hours with Pro!"
   - Billing page to manage subscription
   - Team management page (Agency tier)

5. PLATFORM-SPECIFIC INTELLIGENCE:

   Platform configurations stored in constants:

   const PLATFORM_CONFIG = {
     youtube: {
       name: 'YouTube',
       maxLength: 500,
       recommendedLength: 150,
       style: 'conversational, helpful, detailed',
       systemPrompt: 'Generate YouTube comment replies that are friendly, detailed, and encourage further engagement. Include timestamps when relevant. Use emojis sparingly (1-2 per reply). Aim for 50-150 words. Be helpful and build community.',
       tones: ['helpful', 'casual', 'witty', 'engaging', 'supportive'],
       emojiLevel: 'low',
       tips: 'YouTube favors longer, more detailed responses. Ask follow-up questions to boost engagement.'
     },
     
     instagram: {
       name: 'Instagram',
       maxLength: 150,
       recommendedLength: 50,
       style: 'casual, friendly, emoji-heavy',
       systemPrompt: 'Generate Instagram comment replies that are casual, authentic, and emoji-rich. Keep it short and punchy (20-50 words). Match influencer energy. Use 3-5 emojis. Be fun and personable.',
       tones: ['casual', 'witty', 'supportive', 'hype', 'relatable'],
       emojiLevel: 'high',
       tips: 'Instagram loves quick, fun responses with lots of emojis. Reply within first hour for best algorithm boost.'
     },
     
     tiktok: {
       name: 'TikTok',
       maxLength: 100,
       recommendedLength: 30,
       style: 'trendy, playful, gen-z',
       systemPrompt: 'Generate TikTok comment replies using Gen Z language, current slang, and humor. Be playful, authentic, and trend-aware. Heavy emoji use (3-6 per reply). Keep it super short (10-30 words). Can be chaotic and fun.',
       tones: ['trendy', 'funny', 'relatable', 'unhinged', 'hype'],
       emojiLevel: 'very-high',
       tips: 'TikTok is fast-paced. Short, funny replies perform best. Use trending phrases and sounds.'
     },
     
     twitter: {
       name: 'Twitter/X',
       maxLength: 280,
       recommendedLength: 150,
       style: 'punchy, clever, concise',
       systemPrompt: 'Generate Twitter/X replies that are concise, witty, and engaging. Must be under 280 characters. Can be spicy, thoughtful, or humorous depending on tone. Minimal emojis (0-2). Be clever and quotable.',
       tones: ['witty', 'insightful', 'spicy', 'helpful', 'casual'],
       emojiLevel: 'very-low',
       tips: 'Twitter rewards clever, quotable responses. Keep it punchy. Less is more.'
     },
     
     linkedin: {
       name: 'LinkedIn',
       maxLength: 400,
       recommendedLength: 120,
       style: 'professional, insightful, conversational',
       systemPrompt: 'Generate professional LinkedIn replies that add value and encourage discussion. Be thoughtful and industry-relevant. Use 50-150 words. Minimal emojis (0-1). Build professional relationships.',
       tones: ['professional', 'insightful', 'thoughtful', 'collaborative', 'helpful'],
       emojiLevel: 'very-low',
       tips: 'LinkedIn values thoughtful, professional responses. Add insights, not just agreement.'
     },
     
     facebook: {
       name: 'Facebook',
       maxLength: 300,
       recommendedLength: 80,
       style: 'warm, community-focused, personal',
       systemPrompt: 'Generate friendly Facebook replies that build community. Be warm, conversational, and personal. Use 30-100 words. Moderate emoji use (1-3). Focus on connection and relationships.',
       tones: ['friendly', 'supportive', 'conversational', 'warm', 'helpful'],
       emojiLevel: 'medium',
       tips: 'Facebook is about community. Be warm and personable. Build relationships.'
     },
     
     reddit: {
       name: 'Reddit',
       maxLength: 1000,
       recommendedLength: 200,
       style: 'informative, authentic, no-bs',
       systemPrompt: 'Generate Reddit replies that are authentic, informative, and conversational. Redditors hate corporate speak. Be real, add value, cite sources when possible. Use 50-200 words. Almost no emojis (max 1). Be helpful or funny, never salesy.',
       tones: ['helpful', 'informative', 'witty', 'honest', 'casual'],
       emojiLevel: 'none',
       tips: 'Reddit values authenticity and substance. No corporate speak. Add real value or humor.'
     }
   }

6. API ROUTES:

   POST /api/generate-replies
   Request body: {
     comment: string,
     platform: string,
     originalPost?: string,
     tones: string[],
     userContext?: {
       niche: string,
       primaryPlatform: string,
       emojiPreference: string
     }
   }
   
   Process:
   - Validate user tier and usage limits
   - Get platform configuration
   - Build optimized Claude prompt with:
     * Platform-specific instructions
     * Original post context if provided
     * User's content niche for personalization
     * Requested tones
   - Call Claude API
   - Parse and validate responses
   - Check character limits per platform
   - Update usage count in database
   - Save to generation history
   
   Response: {
     replies: Array<{
       id: string,
       tone: string,
       text: string,
       length: number,
       withinLimit: boolean,
       emojiCount: number
     }>,
     platform: string,
     usageRemaining: number
   }

   POST /api/generate-bulk (Agency tier only)
   - Accept array of up to 20 comments
   - Generate reply for each
   - Return array of reply sets
   
   POST /api/webhook/stripe
   - Handle subscription events
   - Update user tier and status
   
   GET /api/usage
   - Return current month usage and limits
   
   GET /api/stats
   - Return user statistics (total replies, time saved, platform breakdown)

7. CLAUDE API INTEGRATION:
   
   Enhanced prompt structure with platform intelligence:
   
   ```
   You are an expert at crafting engaging social media replies for ${platform}.
   
   ORIGINAL POST (for context):
   ${originalPost || 'Not provided'}
   
   COMMENT TO REPLY TO:
   "${comment}"
   
   PLATFORM: ${platform}
   CHARACTER LIMIT: ${platformConfig.maxLength}
   RECOMMENDED LENGTH: ${platformConfig.recommendedLength}
   STYLE: ${platformConfig.style}
   EMOJI LEVEL: ${platformConfig.emojiLevel}
   
   USER CONTEXT:
   Content Niche: ${userNiche}
   Typical Platform: ${userPrimaryPlatform}
   
   ${platformConfig.systemPrompt}
   
   Generate 5 unique reply options in these tones: ${tones.join(', ')}
   
   CRITICAL REQUIREMENTS:
   - Stay under ${platformConfig.maxLength} characters STRICTLY
   - Match the platform's typical communication style
   - Sound natural and authentic, never robotic
   - Add value or build the relationship
   - Encourage further engagement when appropriate
   - Use appropriate emojis for ${platform} (${platformConfig.emojiLevel} usage)
   - If original post is provided, reference it naturally
   - Avoid generic responses like "Great post!" or "Thanks for sharing!"
   
   TONE DEFINITIONS:
   - helpful: Provide value, answer questions, be informative
   - casual: Friendly, laid-back, conversational
   - witty: Clever, funny, memorable
   - professional: Polished, industry-aware, thoughtful
   - engaging: Ask questions, encourage discussion, build community
   
   Return ONLY a JSON array with this exact format:
   [
     {
       "tone": "helpful",
       "text": "reply text here",
       "length": 142
     },
     ...
   ]
   
   NO preamble, NO markdown formatting, ONLY the JSON array.
   ```

8. DATABASE SCHEMA (Supabase):
   
   Table: users
   - id (uuid, primary key)
   - clerk_user_id (text, unique)
   - email (text)
   - name (text)
   - content_niche (text)
   - primary_platform (text)
   - emoji_preference (text: 'low' | 'medium' | 'high')
   - subscription_tier (text: 'free' | 'creator_pro' | 'agency')
   - subscription_status (text)
   - stripe_customer_id (text)
   - team_id (uuid, nullable) -- for agency team members
   - onboarding_completed (boolean)
   - created_at (timestamp)
   - updated_at (timestamp)
   
   Table: usage
   - id (uuid, primary key)
   - user_id (uuid, foreign key)
   - month (text, format: YYYY-MM)
   - reply_count (integer)
   - platforms_used (jsonb) -- track usage per platform
   - updated_at (timestamp)
   
   Table: generations
   - id (uuid, primary key)
   - user_id (uuid, foreign key)
   - platform (text)
   - comment_text (text)
   - original_post (text, nullable)
   - tones_requested (text[])
   - replies (jsonb)
   - selected_reply_id (text, nullable) -- track which one they used
   - created_at (timestamp)
   
   Table: teams (Agency tier)
   - id (uuid, primary key)
   - owner_user_id (uuid, foreign key)
   - name (text)
   - brand_voice_notes (text)
   - created_at (timestamp)
   
   Table: analytics
   - id (uuid, primary key)
   - user_id (uuid, foreign key)
   - total_replies_generated (integer)
   - total_time_saved_minutes (integer)
   - platform_breakdown (jsonb)
   - favorite_tones (jsonb)
   - updated_at (timestamp)

9. UI/UX REQUIREMENTS:
   - Fully mobile responsive (works great on phone)
   - Platform-specific color coding:
     * YouTube: Red accent
     * Instagram: Purple/Pink gradient
     * TikTok: Black/Cyan
     * Twitter: Blue
     * LinkedIn: Professional blue
     * Facebook: Blue
     * Reddit: Orange
   - Loading states with platform-specific messages:
     * "Crafting your YouTube reply..."
     * "Making you sound Instagram-perfect..."
     * "Generating TikTok-worthy wit..."
   - Error handling with helpful toast notifications
   - Copy button animation and success feedback
   - Character count color coding (green < 80%, yellow 80-100%, red > 100%)
   - Smooth fade-in animations for generated replies
   - Keyboard shortcuts:
     * Cmd/Ctrl + Enter to generate
     * Cmd/Ctrl + 1-5 to copy reply 1-5
   - Professional gradient color scheme (purple #8B5CF6 to blue #3B82F6)
   - Clean, modern design using Shadcn components
   - Platform icons from react-icons
   - Confetti animation on first successful generation

10. ADDITIONAL PAGES:

    /pricing:
    - Three-tier comparison table
    - FREE: 25 replies/month, 3 platforms, basic tones
    - CREATOR PRO ($29/mo): Unlimited replies, all 8 platforms, all tones, history, extension access
    - AGENCY ($99/mo): Everything + 10 team seats, brand voice training, bulk mode (20 at once), analytics dashboard
    - ROI calculator: "Save 10 hours/week = $400+/month in time value"
    - FAQ section
    - Testimonials from beta users
    
    /how-it-works:
    - Step-by-step tutorial with screenshots
    - Platform-specific examples
    - Video demo
    - Best practices by platform
    
    /examples:
    - Real examples organized by platform
    - Before/After: Manual reply vs ReplyTomic
    - Show different tones side-by-side
    
    /blog:
    - SEO-optimized content
    - "How to Reply to 100 YouTube Comments in 30 Minutes"
    - "Instagram Engagement Hacks for 2025"
    - "The Science of Social Media Reply Speed"
    
    /roadmap:
    - Public roadmap showing upcoming features
    - Vote on features
    - Recently shipped
    
    /terms: Terms of service
    /privacy: Privacy policy
    /contact: Contact form

11. ADVANCED FEATURES (Post-MVP):

    Brand Voice Training (Agency tier):
    - Upload 10-20 previous replies
    - AI analyzes style, tone, patterns
    - Generates replies in "your voice"
    
    Bulk Reply Mode (Agency tier):
    - Paste list of comments
    - Generate replies for all at once
    - Export as CSV
    
    Chrome Extension:
    - One-click reply generation
    - Hover over comment → click icon → get replies
    - Works on YouTube, Instagram web, Twitter, LinkedIn
    
    Analytics Dashboard (Agency tier):
    - Reply engagement tracking
    - Best-performing tones by platform
    - Time saved calculations
    - Team performance metrics

12. IMPLEMENTATION NOTES:
    - Use environment variables for all API keys
    - Implement rate limiting (10 requests per minute per user)
    - Cache platform configurations in memory
    - Add request/response logging for debugging
    - Optimize Claude API calls (batch when possible)
    - Add Sentry for error tracking (post-launch)
    - Use Vercel Analytics and Speed Insights
    - Include comprehensive SEO meta tags
    - Add structured data for rich snippets
    - Implement proper OpenGraph tags for social sharing

13. ERROR HANDLING:
    - Graceful failure if Claude API is down (show cached examples)
    - Clear, friendly error messages for users
    - Retry logic for transient failures (3 attempts)
    - Alert if user hits rate limits
    - Validate all inputs before API calls
    - Handle platform-specific edge cases

14. DEPLOYMENT:
    - Deploy to Vercel
    - Set up environment variables
    - Configure custom domain (replytomic.xyz)
    - Enable Vercel Analytics
    - Set up Stripe webhook URL
    - Add proper CORS headers
    - Configure CDN caching
    - Set up monitoring alerts

15. MONETIZATION & CONVERSION:
    - Exit-intent popup on free tier: "Wait! Get 50% off your first month"
    - Email drip campaign for free users showing time saved
    - Upgrade CTA in dashboard when hitting limits
    - Social proof: "Join 1,000+ creators saving 10 hours/week"
    - Money-back guarantee (30 days)
    - Referral program (give 1 month free, get 1 month free)

BUILD PRIORITY:
Start with core MVP (Steps 1-8), then iterate to add advanced features.

Step 1: Landing page with clear value prop
Step 2: Clerk authentication + onboarding
Step 3: Dashboard with platform selector and comment input
Step 4: Claude API integration with platform-specific prompts
Step 5: Reply generation and display
Step 6: Supabase database setup
Step 7: Usage tracking and limits
Step 8: Stripe integration for payments
Step 9: History and analytics
Step 10: Polish UI/UX
Step 11: Additional pages
Step 12: Deploy and test

Build this incrementally, testing each feature as you go. Focus on making the core reply generation experience FAST and DELIGHTFUL.
```

---

## 🔑 Environment Variables You'll Need

Create `.env.local` file:

```bash
# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=replytomic.xyz
```

---

## 📦 Setup Checklist

**Before you start building:**

1. ✅ **Create accounts:**
   - [ ] Clerk.com (free tier) - for auth
   - [ ] Anthropic Console (you have this) - for Claude API
   - [ ] Stripe (test mode) - for payments
   - [ ] Supabase (free tier) - for database
   - [ ] Vercel (free tier) - for hosting

2. ✅ **Install dependencies:**
```bash
npx create-next-app@latest replytomic --typescript --tailwind --app
cd replytomic
npm install @clerk/nextjs @anthropic-ai/sdk stripe @supabase/supabase-js
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast @radix-ui/react-select
npm install react-icons lucide-react
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea badge toast select dropdown-menu
```

3. ✅ **Configure Clerk:**
   - Enable email/password auth
   - Add redirect URLs (http://localhost:3000/*)
   - Copy API keys

4. ✅ **Configure Stripe:**
   - Create 3 products:
     * Free tier (no charge, 25 replies/month limit)
     * Creator Pro tier ($29/month subscription)
     * Agency tier ($99/month subscription)
   - Get API keys (test mode)
   - Set up webhook endpoint (after deployment)

5. ✅ **Set up Supabase:**
   - Create new project
   - Run SQL for database schema (see below)
   - Get connection string and keys

---

## 🗄️ Supabase Database Schema (SQL)

Run this in Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  content_niche TEXT,
  primary_platform TEXT,
  emoji_preference TEXT DEFAULT 'medium' CHECK (emoji_preference IN ('low', 'medium', 'high')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator_pro', 'agency')),
  subscription_status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  team_id UUID,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: YYYY-MM
  reply_count INTEGER DEFAULT 0,
  platforms_used JSONB DEFAULT '{}'::jsonb, -- Track usage per platform
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Generation history table
CREATE TABLE generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  original_post TEXT,
  tones_requested TEXT[],
  replies JSONB NOT NULL,
  selected_reply_id TEXT, -- Track which reply they chose
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table (for Agency tier)
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand_voice_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_replies_generated INTEGER DEFAULT 0,
  total_time_saved_minutes INTEGER DEFAULT 0,
  platform_breakdown JSONB DEFAULT '{}'::jsonb,
  favorite_tones JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_usage_user_month ON usage(user_id, month);
CREATE INDEX idx_generations_user ON generations(user_id);
CREATE INDEX idx_generations_platform ON generations(platform);
CREATE INDEX idx_generations_created ON generations(created_at DESC);
CREATE INDEX idx_teams_owner ON teams(owner_user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (clerk_user_id = auth.uid());
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (clerk_user_id = auth.uid());

CREATE POLICY "Users can view own usage" ON usage FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()));
CREATE POLICY "Users can view own generations" ON generations FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()));
CREATE POLICY "Users can view own analytics" ON analytics FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()));

-- Team policies (team members can view team data)
CREATE POLICY "Team members can view team" ON teams FOR SELECT USING (
  id IN (SELECT team_id FROM users WHERE clerk_user_id = auth.uid())
  OR owner_user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid())
);
```

---

## 🎨 Design Reference

**Color Scheme:**
- Primary: Purple-blue gradient (#8B5CF6 to #3B82F6)
- Background: White (#FFFFFF)
- Text: Gray-900 (#111827)
- Accent: Purple-600 (#9333EA)
- Success: Green-500 (#10B981)
- Warning: Yellow-500 (#F59E0B)
- Error: Red-500 (#EF4444)

**Platform-Specific Accent Colors:**
- YouTube: Red (#FF0000)
- Instagram: Purple/Pink gradient (#E1306C to #C13584)
- TikTok: Black/Cyan (#000000 / #00F2EA)
- Twitter/X: Blue (#1DA1F2)
- LinkedIn: Blue (#0A66C2)
- Facebook: Blue (#1877F2)
- Reddit: Orange (#FF4500)

**Font:**
- Inter (already in Next.js)

**Components to use from Shadcn:**
- Button (primary, secondary, ghost, outline variants)
- Card (for reply boxes, stats cards)
- Input, Textarea
- Select (for platform selector, tone selector)
- Badge (for tone labels, platform tags)
- Toast (for notifications)
- Dropdown Menu (for user menu)
- Dialog (for modals)

**Icons:**
- Platform icons from react-icons (FaYoutube, FaInstagram, FaTiktok, etc.)
- UI icons from lucide-react

---

## 🚀 Build Timeline

### **Tonight (Thursday) - 5-7 hours:**
- [ ] Set up Next.js project (replytomic)
- [ ] Install all dependencies including react-icons
- [ ] Configure Clerk auth
- [ ] Build landing page with platform logos
- [ ] Build dashboard skeleton with platform selector
- [ ] Create platform configuration constants
- [ ] Integrate Claude API with platform-specific prompts
- [ ] Test reply generation for YouTube, Instagram, Twitter
- [ ] Verify character limits work correctly

### **Friday - 5-7 hours:**
- [ ] Set up Supabase database with new schema
- [ ] Build API routes (/api/generate-replies)
- [ ] Add usage tracking per platform
- [ ] Implement free tier limits (25/month)
- [ ] Add onboarding flow (platform selection, niche)
- [ ] Build user settings page with personalization
- [ ] Test all 8 platforms with real comments
- [ ] Build history sidebar with platform filters

### **Saturday - 5-7 hours:**
- [ ] Stripe integration for 3 tiers
- [ ] Build comprehensive pricing page with ROI calculator
- [ ] Implement checkout flows for Creator Pro and Agency
- [ ] Add webhook handler for subscription events
- [ ] Test full payment flows
- [ ] Add platform-specific color coding throughout UI
- [ ] Build analytics/stats dashboard
- [ ] Polish UI/UX with animations

### **Sunday - 5-7 hours:**
- [ ] Deploy to Vercel
- [ ] Configure custom domain (replytomic.xyz)
- [ ] Set up Stripe webhook URL
- [ ] Add Vercel Analytics
- [ ] Create demo videos for each major platform
- [ ] Write launch post for Product Hunt
- [ ] Create example replies showcase page
- [ ] Final testing across all platforms
- [ ] Prepare social media launch content

---

## 🎯 MVP Success Criteria

**Must work before launch:**
1. ✅ User can sign up/sign in with Clerk
2. ✅ User completes onboarding (select platforms, set niche)
3. ✅ User can select any of 8 platforms
4. ✅ User can paste comment (and optional original post)
5. ✅ User can generate 5 platform-optimized replies
6. ✅ Replies are high quality, varied, and under character limits
7. ✅ Copy button works with animation
8. ✅ Free tier enforces 25/month limit
9. ✅ User can upgrade to Creator Pro or Agency via Stripe
10. ✅ Pro users get unlimited access
11. ✅ Platform-specific styling and icons work
12. ✅ Mobile responsive on all platforms
13. ✅ Usage counter updates correctly
14. ✅ No major bugs or errors
15. ✅ Deployed to replytomic.xyz

**Nice to have (add later):**
- History sidebar with platform filtering
- Bulk reply mode (Agency tier)
- Brand voice training (Agency tier)
- Analytics dashboard with time saved
- Chrome extension
- Team management (Agency tier)

---

## 🧪 Testing Checklist

**Before launch, test:**
- [ ] Sign up flow
- [ ] Sign in flow
- [ ] Generate comments (all 5 tones)
- [ ] Copy button functionality
- [ ] Free tier limit enforcement
- [ ] Upgrade to Pro
- [ ] Payment processing
- [ ] Subscription management
- [ ] Mobile view on phone
- [ ] Error states (bad input, API failure)

---

## 📈 Launch Strategy (Monday)

**Primary Launch: Product Hunt**
- Schedule for 12:01am PT Monday
- Title: "ReplyTomic - AI replies for YouTube, Instagram, TikTok & more"
- Tagline: "Save 10 hours/week responding to comments across all platforms"
- Demo video showing: YouTube comment → Instagram comment → TikTok comment
- First comment: Explain the problem (creators waste hours on replies)
- Offer: 50% off first month with code PRODUCTHUNT50

**Reddit Strategy (Monday-Tuesday):**
1. **r/YouTubers** (400K members)
   - Title: "I built a tool that helped me reply to 200+ YouTube comments in 30 minutes"
   - Focus on time savings, engagement boost
   
2. **r/InstagramMarketing** (100K members)
   - Title: "Reply to every comment within the first hour (algorithm hack)"
   - Focus on engagement rate improvement
   
3. **r/SocialMediaMarketing** (150K members)
   - Title: "Social media managers: Stop spending 10 hours/week on comment replies"
   - Focus on multi-platform management
   
4. **r/Entrepreneur** (3M members)
   - Title: "Built a $29/mo SaaS in a weekend that saves creators 10 hours/week"
   - Focus on the build story and validation

**Twitter/X Strategy:**
- Thread format (10-12 tweets):
  1. "Content creators waste 10+ hours/week responding to comments"
  2. "I got frustrated replying to 200 YouTube comments per video"
  3. "So I built ReplyTomic - AI that generates replies for any platform"
  4. "Demo: Here's a YouTube comment → 5 AI replies in 15 seconds" [GIF]
  5. "Works on YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, Reddit"
  6. "Each platform gets optimized replies (Instagram = emoji-heavy, Reddit = no BS)"
  7. "Example: Same comment, different platforms" [Screenshot comparison]
  8. "Built it in a weekend with @cursor_ai and @AnthropicAI Claude"
  9. "Pricing: 25 free replies/month, $29/mo unlimited"
  10. "Already saving beta users 8-12 hours per week"
  11. "Try it: replytomic.xyz"
  12. "RT if you spend too much time on comment replies 🔁"

**LinkedIn Strategy:**
- Post targeting social media managers and agencies
- "Managing comments across 5+ platforms is exhausting. Here's how AI can help..."
- Focus on ROI: "Save 10 hours/week = $400/month in time value"
- Share in relevant groups (Social Media Marketing, Digital Marketing, Content Creation)

**Indie Hackers:**
- Post in "Show IH" section
- Title: "ReplyTomic - Save 10hrs/week with AI comment replies"
- Focus on: Weekend build, using Claude API, monetization strategy
- Ask for feedback on pricing tiers

**Direct Outreach (Tuesday-Friday):**
- Identify 50 YouTube creators (10K-100K subs) on Twitter
- Message template: "Hey [Name]! Saw you get 100+ comments per video. I built a tool that might save you 5-10 hours/week on replies. Mind if I send you a free trial?"
- Target: Creators who actively reply to comments (shows they care about engagement)

**Content Marketing (Week 1):**
- Blog post: "How to Reply to 200 YouTube Comments in 30 Minutes (Not Clickbait)"
- Blog post: "The Instagram Algorithm Rewards Fast Comment Replies - Here's How to Win"
- Blog post: "7 Platforms, 500 Comments, 1 Tool: A Social Media Manager's Dream"

**Your Launch Pitch:**
"I spent 3 hours replying to YouTube comments last week and thought 'there has to be a better way.' So I built ReplyTomic - paste any social media comment, get 5 AI-generated replies optimized for that platform. Works on YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, and Reddit. $29/mo or try 25 free replies. Built it in a weekend with Cursor and Claude. Already saving beta users 10+ hours per week."

**Demo Video Script (90 seconds):**
1. Problem (15s): Show frustrated creator scrolling through 200 YouTube comments, typing slowly
2. Solution (30s): 
   - Open ReplyTomic
   - Select "YouTube"
   - Paste comment: "Great video! How did you learn editing?"
   - Click Generate
   - 5 replies appear instantly
   - Copy one, paste on YouTube
   - Show it posted
3. Multi-platform (30s):
   - Switch to Instagram
   - Same process, but replies are shorter, more emojis
   - Switch to TikTok
   - Replies are even more casual, gen-z language
4. Results (15s):
   - "200 comments in 30 minutes instead of 3 hours"
   - "Better engagement, faster replies, more growth"
   - "$29/mo or 25 free replies at replytomic.xyz"

---

## 💰 Revenue Projections

**Conservative (First Week):**
- Product Hunt launch: 1,000 visitors
- Conversion to free trial: 5% = 50 signups
- Conversion to Creator Pro: 10% = 5 paid users
- Revenue Week 1: $145 (5 × $29)

**Optimistic (First Month):**
- 3,000 total visitors (PH + Reddit + Twitter + direct outreach)
- 150 free signups
- 20 Creator Pro conversions
- 3 Agency conversions  
- Revenue Month 1: $877 MRR ($580 Creator Pro + $297 Agency)

**Goal (3 Months):**
- 35 Creator Pro customers = $1,015 MRR
- OR 25 Creator Pro + 5 Agency = $1,220 MRR
- OR 10 Agency customers = $990 MRR

**Pricing Tiers Recap:**
- Free: $0 (25 replies/month, 3 platforms)
- Creator Pro: $29/mo (unlimited, all platforms)
- Agency: $99/mo (unlimited + 10 team seats + advanced features)

**Customer Acquisition Cost (Estimated):**
- Organic (PH, Reddit, Twitter): $0
- Paid ads (later): $20-40 per customer
- Target: Keep CAC < $50, LTV > $300 (10+ months retention)

**Revenue Growth Path:**
- Month 1: $500-1000 MRR (15-35 customers)
- Month 2: $1500-2500 MRR (50-85 customers) 
- Month 3: $3000-5000 MRR (100-150 customers)
- Month 6: $10,000 MRR (goal)

**Key Metrics to Track:**
- Free → Paid conversion rate (target: 10-15%)
- Monthly churn (target: <5%)
- Average usage per user
- Most popular platforms
- Time to first value (how fast they generate first reply)

---

## 🔧 Post-Launch Iteration Plan

**Week 1-2: Based on early user feedback**
- Monitor which platforms get most usage
- Improve reply quality for top 3 platforms
- Fix any reported bugs immediately
- Add most requested tone options
- Collect testimonials from power users
- A/B test pricing page copy

**Week 3-4: Chrome Extension (if 15+ paying customers)**
- Build Chrome extension for YouTube, Instagram (web), Twitter, LinkedIn
- One-click reply generation from any comment
- Submit to Chrome Web Store
- Re-launch with "Now 10x easier with Chrome extension"
- Offer extension as Creator Pro exclusive feature

**Month 2: Advanced Features**
- Brand voice training (Agency tier)
  * Upload 10-20 previous replies
  * AI learns user's style
  * Generates replies in their voice
- Bulk reply mode (Agency tier)
  * Paste 20 comments at once
  * Get replies for all
  * Export to CSV
- Analytics dashboard
  * Time saved calculations
  * Platform performance breakdown
  * Best-performing tones
  * Engagement tracking (if users report back)

**Month 3: Growth & Retention**
- Build referral program: Give 1 month free, get 1 month free
- Create video tutorials for each platform
- Start email drip campaign for free users:
  * Day 1: Welcome, quick start guide
  * Day 3: Tips for better replies
  * Day 7: "You've saved X hours this week"
  * Day 14: Case study from power user
  * Day 21: Upgrade offer (50% off first month)
- Partner with creator education platforms
- Create affiliate program (20% recurring commission)

**Month 4: Platform Expansion**
- Add Discord support
- Add Threads support (Instagram's Twitter competitor)
- Add WhatsApp Business support
- Add Telegram support
- Research demand for other platforms

**Month 5-6: Enterprise/Agency Features**
- Team collaboration tools
- Shared reply templates
- Multi-account management
- White-label options for agencies
- API access for custom integrations
- Zapier integration

**Metrics to Monitor Weekly:**
- New signups (free)
- Free → Paid conversion rate
- MRR growth
- Churn rate
- Platform usage distribution
- Average replies per user
- Feature requests by frequency
- Customer support volume
- Time to first value
- Net Promoter Score (NPS)

---

## ❓ Common Issues & Solutions

**"Claude API is too slow"**
- Add loading spinner with funny messages
- "Crafting the perfect comment..."
- "Making you sound smart..."

**"Comments are too generic"**
- Improve prompt with more specific instructions
- Add user context (role, industry) to prompts
- Show examples in prompt

**"Hit rate limits on free tier"**
- That's the point - converts them to paid
- Show "Upgrade to Pro" banner prominently

**"Not enough signups"**
- Offer launch discount: 50% off first 3 months ($9.99)
- Add more social proof on landing page
- Improve SEO and content marketing

---

## 🎬 Next Steps

1. **RIGHT NOW:** Copy the Cursor prompt above
2. **Open Cursor:** Create new Next.js project
3. **Paste prompt:** Let Cursor start building
4. **Set up accounts:** Clerk, Supabase, Stripe while it builds
5. **Test locally:** Make sure comment generation works
6. **Deploy:** Push to Vercel tomorrow
7. **Launch:** Monday morning on Product Hunt

---

## 🎬 Next Steps

1. **RIGHT NOW:** Copy the Cursor prompt above (the big code block)
2. **Open Cursor:** Create new Next.js project: `npx create-next-app@latest replytomic`
3. **Paste prompt:** Let Cursor start building the foundation
4. **Set up accounts:** Clerk, Supabase, Stripe while Cursor works
5. **Test locally:** Generate replies for YouTube, Instagram, Twitter
6. **Iterate:** Add platform-specific tweaks based on testing
7. **Deploy:** Push to Vercel on Sunday
8. **Launch:** Monday morning on Product Hunt with demo videos

---

## 🏆 Competitive Advantages

**Why ReplyTomic Will Win:**

1. **Multi-Platform First**
   - Competitors focus on single platforms
   - You're the only tool that handles YouTube + Instagram + TikTok + Twitter + LinkedIn + Facebook + Reddit in one place
   - Saves users from juggling 3-4 different tools

2. **Platform Intelligence**
   - Not just generic AI replies
   - Each platform gets optimized responses (character limits, emoji usage, tone)
   - Instagram replies ≠ LinkedIn replies ≠ YouTube replies

3. **Speed to Market**
   - Built in a weekend vs competitors who took months
   - Can iterate faster, ship features faster
   - Lower costs = better pricing for customers

4. **Pricing Advantage**
   - $29/mo vs competitors at $50-100/mo
   - Better free tier (25 replies vs 5-10)
   - Agency tier at $99/mo is steal compared to enterprise pricing elsewhere

5. **Creator-First Focus**
   - Built BY a creator FOR creators
   - Not a corporate tool adapted for creators
   - Understand the actual pain points

**Direct Competitors:**
- **ChatGPT/Claude directly**: Generic, not platform-optimized, no usage tracking
- **Jasper/Copy.ai**: $50-125/mo, focused on long-form content not replies
- **Buffer/Hootsuite**: Scheduling tools, no AI reply generation
- **Comment reply tools**: Platform-specific, don't handle multiple platforms

**Your Moat (What Keeps Competitors Out):**
- Platform-specific prompt engineering (takes time to perfect)
- Usage data showing which tones/styles work best per platform
- Network effects: More users = better data = better replies
- Creator relationships and testimonials
- Speed of iteration and feature shipping

---

## 📊 Success Milestones

**Week 1:**
- [ ] 50+ free signups
- [ ] 5+ paying customers
- [ ] $145+ MRR
- [ ] Product Hunt featured

**Month 1:**
- [ ] 150+ total users
- [ ] 25+ paying customers
- [ ] $800+ MRR
- [ ] 10+ testimonials
- [ ] Featured on 3+ creator YouTube channels or blogs

**Month 3:**
- [ ] 500+ total users
- [ ] 35+ paying customers
- [ ] $1,200+ MRR
- [ ] Chrome extension launched
- [ ] First agency customer

**Month 6:**
- [ ] 2,000+ total users
- [ ] 100+ paying customers  
- [ ] $5,000+ MRR
- [ ] Profitable (revenue > costs)
- [ ] Team of 1-2 contractors

**Month 12:**
- [ ] $10,000+ MRR
- [ ] Consider: Raise funding, stay bootstrapped, or sell

---

## 🚨 Critical Success Factors

**What Will Make or Break This:**

1. **Reply Quality** - If AI replies suck, nothing else matters
   - Spend 80% of your time perfecting the prompts
   - Test on real comments, iterate constantly
   - Get feedback from beta users daily

2. **Speed** - Needs to feel instant (<3 seconds)
   - Optimize Claude API calls
   - Cache when possible
   - Show loading states that feel fast

3. **Free Tier Conversion** - 10-15% is make-or-break
   - Limit should be just enough to prove value
   - 25 replies = ~2 weeks of light usage
   - Upgrade prompts need to show ROI clearly

4. **Platform Coverage** - More platforms = more use cases
   - Start with YouTube, Instagram, Twitter (80% of use cases)
   - Add others based on demand
   - Each platform needs quality, not just quantity

5. **Word of Mouth** - Creators share tools that work
   - Build in share buttons ("I just saved 2 hours with ReplyTomic")
   - Referral program from day 1
   - Make it stupid easy to recommend

**What Could Kill This:**
- ❌ Claude API costs eat all revenue (monitor closely)
- ❌ Replies feel robotic/generic (test with real users)
- ❌ Free tier too generous (never convert) or too stingy (never try)
- ❌ Platform changes their UI/structure (have fallback)
- ❌ Competitor launches same thing with more funding (move fast)

---

## 💡 Pro Tips for Building This Weekend

1. **Don't overthink the design** - Shadcn components look great out of the box
2. **Copy successful landing pages** - Study Product Hunt top products
3. **Test with real comments** - Don't use fake examples
4. **Ship messy** - Perfect is the enemy of done
5. **Record everything** - Screen record your build process for content
6. **Talk to users ASAP** - DM people trying it, get feedback
7. **Price confidently** - $29/mo is cheap for 10 hours saved
8. **Focus on value** - Every page should scream "save time"

---

## 📝 Final Notes

**Remember:**
- Zyki made $7K MRR in 30 days with a simpler version of this
- The market for creator tools is HUGE and growing
- You don't need to be perfect, you need to ship
- Creators will pay for tools that save them time
- Multi-platform is your competitive advantage
- Build in public, share your journey

**The beauty of this idea:**
- It solves a real, painful problem (hours wasted on replies)
- The solution is simple (AI + platform optimization)
- The tech is accessible (Claude API + basic web app)
- The market is massive (millions of creators)
- The monetization is clear ($29/mo, easy ROI)
- You can build it this weekend

**You've got this. Now go build ReplyTomic! 🚀**
