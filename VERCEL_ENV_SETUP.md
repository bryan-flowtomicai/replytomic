# Vercel Environment Variables Setup

## Required Environment Variables

Make sure these are set in your Vercel project settings:

### Clerk (Authentication)
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Anthropic Claude API
```
ANTHROPIC_API_KEY=sk-ant-...
```

### Supabase (Optional for MVP)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Stripe (Optional for MVP)
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### App URLs
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_DOMAIN=replytomic.xyz
```

## Important Notes

1. **Set for all environments**: Production, Preview, and Development
2. **Redeploy after adding**: After adding environment variables, you need to redeploy
3. **Clerk keys are critical**: Without these, the middleware will fail with `MIDDLEWARE_INVOCATION_FAILED`

## How to Add Variables

1. Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables
2. Click "Add New"
3. Add each variable one by one
4. Select all environments (Production, Preview, Development)
5. Click "Save"
6. Go to Deployments tab → Click "Redeploy" on the latest deployment

## Testing

After setting environment variables and redeploying:
- The middleware error should disappear
- You should be able to access `/sign-in` and `/sign-up`
- Authenticated routes should redirect to sign-in if not logged in

