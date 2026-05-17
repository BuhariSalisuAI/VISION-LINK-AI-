import { useState, useEffect, useRef } from 'react'

const CLINICAL_LOGS = [
  { level: 'INFO', msg: 'Initializing clinical reasoning engine...' },
  { level: 'INFO', msg: 'Loading patient context from EHR adapter' },
  { level: 'TASK', msg: 'Received: Differential diagnosis — chest pain, 54M' },
  { level: 'LLM',  msg: 'Routing to Llama-3-8B-Instruct [heavy clinical task]' },
  { level: 'INFO', msg: 'Generating structured clinical assessment...' },
  { level: 'OK',   msg: 'Assessment complete — 3 differentials identified' },
  { level: 'TASK', msg: 'Received: Drug interaction check — metformin + lisinopril' },
  { level: 'LLM',  msg: 'Routing to Mistral-7B [localization task]' },
  { level: 'OK',   msg: 'No critical interactions found' },
  { level: 'INFO', msg: 'Forwarding payload to Validation Agent...' },
  { level: 'TASK', msg: 'Received: Lab value interpretation — CBC panel' },
  { level: 'LLM',  msg: 'Routing to Llama-3-8B-Instruct [heavy clinical task]' },
  { level: 'INFO', msg: 'Parsing CBC: WBC 11.2, RBC 4.1, HGB 13.2, PLT 220' },
  { level: 'WARN', msg: 'WBC slightly elevated — flagging for review' },
  { level: 'OK',   msg: 'Lab interpretation complete, JSON payload ready' },
]

const VALIDATION_LOGS = [
  { level: 'INFO', msg: 'Validation Agent initialized — awaiting upstream payload' },
  { level: 'INFO', msg: 'Received payload from Clinical Agent [task_id: T-0041]' },
  { level: 'TASK', msg: 'Running schema validation on structured JSON...' },
  { level: 'LLM',  msg: 'Routing to Mistral-7B [localization check]' },
  { level: 'OK',   msg: 'Schema validation passed — all required fields present' },
  { level: 'TASK', msg: 'Cross-referencing clinical guidelines (ICD-11)...' },
  { level: 'LLM',  msg: 'Routing to Llama-3-8B-Instruct [guideline reasoning]' },
  { level: 'INFO', msg: 'Checking NICE guidelines for chest pain protocol' },
  { level: 'OK',   msg: 'Guideline check complete — assessment aligns' },
  { level: 'WARN', msg: 'Confidence score below threshold (0.71) — flagging' },
  { level: 'INFO', msg: 'Escalating to human review queue...' },
  { level: 'OK',   msg: 'Validation complete — payload approved with flag' },
  { level: 'TASK', msg: 'Awaiting next task from Clinical Agent...' },
]

const levelStyle = {
  INFO: 'text-muted',
  TASK: 'text-accent',
  LLM:  'text-amber',
  OK:   'text-green',
  WARN: 'text-red-400',
  ERROR:'text-red-500',
}

const levelBg = {
  INFO: 'bg-muted/10 text-muted',
  TASK: 'bg-accent/10 text-accent',
  LLM:  'bg-amber/10 text-amber',
  OK:   'bg-green/10 text-green',
  WARN: 'bg-red-400/10 text-red-400',
  ERROR:'bg-red-500/10 text-red-500',
}

export default function AgentLogs({ agentName, agentId, color }) {
  const [logs, setLogs] = useState([])
  const [running, setRunning] = useState(true)
  const bottomRef = useRef(null)
  const sourceData = agentName.includes('Clinical') ? CLINICAL_LOGS : VALIDATION_LOGS

  useEffect(() => {
    if (!running) return
    if (logs.length >= sourceData.length) return

    const timer = setTimeout(() => {
      setLogs(prev => [
        ...prev,
        {
          ...sourceData[prev.length],
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          id: Date.now(),
        }
      ])
    }, 900 + Math.random() * 700)

    return () => clearTimeout(timer)
  }, [logs, running])

  useEffect(() => {
    if (logs.length >= sourceData.length) {
      setTimeout(() => setLogs([]), 4000)
    }
  }, [logs])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const dotColor = color === 'accent' ? 'bg-accent' : 'bg-green'
  const borderColor = color === 'accent' ? 'border-accent/20' : 'border-green/20'
  const titleColor = color === 'accent' ? 'text-accent' : 'text-green'

  return (
    <div className={`bg-card border ${borderColor} rounded-lg overflow-hidden`}>
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
          <span className={`text-sm font-bold ${titleColor} tracking-wider`}>{agentName.toUpperCase()}</span>
          <span className="text-xs text-muted">{agentId}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">{logs.length} events</span>
          <button
            onClick={() => setRunning(r => !r)}
            className="text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-text hover:border-muted transition-colors"
          >
            {running ? '⏸ PAUSE' : '▶ RESUME'}
          </button>
        </div>
      </div>

      {/* Log area */}
      <div className="h-64 overflow-y-auto p-3 space-y-1 font-mono text-xs">
        {logs.map((log, i) => (
          <div key={log.id} className="flex items-start gap-2 animate-slide-in">
            <span className="text-muted shrink-0 w-16">{log.time}</span>
            <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${levelBg[log.level]}`}>
              {log.level}
            </span>
            <span className={`${levelStyle[log.level]} break-all`}>{log.msg}</span>
          </div>
        ))}
        {running && logs.length < sourceData.length && (
          <div className="flex items-center gap-2 text-muted">
            <span className="w-16" />
            <span className="animate-blink">█</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
