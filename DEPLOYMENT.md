# Deployment Guide - ContentAI Agent System

## Quick Start (Local Development)

```bash
cd e:\contentai
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Setup

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Fill in AWS Bedrock Credentials
Get your credentials from AWS Console:
- Go to AWS IAM
- Create access key if you don't have one
- Copy `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

Add to `.env.local`:
```env
BEDROCK_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 3. (Optional) Telegram Bot Setup
If you want Telegram notifications:
1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
3. Add to `.env.local`:
```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=987654321
```

## Deployment to Vercel

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial ContentAI Agent System setup"
git remote add origin https://github.com/yourusername/contentai.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Continue"

### Step 3: Configure Environment Variables
In Vercel dashboard, go to **Settings → Environment Variables** and add:

```env
BEDROCK_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
TELEGRAM_BOT_TOKEN=optional_bot_token
TELEGRAM_CHAT_ID=optional_chat_id
NEXT_PUBLIC_API_URL=https://your-vercel-app.vercel.app/api
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Get your live URL: `https://your-project.vercel.app`

## Build & Run for Production

```bash
npm run build
npm start
```

## Verifying Deployment

Test each agent on the live site:

1. **Trends Tab** - Should show HN + Reddit trending topics
2. **Updates Tab** - Should show mock tech updates
3. **Deep Research** - Try "Mamba vs Transformer"
4. **Hook Generator** - Select a topic to generate 5 hooks
5. **Script Maker** - Generate scripts from hooks
6. **Captions** - Auto-generate Instagram captions
7. **Settings** - Verify all API status indicators

## Troubleshooting

### Build Fails with TypeScript Errors
```bash
npm run type-check
```
Fix any errors, then retry deployment.

### "Cannot find module '@/lib/types'"
Verify the path alias in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Bedrock API Errors
1. Verify AWS credentials are valid
2. Check region is set to `us-east-1`
3. Ensure Bedrock Claude Sonnet is available in your region
4. Check AWS free credits haven't expired

### Telegram Bot Not Sending
1. Verify bot token is correct
2. Verify chat ID is correct (should be numeric)
3. Check `/api/telegram/send` endpoint responds with 200

## Monitoring

### View Logs
In Vercel dashboard:
1. Go to your project
2. Click "Deployments"
3. Select latest deployment
4. Click "Runtime Logs"

### Check Function Performance
1. Go to "Analytics"
2. Monitor API response times
3. Check error rates

## Customization

### Change Trendinsg Topics
Edit `app/api/agents/trends/route.ts`:
- Modify HN Algolia search query
- Add/remove Reddit subreddits
- Change number of results

### Adjust Agent Responses
Edit individual agent files in `app/api/agents/*/route.ts`:
- Modify mock responses
- Swap in Bedrock Claude calls
- Add custom prompt engineering

### Update UI Theme
Edit `tailwind.config.js` and `app/globals.css`:
- Change primary color (currently blue)
- Modify typography
- Adjust layout spacing

## Cost Estimation

**Monthly cost with Bedrock free credits:**
- First month: $0 (free credits cover everything)
- After credits: ~$10-50/month depending on usage
  - ~1000 API calls/month = ~$2
  - Hosting on Vercel: Free tier (perfect for this use case)

**Zero-cost APIs:**
- HN Algolia: ∞ (unlimited)
- Reddit JSON: ∞ (unlimited)
- ArXiv API: ∞ (unlimited)
- Claude web search: Included in Bedrock

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all agents
3. ✅ Configure Bedrock with real Claude calls
4. ✅ Add Telegram daily digest
5. ✅ Customize hooks for your brand voice
6. ✅ Set up GitHub Actions for automated scripts

## Support

- **Issues**: Check GitHub Issues
- **Bedrock Help**: [AWS Bedrock Docs](https://docs.aws.amazon.com/bedrock/)
- **Next.js Help**: [Next.js Docs](https://nextjs.org/docs)
- **Vercel Help**: [Vercel Docs](https://vercel.com/docs)

---

**Your live dashboard is ready to go! Start creating content. 🚀**
