# Complete Environment Variables List for Vercel

Copy and paste these into your Vercel project settings (Settings → Environment Variables).

## 🔐 Required for Basic Functionality

### Clerk Authentication (REQUIRED)
These are essential - without these, the app won't work:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

**Where to get these:**
1. Go to https://dashboard.clerk.com
2. Select your application (or create one)
3. Go to **API Keys**
4. Copy:
   - **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY`

---

### Anthropic Claude API (REQUIRED for reply generation)
```
ANTHROPIC_API_KEY=sk-ant-...
```

**Where to get this:**
1. Go to https://console.anthropic.com
2. Go to **API Keys**
3. Create a new key or copy existing one
4. Paste into `ANTHROPIC_API_KEY`

---

## ⚙️ Optional (for full functionality)

### Supabase Database (Optional - for usage tracking & history)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Where to get these:**
1. Go to https://supabase.com
2. Create a project (or use existing)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

**Note:** The app will work without these, but usage tracking and history won't be saved.

---

### Stripe Payments (Optional - for subscriptions)
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Where to get these:**
1. Go to https://dashboard.stripe.com
2. Make sure you're in **Test mode** (toggle in top right)
3. Go to **Developers** → **API keys**
4. Copy:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. For webhook (after deployment):
   - Go to **Developers** → **Webhooks**
   - Create endpoint: `https://your-app.vercel.app/api/webhook/stripe`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

**Note:** The app will work without these, but payment/subscription features won't work.

---

### App URLs (Optional - for redirects and links)
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_DOMAIN=replytomic.xyz
```

**Where to get these:**
- `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL (e.g., `https://replytomic.vercel.app`)
- `NEXT_PUBLIC_DOMAIN`: Your custom domain if you have one (e.g., `replytomic.xyz`)

**Note:** These are optional but good to set for proper redirects.

---

## 📋 Quick Setup Checklist

### Minimum Required (App will work):
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- [ ] `ANTHROPIC_API_KEY`

### Recommended (Full functionality):
- [ ] All above +
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL`

### Complete Setup (With payments):
- [ ] All above +
- [ ] `STRIPE_SECRET_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (after first deployment)

---

## 🚀 How to Add in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **ReplyTomic** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. For each variable:
   - Enter the **Key** (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - Enter the **Value** (paste your actual key)
   - Select environments: ✅ **Production**, ✅ **Preview**, ✅ **Development**
   - Click **"Save"**
6. After adding all variables, go to **Deployments** tab
7. Click **"Redeploy"** on the latest deployment (or it will auto-deploy on next push)

---

## ⚠️ Important Notes

1. **Variables starting with `NEXT_PUBLIC_`** are exposed to the browser
2. **Variables without `NEXT_PUBLIC_`** are server-only (secure)
3. **Never commit** `.env.local` files to git
4. **Redeploy** after adding environment variables
5. **Test mode vs Production**: Use test keys during development, switch to production keys when ready

---

## 🧪 Testing Your Setup

After adding variables and redeploying:

1. Visit your Vercel URL
2. Try to sign up/sign in (tests Clerk)
3. Try generating a reply (tests Anthropic API)
4. Check browser console for any errors

If you see "MIDDLEWARE_INVOCATION_FAILED" → Clerk keys are missing or incorrect
If replies don't generate → Anthropic API key is missing or incorrect

