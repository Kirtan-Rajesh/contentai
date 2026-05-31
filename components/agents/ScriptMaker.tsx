'use client'

import { useState } from 'react'
import { useContentAIStore } from '@/lib/store/contentaiStore'
import { generateScript } from '@/lib/services/apiService'
import { Script } from '@/lib/types'

export default function ScriptMaker() {
  const {
    setLoading,
    setError,
    loading,
    error,
    selectedTopic,
    selectedHook,
    setScriptResult,
  } = useContentAIStore()
  const [script, setScript] = useState<Script | null>(null)
  const [editedScript, setEditedScript] = useState('')

  const handleGenerateScript = async () => {
    if (!selectedTopic || !selectedHook) {
      setError('Please select a topic and hook first')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await generateScript(selectedTopic, selectedHook.text)
      setScript(data)
      setEditedScript(data.fullScript)
      setScriptResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate script')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="section-title">✍️ Script Maker (45-60 seconds)</h2>

      <div className="card">
        <p className="text-sm text-gray-400 mb-3">
          Selected Hook:{' '}
          <span className="text-blue-300 font-semibold">
            {selectedHook?.text || 'None selected'}
          </span>
        </p>
        <button
          onClick={handleGenerateScript}
          className="btn-primary w-full"
          disabled={loading || !selectedTopic || !selectedHook}
        >
          {loading ? 'Generating...' : 'Generate Script'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {script && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold text-white mb-2">🎣 Hook</h3>
              <p className="text-gray-300 text-sm">{script.hook}</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-white mb-2">📝 Topic</h3>
              <p className="text-gray-300 text-sm">{script.topic}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-white mb-2">📄 Full Script</h3>
            <textarea
              value={editedScript}
              onChange={(e) => setEditedScript(e.target.value)}
              className="input-field w-full h-64 resize-none text-sm"
              placeholder="Edit your script here..."
            />
            <div className="mt-2 text-xs text-gray-400">
              Word count: {editedScript.split(/\s+/).length}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-white mb-2">🎯 CTA</h3>
            <p className="text-gray-300 text-sm">{script.cta}</p>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary flex-1">
              📋 Copy Script
            </button>
            <button className="btn-primary flex-1">
              🎬 Ready to Record
            </button>
            <button className="btn-secondary flex-1">
              🔄 Regenerate
            </button>
          </div>
        </div>
      )}

      {!script && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            Go to Hook Generator tab to select a hook, then generate your script here.
          </p>
        </div>
      )}
    </div>
  )
}
