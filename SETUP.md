# ReplyTomic Setup Guide

Follow these steps to get ReplyTomic up and running.

## Prerequisites

1. **Node.js 18+** installed
2. Accounts created for:
   - Clerk (authentication)
   - Anthropic (Claude API)
   - Stripe (payments)
   - Supabase (database)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Variables

Create a `.env.local` file in the root directory:

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

## Step 3: Set Up Clerk

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Enable email/password authentication
4. Add redirect URLs:
   - `http://localhost:3000/*`
   - Your production URL (when ready)
5. Copy the publishable key and secret key to `.env.local`

## Step 4: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Open the SQL Editor
3. Run the SQL schema from `supabase-schema.sql`
4. Copy your project URL and API keys to `.env.local`

**Note:** For MVP, you can handle authentication at the application level using Clerk. The RLS policies in the SQL schema are commented out - you can enable them later if you want to use Supabase Auth instead.

## Step 5: Set Up Anthropic Claude API

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Copy it to `.env.local` as `ANTHROPIC_API_KEY`

## Step 6: Set Up Stripe (Optional for MVP)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Switch to test mode
3. Create products for:
   - Creator Pro ($29/month subscription)
   - Agency ($99/month subscription)
4. Copy your API keys to `.env.local`
5. Set up webhook endpoint (after deployment)

## Step 7: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Built

✅ Landing page with hero, pricing, and platform logos
✅ Clerk authentication (sign-in/sign-up)
✅ Dashboard with platform selector
✅ Comment input with optional context
✅ Tone selector
✅ AI reply generation via Claude API
✅ Platform-specific configurations (8 platforms)
✅ Copy-to-clipboard functionality
✅ Basic usage tracking UI

## What's Next (MVP Completion)

- [ ] Connect Supabase for usage tracking
- [ ] Implement tier limits (25/month for free tier)
- [ ] Stripe integration for payments
- [ ] Onboarding flow
- [ ] Generation history sidebar
- [ ] User settings page
- [ ] Error handling improvements

## Testing

1. Sign up for an account
2. Go to dashboard
3. Select a platform (e.g., YouTube)
4. Paste a comment
5. Select tones
6. Click "Generate Replies"
7. Copy a reply

## Troubleshooting

**"Unauthorized" errors:**
- Make sure Clerk keys are correct
- Check that middleware is working correctly

**API generation fails:**
- Verify Anthropic API key is set
- Check API key has credits/quota
- Look at browser console and server logs

**Database errors:**
- Ensure Supabase keys are correct
- Check that tables were created successfully
- Verify service role key is used for admin operations

## Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!
5. Update Clerk redirect URLs to production URL
6. Set up Stripe webhook URL in Stripe dashboard
