'use client'

import { useEffect, useMemo, useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { getTechUpdates } from '@/lib/services/apiService'
import { TechUpdate } from '@/lib/types'
import { useTextStream } from '@/lib/utils/useTextStream'

export default function TechUpdates() {
  const {
    setLoading,
    setError,
    loading,
    error,
    updates,
    setUpdates,
    selectedTopic,
    setSelectedTopic,
    setSelectedReasoning,
    setActiveTab,
  } = useContentAIStore()

  const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null)
  const [reasoningSource, setReasoningSource] = useState('')
  const streamedReasoning = useTextStream(reasoningSource, 18)

  const fetchUpdates = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTechUpdates()
      if (data && data.length > 0) {
        setUpdates(data)
      } else {
        setError('No updates available. Try again later.')
      }
    } catch (err) {
      setError('Unable to fetch updates. Please try again.')
      console.error('Update fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectUpdate = (update: TechUpdate) => {
    setSelectedTopic(update.title)
    setSelectedReasoning(update.reasoning || `Selected update: ${update.title}`)
    setSelectedUpdateId(update.id)
    setReasoningSource(update.reasoning || `Selected update: ${update.title}`)
    setActiveTab('hooks')
  }

  const handleViewReasoning = (update: TechUpdate) => {
    setSelectedUpdateId(update.id)
    setReasoningSource(update.reasoning || `Selected update: ${update.title}`)
  }

  const selectedUpdate = useMemo(
    () => updates.find((update) => update.id === selectedUpdateId),
    [selectedUpdateId, updates]
  )

  useEffect(() => {
    fetchUpdates()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">📰 Latest AI & Tech News</h2>
          <p className="text-sm text-gray-400 mt-1">
            Choose an update to use as your content starting point.
          </p>
        </div>
        <button onClick={fetchUpdates} className="btn-primary w-full md:w-auto" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Updates'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {updates.map((update) => {
          const isSelected = selectedTopic === update.title
          return (
            <div
              key={update.id}
              className={`card border transition-all ${
                isSelected ? 'border-purple-500/50 bg-gradient-to-br from-purple-950/40 to-slate-900' : 'border-slate-700/50 hover:border-purple-500/30'
              }`}
            >
              <div className="mb-3">
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-purple-300 hover:text-purple-200 line-clamp-2"
                >
                  {update.title}
                </a>
                <p className="text-xs text-gray-400 mt-1">
                  {update.source} • {new Date(update.timestamp).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Content Angles:</p>
                  {update.contentAngles.map((angle, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded p-3 mb-2 border border-slate-600/50">
                      <p className="text-sm font-medium text-purple-300">{angle.title}</p>
                      <p className="text-sm text-gray-300 mt-1">{angle.angle}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {angle.contentIdeas.map((idea, i) => (
                          <span key={i} className="text-xs bg-slate-600/70 text-gray-200 px-2 py-1 rounded">
                            {idea}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSelectUpdate(update)}
                    className="btn-primary text-xs flex-1"
                    disabled={loading}
                  >
                    {isSelected ? '✓ Selected' : 'Use this update'}
                  </button>
                  <button
                    onClick={() => handleViewReasoning(update)}
                    className="btn-secondary text-xs flex-1"
                  >
                    View Insight
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-4">
        <div className="card border-pink-500/20 bg-gradient-to-br from-pink-950/20 via-slate-900 to-slate-950">
          <h3 className="font-semibold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">Update insights</h3>
          <p className="text-sm text-gray-300">
            {streamedReasoning || selectedUpdate?.reasoning || 'Select a tech update to see more details.'}
          </p>
        </div>

        <div className="card border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-950">
          <h3 className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">Your selection</h3>
          <p className="text-sm text-gray-300">
            {selectedTopic || 'No topic selected yet. Pick an update or trend above.'}
          </p>
        </div>
      </div>

      {updates.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">No updates found. Click "Fetch Updates" to get started.</p>
        </div>
      )}
    </div>
  )
}
