# Quick Start Guide - ContentAI Agent System

## 🚀 Running Locally

The dev server is currently running at **http://localhost:3000**

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your AWS Bedrock credentials

# 3. Start development server
npm run dev
```

## 🎯 Using the Dashboard

### Workflow Demo
1. **Trends Tab** → See trending AI topics (scrapes HN, Reddit)
2. **Deep Research** → Search any topic (e.g., "Mamba vs Transformers")
3. **Hook Generator** → Get 5 hook options for your topic
4. **Script Maker** → Generate full 60-second script
5. **Caption Agent** → Auto-create captions + hashtags

### Example Flow
- Go to **Deep Research tab**
- Enter: `"Mamba SSM Architecture 2025"`
- Get research summary + content angles
- Go to **Hook Generator**
- Enter same topic, select a hook
- Go to **Script Maker**
- Click "Generate Script"
- Edit the 60-second script
- Go to **Caption Agent**
- Get Instagram caption + YouTube description

## 📁 Project Structure

```
contentai/
├── app/                  # Next.js app directory
│   ├── api/             # Backend API routes (Vercel Functions)
│   │   ├── agents/      # 6 agent endpoints
│   │   └── telegram/    # Telegram bot integration
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main dashboard
│   └── globals.css      # Tailwind styles
├── components/          # React components
│   └── agents/          # 6 agent UI components
├── lib/                 # Utilities
│   ├── types/           # TypeScript types
│   ├── store/           # Zustand state management
│   └── services/        # API client
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── next.config.js       # Next.js config
```

## 🔗 API Endpoints

All APIs are in `/api` folder:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/agents/trends` | GET | Fetch trending topics |
| `/agents/updates` | GET | Fetch tech news |
| `/agents/research` | POST | Deep research on topic |
| `/agents/hooks` | POST | Generate 5 hooks |
| `/agents/script` | POST | Generate full script |
| `/agents/captions` | POST | Generate captions |
| `/telegram/send` | POST | Send Telegram message |

## 🎨 Customizing

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // Change to your brand color
    },
  },
}
```

### Modify Agent Responses
Edit `app/api/agents/*/route.ts` files:
- Change mock responses
- Add real Claude integration
- Customize prompts

### Add New Agent
1. Create new component in `components/agents/MyAgent.tsx`
2. Create API route in `app/api/agents/myagent/route.ts`
3. Add tab button to `app/page.tsx`
4. Add store methods to `lib/store/contentaiStore.ts`

## 🔐 Environment Variables

Required:
```env
BEDROCK_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

Optional:
```env
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
TAVILY_API_KEY=your_api_key
```

## 📊 Mock vs Real Data

Currently, all agents return **mock data** for testing. To enable real Claude API calls:

1. **Update `/app/api/agents/research/route.ts`**:
   - Replace mock response with Bedrock Claude call
   - Add web search integration

2. **Update `/app/api/agents/hooks/route.ts`**:
   - Use Claude to generate contextual hooks

3. **Update `/app/api/agents/script/route.ts`**:
   - Generate scripts using Claude

See `BEDROCK_INTEGRATION.md` for detailed instructions.

## 🚢 Deployment

### Deploy to Vercel (Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repo
# 4. Add environment variables
# 5. Deploy!
```

See `DEPLOYMENT.md` for full instructions.

### Deploy Elsewhere
- Can run on any Node.js hosting (Railway, Render, Heroku, etc.)
- `npm run build && npm start`

## 📝 Next Steps

1. ✅ System built and running locally
2. ⬜ Test with your AWS Bedrock credentials
3. ⬜ Customize hooks for your content style
4. ⬜ Deploy to Vercel
5. ⬜ Set up daily Telegram digest

## 🆘 Common Issues

**Q: Getting TypeScript errors?**
```bash
npm run type-check
```

**Q: Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Q: Changes not reflecting?**
- Clear `.next` folder: `rm -r .next`
- Restart: `npm run dev`

**Q: API endpoints returning 500?**
- Check `.env.local` is configured
- Verify AWS credentials
- Check function logs in terminal

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [AWS Bedrock](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Happy content creating! 🎬**
