'use client'

import { useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { deepResearch } from '@/lib/services/apiService'
import { DeepResearchResult } from '@/lib/types'

export default function DeepResearch() {
  const { setLoading, setError, loading, error, setSelectedTopic, setSelectedReasoning } = useContentAIStore()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DeepResearchResult | null>(null)
  const [history, setHistory] = useState<DeepResearchResult[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  const dedupeResult = (data: DeepResearchResult): DeepResearchResult => {
    const uniqueAngles = Array.from(new Set(data.contentAngles))
    const uniqueRefs = data.references.filter(
      (ref, index, self) =>
        self.findIndex((item) => item.url === ref.url || item.title === ref.title) === index
    )

    return {
      ...data,
      contentAngles: uniqueAngles,
      references: uniqueRefs,
    }
  }

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return

    setInfoMessage(null)

    const existingResult = history.find(
      (item) => item.query.toLowerCase() === normalizedQuery.toLowerCase()
    )

    try {
      setLoading(true)
      setError(null)

      if (existingResult) {
        setResult(existingResult)
        setSelectedTopic(existingResult.query)
        setSelectedReasoning(existingResult.summary)
        setInfoMessage('This topic was already researched. Showing saved result.')
      } else {
        const data = await deepResearch(normalizedQuery)
        const deduped = dedupeResult(data)
        setHistory((prev) => [...prev, deduped])
        setResult(deduped)
        setSelectedTopic(deduped.query)
        setSelectedReasoning(deduped.summary)
        setInfoMessage('New result added to history. You can select or deselect topics below.')
      }

      setQuery('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Research failed')
    } finally {
      setLoading(false)
    }
  }

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => {
      const alreadySelected = prev.includes(topic)
      const nextTopics = alreadySelected ? prev.filter((item) => item !== topic) : [...prev, topic]

      if (alreadySelected) {
        if (result?.query === topic) {
          setSelectedTopic(null)
        }
      } else {
        setSelectedTopic(topic)
      }

      return nextTopics
    })
  }

  const viewHistoryResult = (item: DeepResearchResult) => {
    setResult(item)
    setInfoMessage(`Viewing saved research for "${item.query}".`)
  }

  return (
    <div className="space-y-6">
      <h2 className="section-title">🔬 Deep Research Agent</h2>

      <form onSubmit={handleResearch} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Research Topic
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Mamba SSM vs Transformer 2025"
              className="input-field flex-1"
              disabled={loading}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Researching...' : 'Research'}
            </button>
          </div>
        </div>
      </form>

      {infoMessage && (
        <div className="bg-blue-900 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg">
          {infoMessage}
        </div>
      )}

      {history.length > 0 && (
        <div className="card space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Recent Research Topics</h3>
            <span className="text-sm text-gray-400">{history.length} saved</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {history.map((item) => {
              const isSelected = selectedTopics.includes(item.query)
              return (
                <button
                  key={item.query}
                  onClick={() => toggleTopic(item.query)}
                  className={`px-3 py-2 rounded-full text-sm transition-all border ${
                    isSelected
                      ? 'border-blue-400 bg-blue-700 text-white'
                      : 'border-gray-600 bg-gray-800 text-gray-200 hover:border-gray-500'
                  }`}
                >
                  {item.query} {isSelected ? '✓' : 'Select'}
                </button>
              )
            })}
          </div>

          <div className="grid gap-3">
            {history.map((item) => (
              <div
                key={item.query}
                className="border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Saved topic</p>
                    <p className="text-white font-medium">{item.query}</p>
                  </div>
                  <button
                    onClick={() => viewHistoryResult(item)}
                    className="btn-secondary text-xs"
                  >
                    View result
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">Research Summary</h3>
            <p className="text-gray-300">{result.summary}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-3">Key Findings</h3>
            <ul className="space-y-2">
              {result.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span className="text-gray-300">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-3">Content Angles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.contentAngles.map((angle, idx) => (
                <div key={idx} className="bg-gray-700 rounded p-3">
                  <p className="text-sm text-blue-300 font-medium">Angle {idx + 1}</p>
                  <p className="text-sm text-gray-300 mt-2">{angle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-3">References</h3>
            <div className="space-y-2">
              {result.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  <p className="text-blue-400 hover:text-blue-300 text-sm font-medium">{ref.title}</p>
                  <p className="text-xs text-gray-400">{ref.source}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">Enter a topic to start deep research.</p>
        </div>
      )}
    </div>
  )
}
