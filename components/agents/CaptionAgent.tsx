'use client'

import { useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { generateCaption } from '@/lib/services/apiService'
import { Caption } from '@/lib/types'

export default function CaptionAgent() {
  const { setLoading, setError, loading, error, scriptResult } = useContentAIStore()
  const [caption, setCaption] = useState<Caption | null>(null)

  const handleGenerateCaption = async () => {
    if (!scriptResult?.fullScript) {
      setError('Please generate a script first in the Script Maker tab')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await generateCaption(scriptResult.fullScript)
      setCaption(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate caption')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="section-title">📝 Caption Agent</h2>

      <div className="card">
        <p className="text-sm text-gray-400 mb-3">
          Based on script from Script Maker tab
        </p>
        <button
          onClick={handleGenerateCaption}
          className="btn-primary w-full"
          disabled={loading || !scriptResult?.fullScript}
        >
          {loading ? 'Generating...' : 'Generate Caption'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {caption && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-white mb-2">📄 Instagram Caption</h3>
            <textarea
              value={caption.text}
              readOnly
              className="input-field w-full h-32 resize-none text-sm"
            />
            <button className="btn-secondary w-full mt-2">
              📋 Copy Caption
            </button>
          </div>

          <div className="card">
            <h3 className="font-semibold text-white mb-3">🏷️ Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {caption.hashtags.map((tag, idx) => (
                <span key={idx} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <button className="btn-secondary w-full mt-3">
              📋 Copy All Hashtags
            </button>
          </div>

          <div className="card">
            <h3 className="font-semibold text-white mb-2">▶️ YouTube Description</h3>
            <textarea
              value={caption.youtubeDescription}
              readOnly
              className="input-field w-full h-32 resize-none text-sm"
            />
            <button className="btn-secondary w-full mt-2">
              📋 Copy YouTube Description
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-primary">
              ✨ Regenerate
            </button>
            <button className="btn-primary">
              💾 Save All
            </button>
          </div>
        </div>
      )}

      {!caption && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            Generate a script first in the Script Maker tab, then create captions here.
          </p>
        </div>
      )}
    </div>
  )
}
