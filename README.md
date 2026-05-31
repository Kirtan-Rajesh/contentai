# ContentAI Agent System

An AI-powered content creation studio with 7 intelligent agents for creators and AI engineers. Built with Next.js, React, Zustand, and AWS Bedrock (Claude).

## 🚀 Features

### 7 Intelligent Agents

1. **Trend Analyzer** - Scrapes HN, Reddit, Twitter for trending topics with AI-ranked hooks
2. **Tech Updates** - Latest AI/tech news with content angles tailored to your audience  
3. **Deep Research** - Deep dive into any topic with papers, blogs, and content angles
4. **Hook Generator** - 5 hook options (question, problem, result, controversy, relatable)
5. **Script Maker** - Full 45-60sec reel script with hook + body + CTA
6. **Caption Agent** - Auto-generates Instagram caption + hashtags + YouTube description
7. **Telegram Bot** - Sends daily trending topics to your Telegram

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **State Management**: Zustand
- **Backend**: Vercel Functions (serverless)
- **LLM**: AWS Bedrock (Claude Sonnet 4)
- **APIs Used**: HN Algolia, Reddit JSON, ArXiv (all free, no auth)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- AWS Account with Bedrock access + free credits
- Telegram Bot Token (optional, for notifications)

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd e:\contentai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Then fill in:
```env
BEDROCK_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
TELEGRAM_BOT_TOKEN=your_bot_token (optional)
TELEGRAM_CHAT_ID=your_chat_id (optional)
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 🌐 API Endpoints

All endpoints are in `/api`:

- `GET /api/agents/trends` - Fetch trending topics
- `GET /api/agents/updates` - Fetch tech news updates
- `POST /api/agents/research` - Deep research on a topic
- `POST /api/agents/hooks` - Generate 5 hook options
- `POST /api/agents/script` - Generate full script
- `POST /api/agents/captions` - Generate captions
- `POST /api/telegram/send` - Send message to Telegram

## 🔌 Integration Points for Bedrock

Replace mock implementations in:

- `app/api/agents/research/route.ts` - Add Claude web search + paper analysis
- `app/api/agents/hooks/route.ts` - Use Claude to generate contextual hooks
- `app/api/agents/script/route.ts` - Generate full scripts with Claude
- `app/api/agents/captions/route.ts` - Create captions with Claude

## 💰 Cost Optimization

- **Free tier coverage**: 
  - HN Algolia API (no auth, unlimited)
  - Reddit JSON endpoints (no auth, unlimited)
  - ArXiv API (no auth, unlimited)
  - AWS Bedrock free credits (covers Claude usage)
  
- **Optional paid tiers**:
  - Tavily Search API: 1000 queries/month free
  - Vercel KV: Optional caching for trends

## 📦 Deployment to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import to Vercel:
   - Connect your GitHub repo
   - Add environment variables in Vercel dashboard
   - Deploy

3. Set environment variables in Vercel:
   - `BEDROCK_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `TELEGRAM_BOT_TOKEN` (optional)
   - `TELEGRAM_CHAT_ID` (optional)

## 🎨 UI Components

- **TrendAnalyzer.tsx** - Browse trending topics
- **TechUpdates.tsx** - View latest news
- **DeepResearch.tsx** - Research any topic
- **HookGenerator.tsx** - Select from 5 hooks
- **ScriptMaker.tsx** - Edit generated script
- **CaptionAgent.tsx** - Copy captions/hashtags
- **Settings.tsx** - API configuration & status

## 🔄 Workflow

1. **Pick a topic** from Trends/Updates or search with Deep Research
2. **Generate hooks** - Get 5 options, pick your favorite (30 seconds)
3. **Make script** - Claude writes full 60-sec script (1 minute)
4. **Edit** - Personalize the script (5 minutes)
5. **Record** - Use your phone/camera
6. **Get captions** - Auto-generated Instagram + YouTube content (instant)

## 📝 Environment Variables

See `.env.example` for full list:

```env
# Required
BEDROCK_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Optional
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
TAVILY_API_KEY=xxx
```

## 🤝 Next Steps

1. Get AWS Bedrock credentials
2. Configure environment variables
3. Test each agent in the dashboard
4. Deploy to Vercel
5. Customize prompts for your brand voice

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [AWS Bedrock API](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude](https://www.anthropic.com/)

## 📧 Support

Check the Settings tab in the app for API status and debugging information.

---

Built with ❤️ for AI creators and engineers
