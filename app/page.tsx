'use client'

import { useState } from 'react'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoType, setVideoType] = useState<'long' | 'short'>('long')
  const [loading, setLoading] = useState(false)
  const [tutorial, setTutorial] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTutorial(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, videoType }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'कुछ गलत हो गया')
      }

      setTutorial(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          🎬 YouTube Video Editing Tutorial Agent
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          YouTube videos को analyze करके professional editing tutorials बनाएं
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                YouTube Video URL
              </label>
              <input
                type="text"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Video Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="long"
                    checked={videoType === 'long'}
                    onChange={() => setVideoType('long')}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Long Video</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="short"
                    checked={videoType === 'short'}
                    onChange={() => setVideoType('short')}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Short Video (YouTube Shorts)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Analyze कर रहे हैं...' : '🚀 Editing Tutorial बनाएं'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {tutorial && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              📝 Editing Tutorial
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Video Overview
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{tutorial.overview}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Editing Style Analysis
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">{tutorial.editingStyle}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Step-by-Step Tutorial
                </h3>
                <div className="space-y-4">
                  {tutorial.steps.map((step: any, index: number) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {index + 1}. {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
                      {step.tools && (
                        <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                          <strong>Tools:</strong> {step.tools}
                        </p>
                      )}
                      {step.timestamp && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          ⏱️ {step.timestamp}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Key Techniques
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {tutorial.techniques.map((technique: string, index: number) => (
                    <li key={index}>{technique}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Recommended Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutorial.software.map((soft: string, index: number) => (
                    <span
                      key={index}
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {soft}
                    </span>
                  ))}
                </div>
              </div>

              {tutorial.tips && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                    Pro Tips
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {tutorial.tips.map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>✨ AI-powered video editing analysis</p>
          <p className="mt-1">YouTube videos को analyze करके professional editing tutorials बनाता है</p>
        </div>
      </div>
    </main>
  )
}
