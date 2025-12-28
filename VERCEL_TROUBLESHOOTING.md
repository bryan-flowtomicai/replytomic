# Vercel Auto-Deploy Troubleshooting

## Issue: Commits not automatically deploying to Vercel

### Step 1: Check Vercel Project Settings

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your ReplyTomic project
3. Go to **Settings** → **Git**
4. Verify:
   - **Repository**: `bryan-flowtomicai/replytomic`
   - **Production Branch**: `main`
   - **Git Integration**: Should show "Connected"

### Step 2: Check GitHub Webhook

1. Go to your GitHub repository: https://github.com/bryan-flowtomicai/replytomic
2. Go to **Settings** → **Webhooks**
3. Look for a webhook pointing to `vercel.com`
4. If missing, Vercel needs to be reconnected

### Step 3: Reconnect Vercel to GitHub

**Option A: Reconnect in Vercel**
1. In Vercel Dashboard → Your Project → Settings → Git
2. Click **"Disconnect"** (if connected)
3. Click **"Connect Git Repository"**
4. Select `bryan-flowtomicai/replytomic`
5. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Click **"Deploy"**

**Option B: Create New Project**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub: `bryan-flowtomicai/replytomic`
3. Configure settings (same as above)
4. Deploy

### Step 4: Manual Deployment (Quick Fix)

1. In Vercel Dashboard → **Deployments** tab
2. Click **"Create Deployment"**
3. Select:
   - **Branch**: `main`
   - **Commit**: Latest (or specific commit hash)
4. Click **"Deploy"**

### Step 5: Verify GitHub Integration Permissions

1. Go to [github.com/settings/applications](https://github.com/settings/applications)
2. Find **Vercel** in authorized applications
3. Make sure it has access to `bryan-flowtomicai/replytomic`
4. If not, reconnect Vercel

### Step 6: Check Branch Protection

1. Go to GitHub repo → **Settings** → **Branches**
2. Make sure `main` branch doesn't have restrictions blocking Vercel
3. If you have branch protection, add Vercel as an exception

### Step 7: Test Webhook (Advanced)

If webhooks exist but aren't working:
1. In GitHub → Settings → Webhooks → Click on Vercel webhook
2. Click **"Recent Deliveries"**
3. Check if recent pushes show "200 OK" responses
4. If errors, try **"Redeliver"** on a recent push

### Quick Manual Deploy Command

If you have Vercel CLI installed:
```bash
npm i -g vercel
vercel --prod
```

### Current Repository Info

- **Repository**: `bryan-flowtomicai/replytomic`
- **Branch**: `main`
- **Latest Commit**: Check with `git log --oneline -1`

### Common Issues

1. **Wrong repository connected**: Vercel might be connected to a different repo
2. **Wrong branch**: Production branch might be set to `master` instead of `main`
3. **Webhook not configured**: GitHub webhook might be missing or broken
4. **Permissions issue**: Vercel might not have access to the repository
5. **Private repo**: If repo is private, Vercel needs proper access

### Solution: Force New Deployment

The fastest solution is usually to:
1. Disconnect and reconnect the Git integration in Vercel
2. Or create a new deployment manually
3. This will re-establish the webhook connection

