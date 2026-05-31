'use client'

import { useMemo } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import TrendAnalyzer from '@/components/agents/TrendAnalyzer'
import TechUpdates from '@/components/agents/TechUpdates'
import DeepResearch from '@/components/agents/DeepResearch'
import HookGenerator from '@/components/agents/HookGenerator'
import ScriptMaker from '@/components/agents/ScriptMaker'
import CaptionAgent from '@/components/agents/CaptionAgent'
import Settings from '@/components/agents/Settings'

const sections = [
  { id: 'trends', label: 'Trend Flow' },
  { id: 'updates', label: 'Tech Updates' },
  { id: 'research', label: 'Deep Research' },
  { id: 'hooks', label: 'Hook Generator' },
  { id: 'script', label: 'Script Maker' },
  { id: 'captions', label: 'Caption Agent' },
]

export default function AgentFlow() {
  const {
    activeTab,
    setActiveTab,
    selectedTopic,
    selectedHook,
    selectedReasoning,
    scriptResult,
  } = useContentAIStore()

  const flowStatus = useMemo(
    () => [
      {
        label: 'Pick topic',
        done: Boolean(selectedTopic),
        description: 'Select a trend, tech update, or research topic to start the flow.',
      },
      {
        label: 'Generate hooks',
        done: Boolean(selectedHook),
        description: 'Create hooks from the selected topic for better scripts.',
      },
      {
        label: 'Write script',
        done: Boolean(scriptResult),
        description: 'Build a complete script with topic and hook context.',
      },
      {
        label: 'Create caption',
        done: Boolean(scriptResult),
        description: 'Generate a caption after the script is ready.',
      },
    ],
    [selectedHook, selectedTopic, scriptResult]
  )

  const scrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(sectionId as any)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">ContentAI Workspace</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              One page for discovering trends, reviewing updates, researching topics, generating hooks, creating scripts, and drafting captions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-6">
          <div className="card space-y-4 border-cyan-500/30 bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-900/50">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">Overview</p>
                <h2 className="text-2xl font-bold text-white mt-1">Current session</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${selectedTopic ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 text-green-300' : 'bg-slate-700/50 border border-slate-600 text-slate-300'}`}>
                  {selectedTopic ? '✓ Topic selected' : '○ No topic selected'}
                </span>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${selectedHook ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-300' : 'bg-slate-700/50 border border-slate-600 text-slate-300'}`}>
                  {selectedHook ? '✓ Hook selected' : '○ Hook not selected'}
                </span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-slate-950/50 p-4">
                <p className="text-xs text-cyan-300 uppercase tracking-[0.2em] font-semibold">Current topic</p>
                <p className="mt-3 text-sm text-gray-200">
                  {selectedTopic || 'No topic selected yet. Use Trends, Updates, or Research to start.'}
                </p>
              </div>
              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-950/50 p-4">
                <p className="text-xs text-purple-300 uppercase tracking-[0.2em] font-semibold">Selected hook</p>
                <p className="mt-3 text-sm text-gray-200">
                  {selectedHook?.text || 'Select a hook after topic selection.'}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-pink-500/20 bg-gradient-to-br from-pink-950/30 to-slate-950/50 p-4">
              <p className="text-xs text-pink-300 uppercase tracking-[0.2em] font-semibold">Insights</p>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                {selectedReasoning || 'Insights appear here once a trend, update, or research topic is selected.'}
              </p>
            </div>
          </div>

          <section id="trends">
            <TrendAnalyzer />
          </section>

          <section id="updates">
            <TechUpdates />
          </section>

          <section id="research">
            <DeepResearch />
          </section>

          <section id="hooks">
            <HookGenerator />
          </section>

          <section id="script">
            <ScriptMaker />
          </section>

          <section id="captions">
            <CaptionAgent />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card border border-gray-700 bg-slate-950 p-5">
            <h3 className="text-lg font-semibold text-white mb-3">Progress</h3>
            <p className="text-sm text-gray-400 mb-4">
              Track your work as you create content from a single topic or research result.
            </p>
            <div className="grid gap-3">
              {flowStatus.map((item) => (
                <div key={item.label} className={`rounded-xl border p-3 transition ${item.done ? 'border-green-500/30 bg-gradient-to-br from-green-950/30 to-slate-950/50' : 'border-slate-700 bg-slate-800/50'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <span className={`text-xs font-semibold ${item.done ? 'text-green-400' : 'text-slate-400'}`}>
                      {item.done ? '✓ Done' : '○ Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-cyan-500/20 bg-gradient-to-br from-slate-800/50 via-cyan-900/20 to-slate-900/50 p-5">
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">Navigation</h3>
            <p className="text-sm text-gray-300 mb-4">
              Jump to specific sections while keeping your selections visible.
            </p>
            <div className="grid gap-3">
              <button onClick={() => scrollTo('hooks')} className="btn-primary w-full">
                Go to Hook Generator
              </button>
              <button onClick={() => scrollTo('script')} className="btn-secondary w-full">
                Go to Script Maker
              </button>
            </div>
          </div>

          <Settings />
        </aside>
      </div>
    </div>
  )
}
