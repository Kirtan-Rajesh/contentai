'use client'

import { useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import TrendAnalyzer from '@/components/agents/TrendAnalyzer'
import TechUpdates from '@/components/agents/TechUpdates'
import DeepResearch from '@/components/agents/DeepResearch'
import HookGenerator from '@/components/agents/HookGenerator'
import ScriptMaker from '@/components/agents/ScriptMaker'
import CaptionAgent from '@/components/agents/CaptionAgent'

export default function Home() {
  const { activeTab, setActiveTab, selectedTopic, selectedHook } = useContentAIStore()
  const [showSidebar, setShowSidebar] = useState(true)

  const tabs = [
    { id: 'trends', label: '🔥 Trends', emoji: '🔥' },
    { id: 'updates', label: '📰 Updates', emoji: '📰' },
    { id: 'research', label: '🔍 Research', emoji: '🔍' },
    { id: 'hooks', label: '🎣 Hooks', emoji: '🎣' },
    { id: 'script', label: '✍️ Script', emoji: '✍️' },
    { id: 'captions', label: '📝 Captions', emoji: '📝' },
  ] as const

  return (
    <div className="min-h-screen page-gradient">
      {/* Header */}
      <div className="header-gradient sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                ContentAI Studio
              </h1>
              <p className="text-sm text-gray-400 mt-1">Create content from trends, research, and ideas</p>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-300 text-sm border border-slate-700"
            >
              {showSidebar ? '←' : '→'} Panel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-6" style={{ gridTemplateColumns: showSidebar ? '1fr 320px' : '1fr' }}>
          {/* Main Content */}
          <div>
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {activeTab === 'trends' && <TrendAnalyzer />}
              {activeTab === 'updates' && <TechUpdates />}
              {activeTab === 'research' && <DeepResearch />}
              {activeTab === 'hooks' && <HookGenerator />}
              {activeTab === 'script' && <ScriptMaker />}
              {activeTab === 'captions' && <CaptionAgent />}
            </div>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <aside className="space-y-4">
              <div className="card border-cyan-500/20 bg-gradient-to-br from-slate-800/50 via-cyan-900/20 to-slate-900/50 p-4 sticky top-20">
                <h3 className="text-sm font-bold text-cyan-300 mb-3">Session</h3>

                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
                    <p className="text-xs text-gray-400 mb-1">Topic</p>
                    <p className="text-sm text-white font-medium truncate">
                      {selectedTopic || 'None selected'}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
                    <p className="text-xs text-gray-400 mb-1">Hook</p>
                    <p className="text-sm text-white font-medium truncate">
                      {selectedHook?.text ? `${selectedHook.text.slice(0, 30)}...` : 'None selected'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('hooks')}
                    className="btn-primary w-full text-sm"
                  >
                    → Hooks
                  </button>

                  <button
                    onClick={() => setActiveTab('script')}
                    className="btn-secondary w-full text-sm"
                  >
                    → Script
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
