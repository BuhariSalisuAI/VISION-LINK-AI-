import { useState, useEffect } from 'react'

const TASKS = [
  { task: 'Differential Diagnosis — Chest Pain, 54M',         model: 'llama', type: 'Heavy Clinical Task' },
  { task: 'Drug Interaction: metformin + lisinopril',          model: 'mistral', type: 'Localization Task' },
  { task: 'Lab Interpretation — CBC Panel',                    model: 'llama', type: 'Heavy Clinical Task' },
  { task: 'ICD-11 Code Lookup: R07.9',                         model: 'mistral', type: 'Localization Task' },
  { task: 'Clinical Guideline Cross-Reference (NICE)',         model: 'llama', type: 'Heavy Clinical Task' },
  { task: 'Symptom Locale Translation: en → hi',               model: 'mistral', type: 'Localization Task' },
  { task: 'Risk Stratification — Cardiovascular Score',       model: 'llama', type: 'Heavy Clinical Task' },
  { task: 'SNOMED CT Term Mapping',                            model: 'mistral', type: 'Localization Task' },
]

export default function LLMBadge() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setSwitching(true)
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % TASKS.length)
        setSwitching(false)
      }, 300)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const current = TASKS[activeIdx]
  const isLlama = current.model === 'llama'

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-muted tracking-widest">ACTIVE MODEL ROUTER</span>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted">AUTO-SWITCHING ENABLED</span>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Current task */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted mb-1">CURRENT TASK</div>
          <div className={`text-sm text-text transition-opacity duration-300 ${switching ? 'opacity-0' : 'opacity-100'}`}>
            {current.task}
          </div>
          <div className={`text-xs mt-1 transition-opacity duration-300 ${switching ? 'opacity-0' : 'opacity-100'} ${isLlama ? 'text-accent' : 'text-amber'}`}>
            {current.type}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-muted text-lg">→</div>

        {/* Model badges */}
        <div className="flex items-center gap-3">
          {/* Llama badge */}
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 ${
            isLlama
              ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(0,212,255,0.2)]'
              : 'border-border bg-surface opacity-40'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isLlama ? 'bg-accent animate-pulse' : 'bg-muted'}`} />
            <div>
              <div className={`text-xs font-bold tracking-wider ${isLlama ? 'text-accent' : 'text-muted'}`}>
                LLAMA-3-8B
              </div>
              <div className="text-[10px] text-muted">Heavy Clinical Tasks</div>
            </div>
            {isLlama && (
              <span className="ml-1 text-[10px] bg-accent text-bg px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
            )}
          </div>

          <div className="text-muted text-xs">|</div>

          {/* Mistral badge */}
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 ${
            !isLlama
              ? 'border-amber bg-amber/10 shadow-[0_0_20px_rgba(255,184,0,0.2)]'
              : 'border-border bg-surface opacity-40'
          }`}>
            <div className={`w-2 h-2 rounded-full ${!isLlama ? 'bg-amber animate-pulse' : 'bg-muted'}`} />
            <div>
              <div className={`text-xs font-bold tracking-wider ${!isLlama ? 'text-amber' : 'text-muted'}`}>
                MISTRAL-7B
              </div>
              <div className="text-[10px] text-muted">Localization Tasks</div>
            </div>
            {!isLlama && (
              <span className="ml-1 text-[10px] bg-amber text-bg px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
            )}
          </div>
        </div>
      </div>

      {/* Task type breakdown bar */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-muted w-24 shrink-0">TASK SPLIT</span>
        <div className="flex-1 flex rounded overflow-hidden h-1.5">
          <div className="bg-accent" style={{ width: '55%' }} />
          <div className="bg-amber" style={{ width: '45%' }} />
        </div>
        <span className="text-xs text-accent">55% Llama</span>
        <span className="text-xs text-amber">45% Mistral</span>
      </div>
    </div>
  )
}
