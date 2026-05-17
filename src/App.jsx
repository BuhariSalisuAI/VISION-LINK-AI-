import { useState, useEffect } from 'react'
import AgentLogs from './components/AgentLogs.jsx'
import LLMBadge from './components/LLMBadge.jsx'
import JsonViewer from './components/JsonViewer.jsx'
import StatusBar from './components/StatusBar.jsx'

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Scanline overlay */}
      <div className="scanline fixed inset-0 z-50 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-border bg-surface px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow glow-accent" />
            <span className="font-display text-accent text-sm font-bold tracking-widest text-glow">
              VISION-LINK
            </span>
            <span className="font-display text-muted text-sm tracking-widest">AI HUB</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted">MULTI-AGENT PIPELINE MONITOR</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span>PIPELINE ACTIVE</span>
          </div>
          <span className="text-xs text-muted font-mono">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-amber" />
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <StatusBar />

      {/* Main Dashboard */}
      <main className="p-6 animate-fade-in">
        <div className="max-w-screen-xl mx-auto">

          {/* LLM Badge Row */}
          <div className="mb-6">
            <LLMBadge />
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AgentLogs agentName="Clinical Agent" agentId="CLA-001" color="accent" />
            <AgentLogs agentName="Validation Agent" agentId="VAL-002" color="green" />
          </div>

          {/* JSON Viewer full width */}
          <JsonViewer />

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted mt-8">
        VISION-LINK AI HUB &nbsp;·&nbsp; LangGraph Pipeline &nbsp;·&nbsp; Llama-3-8B + Mistral-7B &nbsp;·&nbsp; v0.1.0-alpha
      </footer>
    </div>
  )
}
