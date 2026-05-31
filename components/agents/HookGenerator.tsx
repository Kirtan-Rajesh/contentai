'use client'

import { useEffect, useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { generateHooks } from '@/lib/services/apiService'
import { HookOption } from '@/lib/types'

export default function HookGenerator() {
  const {
    setLoading,
    setError,
    loading,
    error,
    selectedTopic,
    selectedHook,
    setSelectedHook,
  } = useContentAIStore()
  const [topic, setTopic] = useState(selectedTopic || '')
  const [hooks, setHooks] = useState<HookOption[]>([])
  const [selectedHookLocal, setSelectedHookLocal] = useState<HookOption | null>(selectedHook || null)

  useEffect(() => {
    setTopic(selectedTopic || '')
  }, [selectedTopic])

  useEffect(() => {
    setSelectedHookLocal(selectedHook || null)
  }, [selectedHook])

  const handleGenerateHooks = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTopic = topic.trim()
    if (!trimmedTopic) return

    try {
      setLoading(true)
      setError(null)
      const data = await generateHooks(trimmedTopic)
      const uniqueHooks = data.filter(
        (hook, index, self) => self.findIndex((item) => item.text === hook.text) === index
      )
      setHooks(uniqueHooks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hooks')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectHook = (hook: HookOption) => {
    if (selectedHookLocal?.text === hook.text) {
      setSelectedHookLocal(null)
      setSelectedHook(null)
      return
    }

    setSelectedHookLocal(hook)
    setSelectedHook(hook)
  }

  const typeEmojis: Record<string, string> = {
    question: '❓',
    problem: '⚠️',
    result: '✅',
    controversy: '🔥',
    relatable: '😊',
  }

  return (
    <div className="space-y-6">
      <h2 className="section-title">🎣 Hook Generator</h2>

      <form onSubmit={handleGenerateHooks} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Topic for Hooks
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your content topic"
              className="input-field flex-1"
              disabled={loading}
            />
            <button type="submit" className="btn-primary" disabled={loading || !topic.trim()}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {topic && (
        <div className="card bg-blue-950 border-blue-700">
          <p className="text-sm text-gray-300">Current topic:</p>
          <p className="text-white font-semibold">{topic}</p>
        </div>
      )}

      {hooks.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Select your favorite hook to use in Script Maker:</p>
          {hooks.map((hook, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectHook(hook)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedHookLocal?.text === hook.text
                  ? 'border-blue-500 bg-blue-900 bg-opacity-30'
                  : 'border-gray-600 bg-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{typeEmojis[hook.type] || '🎯'}</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{hook.type}</p>
                  <p className="text-white mt-1">{hook.text}</p>
                </div>
                {selectedHookLocal?.text === hook.text && (
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {hooks.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">Generate hooks by entering a topic above.</p>
        </div>
      )}

      {selectedHookLocal && (
        <div className="card border-2 border-green-600 bg-green-900 bg-opacity-20">
          <p className="text-sm text-green-300 mb-2">✓ Hook Selected</p>
          <p className="text-white font-semibold">{selectedHookLocal.text}</p>
          <p className="text-xs text-gray-400 mt-2">Ready to create your script in the Script Maker section.</p>
        </div>
      )}
    </div>
  )
}
