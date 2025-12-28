-- ReplyTomic Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: YYYY-MM
  reply_count INTEGER DEFAULT 0,
  platforms_used JSONB DEFAULT '{}'::jsonb, -- Track usage per platform
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Generation history table
CREATE TABLE IF NOT EXISTS generations (
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
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand_voice_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  total_replies_generated INTEGER DEFAULT 0,
  total_time_saved_minutes INTEGER DEFAULT 0,
  platform_breakdown JSONB DEFAULT '{}'::jsonb,
  favorite_tones JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_team_id ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_usage_user_month ON usage(user_id, month);
CREATE INDEX IF NOT EXISTS idx_generations_user ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_platform ON generations(platform);
CREATE INDEX IF NOT EXISTS idx_generations_created ON generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teams_owner ON teams(owner_user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies should be created based on your authentication setup
-- Since we're using Clerk (not Supabase Auth), you'll need to create policies
-- that work with your application-level authentication
-- Here's a basic example structure (you'll need to adapt this):

-- For Clerk integration, you'll typically:
-- 1. Store clerk_user_id in the users table
-- 2. Use Supabase service role key in your API routes to bypass RLS
-- 3. Or implement custom RLS policies using Supabase functions that check Clerk JWT
-- 4. For MVP, you can disable RLS on these tables and handle auth at the application level

-- Example RLS policy (requires Supabase Auth integration):
-- CREATE POLICY "Users can view own data" ON users FOR SELECT
--   USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- For now, you can use service role key in your API routes to bypass RLS
-- Make sure to always validate user permissions in your application code
