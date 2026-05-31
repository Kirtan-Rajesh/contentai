'use client'

export default function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="section-title">⚙️ Settings & API Configuration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AWS Bedrock */}
        <div className="card">
          <h3 className="font-semibold text-white mb-3">🔴 AWS Bedrock</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Uses Anthropic Claude Sonnet 4 with free credits
            </p>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-xs text-gray-300 font-mono">
                Model: anthropic.claude-sonnet-4-20250514
              </p>
              <p className="text-xs text-gray-300 font-mono mt-1">
                Region: us-east-1
              </p>
            </div>
            <p className="text-xs text-yellow-400">
              ⚠️ Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local
            </p>
          </div>
        </div>

        {/* External APIs */}
        <div className="card">
          <h3 className="font-semibold text-white mb-3">🌐 External APIs (Zero Cost)</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> HN Algolia (free, no auth)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Reddit JSON API (free, no auth)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> ArXiv API (free, no auth)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">◆</span> Claude Web Search (built-in)
            </li>
          </ul>
        </div>

        {/* Telegram Bot */}
        <div className="card">
          <h3 className="font-semibold text-white mb-3">🤖 Telegram Bot</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Optional: Get trending topics delivered to your Telegram daily
            </p>
            <div className="bg-gray-700 rounded p-3 space-y-2">
              <input
                type="password"
                placeholder="TELEGRAM_BOT_TOKEN"
                className="input-field text-sm"
              />
              <input
                type="text"
                placeholder="TELEGRAM_CHAT_ID"
                className="input-field text-sm"
              />
            </div>
            <button className="btn-secondary w-full text-sm">
              🔗 Connect Telegram
            </button>
          </div>
        </div>

        {/* Deployment */}
        <div className="card">
          <h3 className="font-semibold text-white mb-3">🚀 Deployment</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Frontend: Vercel (auto-deployed from git)</p>
            <p>Backend: Vercel Functions (/api routes)</p>
            <p>Database: Optional Vercel KV for caching</p>
            <button className="btn-primary w-full mt-3 text-sm">
              📋 View Deployment Guide
            </button>
          </div>
        </div>
      </div>

      {/* API Map */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">📍 API Architecture Map</h3>
        <div className="bg-gray-900 rounded p-4 text-xs font-mono text-gray-400 overflow-x-auto">
          <pre>{`Frontend (React)
    ↓
API Routes (/api)
    ├→ /agents/trends (HN Algolia + Claude)
    ├→ /agents/updates (Web Search + Claude)
    ├→ /agents/research (Web Search + Papers)
    ├→ /agents/hooks (Claude generation)
    ├→ /agents/script (Claude generation)
    ├→ /agents/captions (Claude generation)
    └→ /telegram/send (Telegram Bot API)
    ↓
AWS Bedrock
    ↓
Claude Sonnet 4`}</pre>
        </div>
      </div>

      {/* Status */}
      <div className="card bg-blue-900 bg-opacity-30 border-blue-600">
        <h3 className="font-semibold text-blue-300 mb-2">✅ System Status</h3>
        <p className="text-sm text-gray-300">All systems ready. Awaiting API credentials.</p>
        <p className="text-xs text-gray-400 mt-2">
          Last checked: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}
