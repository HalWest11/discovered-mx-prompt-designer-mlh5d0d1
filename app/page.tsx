'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PromptMetrics {
  accuracy: number
  consistency: number
  safety: number
  hallucination: number
}

export default function Home() {
  const [taskContext, setTaskContext] = useState('')
  const [goals, setGoals] = useState('')
  const [agentRole, setAgentRole] = useState('Research Assistant')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [metrics, setMetrics] = useState<PromptMetrics | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGeneratedPrompt('')
    setMetrics(null)

    // Simulate API delay
    setTimeout(() => {
      setIsGenerating(false)
      const mockPrompt = `# Role: ${agentRole}
## Context: ${taskContext}

You are tasked with ${goals}. Apply a critical thinking framework to synthesize information and generate actionable results.

**Constraints:**
- Prioritize verifiable data sources
- Structure output clearly with headers
- Highlight potential risks or edge cases

**Output Format:**
1. Executive Summary
2. Key Findings
3. Actionable Recommendations (Prioritized 1-3)
4. Review Points`

      setGeneratedPrompt(mockPrompt)
      
      // Simulate metrics generation
      setMetrics({
        accuracy: 94,
        consistency: 88,
        safety: 99,
        hallucination: 12
      })
    }, 2000)
  }

  const handleTestLive = () => {
    setIsTesting(true)
    // Reset after 3 seconds
    setTimeout(() => setIsTesting(false), 3000)
  }

  const data = metrics ? [
    { name: 'Accuracy', value: metrics.accuracy, color: '#10b981' },
    { name: 'Consistency', value: metrics.consistency, color: '#3b82f6' },
    { name: 'Safety', value: metrics.safety, color: '#8b5cf6' },
    { name: 'Hallucination Risk', value: metrics.hallucination, color: '#ef4444' },
  ] : []

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <h1 className="text-xl font-bold text-gray-900">MX Prompt Designer</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Agent Orchestration v1.0</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Configuration */}
          <section className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>⚙️</span> Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Context</label>
                  <textarea
                    className="w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    rows={4}
                    placeholder="Describe the workflow or task for the agent..."
                    value={taskContext}
                    onChange={(e) => setTaskContext(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                  <textarea
                    className="w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    rows={2}
                    placeholder="What should the prompt achieve?"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Role</label>
                  <select
                    className="w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    value={agentRole}
                    onChange={(e) => setAgentRole(e.target.value)}
                  >
                    <option>Research Assistant</option>
                    <option>Code Reviewer</option>
                    <option>Financial Analyst</option>
                    <option>Technical Writer</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !taskContext}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Optimizing Prompt...
                    </>
                  ) : (
                    <>⚡ Generate Optimized Prompt</>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
              <h3 className="text-brand-900 font-semibold text-sm mb-2">Multi-Agent Setup</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded text-xs text-brand-700 border border-brand-200">✓ Orchestrator</span>
                <span className="px-2 py-1 bg-white rounded text-xs text-brand-700 border border-brand-200">✓ Executor</span>
              </div>
            </div>
          </section>

          {/* Right Column: Output */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Metrics Dashboard */}
            {metrics && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">Tested via LLM API</span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Prompt Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">prompt.ts</span>
                </div>
                {generatedPrompt && (
                  <button
                    onClick={handleTestLive}
                    className="text-xs bg-gray-900 hover:bg-gray-700 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
                  >
                    {isTesting ? (
                      <>Running Test Script...</>
                    ) : (
                      <>
                        ▶ Run API Test
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="relative flex-1">
                <textarea
                  readOnly
                  className="w-full h-full min-h-[400px] p-6 bg-white text-gray-800 font-mono text-sm resize-none focus:outline-none"
                  value={generatedPrompt || "Click 'Generate Optimized Prompt' on the left to see results here..."}
                />
                {generatedPrompt && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-600">Copy</button>
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-600">Save Version</button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}