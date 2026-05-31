'use client'

import { useEffect, useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { getTrends, sendToTelegram } from '@/lib/services/apiService'
import { Trend } from '@/lib/types'
import { useTextStream } from '@/lib/utils/useTextStream'

export default function TrendAnalyzer() {
  const {
    setLoading,
    setError,
    loading,
    error,
    trends,
    setTrends,
    selectedTopic,
    setSelectedTopic,
    selectedReasoning,
    setSelectedReasoning,
    setActiveTab,
  } = useContentAIStore()

  const [reasoningSource, setReasoningSource] = useState('')
  const streamedReasoning = useTextStream(reasoningSource, 18)

  const fetchTrends = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTrends()
      if (data && data.length > 0) {
        setTrends(data)
        setError(null)
      } else {
        setError('No trends available. Try again later.')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to fetch trends. Please try again.'
      setError(errorMessage)
      console.error('Trend fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTrend = (trend: Trend) => {
    setSelectedTopic(trend.title)
    setSelectedReasoning(trend.reasoning || `Selected trend: ${trend.title}`)
    setReasoningSource(trend.reasoning || `Selected trend: ${trend.title}`)
    setActiveTab('hooks')
  }

  const handleViewReasoning = (trend: Trend) => {
    setReasoningSource(trend.reasoning || `Selected trend: ${trend.title}`)
  }

  const handleSendToTelegram = async (trend: Trend) => {
    try {
      setLoading(true)
      const message = `📊 Trend: ${trend.title}\n\n🎣 Hooks:\n${trend.hooks.join('\n')}\n\n👥 Audience: ${trend.audience}`
      await sendToTelegram(message)
      alert('Sent to Telegram!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send to Telegram')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrends()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">🔥 Trending Topics</h2>
          <p className="text-sm text-gray-400 mt-1">
            Select a trending topic to use as your content starting point.
          </p>
        </div>
        <button onClick={fetchTrends} className="btn-primary w-full md:w-auto" disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Trends'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {trends.map((trend) => {
          const isSelected = selectedTopic === trend.title
          return (
            <div
              key={trend.id}
              className={`card border transition-all ${
                isSelected ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-950/40 to-slate-900' : 'border-slate-700/50 hover:border-cyan-500/30'
              }`}
            >
              <div className="mb-2">
                <a
                  href={trend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-semibold line-clamp-2"
                >
                  {trend.title}
                </a>
                <p className="text-xs text-gray-400 mt-1">
                  {trend.points} points • {new Date(trend.timestamp).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-1">Hooks:</p>
                <div className="space-y-1">
                  {trend.hooks.slice(0, 3).map((hook, idx) => (
                    <p key={idx} className="text-sm text-gray-300">
                      • {hook}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2 py-1 rounded w-fit">
                  {trend.audience}
                </span>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSelectTrend(trend)}
                    className="btn-primary text-xs flex-1"
                    disabled={loading}
                  >
                    {isSelected ? '✓ Selected' : 'Use this topic'}
                  </button>
                  <button
                    onClick={() => handleViewReasoning(trend)}
                    className="btn-secondary text-xs flex-1"
                  >
                    View Insight
                  </button>
                </div>

                <button
                  onClick={() => handleSendToTelegram(trend)}
                  className="text-xs px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded transition"
                  disabled={loading}
                >
                  📤 Send to Telegram
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-4">
        <div className="card border-pink-500/20 bg-gradient-to-br from-pink-950/20 via-slate-900 to-slate-950">
          <h3 className="font-semibold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">Topic insights</h3>
          <p className="text-sm text-gray-300">
            {streamedReasoning || selectedReasoning || 'Select a trend to see more information.'}
          </p>
        </div>

        <div className="card border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-950">
          <h3 className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">Your selection</h3>
          <p className="text-sm text-gray-300">
            {selectedTopic || 'No topic selected yet. Pick a trending topic or tech update above.'}
          </p>
        </div>
      </div>
    </div>
  )
}
