import { useState } from 'react'

const SAMPLE_PAYLOADS = [
  {
    task_id: 'T-0041',
    timestamp: '2026-05-17T10:42:33Z',
    agent: 'clinical_agent',
    model_used: 'llama-3-8b-instruct',
    task_type: 'differential_diagnosis',
    status: 'completed',
    input: { patient_id: 'P-8821', age: 54, sex: 'M', chief_complaint: 'chest pain, exertional, 2h' },
    output: {
      differentials: [
        { rank: 1, diagnosis: 'Unstable Angina', icd11: 'BA80.1', confidence: 0.82, urgency: 'HIGH' },
        { rank: 2, diagnosis: 'GERD with atypical presentation', icd11: 'DA22', confidence: 0.61, urgency: 'LOW' },
        { rank: 3, diagnosis: 'Musculoskeletal chest wall pain', icd11: 'ME84', confidence: 0.44, urgency: 'LOW' },
      ],
      recommended_workup: ['12-lead ECG', 'Troponin I & T', 'CXR', 'CBC + BMP'],
      escalation_flag: true,
    },
    validation: { schema_valid: true, guideline_aligned: true, confidence_threshold_met: false, human_review: true },
    latency_ms: 412,
  },
  {
    task_id: 'T-0042',
    timestamp: '2026-05-17T10:43:01Z',
    agent: 'clinical_agent',
    model_used: 'mistral-7b',
    task_type: 'drug_interaction_check',
    status: 'completed',
    input: { drugs: ['metformin 500mg', 'lisinopril 10mg'], patient_id: 'P-8821' },
    output: {
      interactions_found: 0,
      severity: 'NONE',
      notes: 'No clinically significant interactions detected between metformin and lisinopril at stated doses.',
      monitoring_required: false,
    },
    validation: { schema_valid: true, guideline_aligned: true, confidence_threshold_met: true, human_review: false },
    latency_ms: 188,
  },
]

const urgencyColor = { HIGH: 'text-red-400 bg-red-400/10', MEDIUM: 'text-amber bg-amber/10', LOW: 'text-green bg-green/10' }
const statusColor = { completed: 'text-green bg-green/10', error: 'text-red-400 bg-red-400/10', pending: 'text-amber bg-amber/10' }

function JsonNode({ data, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false)

  if (typeof data === 'boolean') return <span className="text-amber">{String(data)}</span>
  if (typeof data === 'number') return <span className="text-accent">{data}</span>
  if (typeof data === 'string') return <span className="text-green">"{data}"</span>
  if (data === null) return <span className="text-muted">null</span>

  if (Array.isArray(data)) {
    if (collapsed) return (
      <span onClick={() => setCollapsed(false)} className="cursor-pointer text-muted hover:text-text">
        [{data.length} items...]
      </span>
    )
    return (
      <span>
        <span onClick={() => setCollapsed(true)} className="cursor-pointer text-muted hover:text-text">[</span>
        <div className="ml-4">
          {data.map((item, i) => (
            <div key={i} className="my-0.5">
              <JsonNode data={item} depth={depth + 1} />
              {i < data.length - 1 && <span className="text-muted">,</span>}
            </div>
          ))}
        </div>
        <span className="text-muted">]</span>
      </span>
    )
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data)
    if (collapsed) return (
      <span onClick={() => setCollapsed(false)} className="cursor-pointer text-muted hover:text-text">
        {'{'}...{'}'}
      </span>
    )
    return (
      <span>
        <span onClick={() => setCollapsed(true)} className="cursor-pointer text-muted hover:text-text">{'{'}</span>
        <div className="ml-4">
          {entries.map(([k, v], i) => (
            <div key={k} className="my-0.5">
              <span className="text-text/60">"{k}"</span>
              <span className="text-muted">: </span>
              <JsonNode data={v} depth={depth + 1} />
              {i < entries.length - 1 && <span className="text-muted">,</span>}
            </div>
          ))}
        </div>
        <span className="text-muted">{'}'}</span>
      </span>
    )
  }

  return <span className="text-text">{String(data)}</span>
}

function PayloadCard({ payload }) {
  const [view, setView] = useState('cards') // 'cards' | 'raw'

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-accent tracking-wider">{payload.task_id}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${statusColor[payload.status]}`}>
            {payload.status.toUpperCase()}
          </span>
          <span className="text-xs text-muted">{payload.task_type.replace(/_/g, ' ').toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">{payload.latency_ms}ms</span>
          <span className="text-xs text-amber">{payload.model_used}</span>
          <div className="flex gap-1">
            <button onClick={() => setView('cards')} className={`text-xs px-2 py-0.5 rounded border transition-colors ${view === 'cards' ? 'border-accent text-accent' : 'border-border text-muted hover:text-text'}`}>CARDS</button>
            <button onClick={() => setView('raw')} className={`text-xs px-2 py-0.5 rounded border transition-colors ${view === 'raw' ? 'border-accent text-accent' : 'border-border text-muted hover:text-text'}`}>RAW JSON</button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {view === 'raw' ? (
          <pre className="text-xs font-mono text-text leading-relaxed overflow-x-auto">
            <JsonNode data={payload} />
          </pre>
        ) : (
          <div className="space-y-4">
            {/* Differentials if present */}
            {payload.output.differentials && (
              <div>
                <div className="text-xs text-muted mb-2 tracking-wider">DIFFERENTIAL DIAGNOSES</div>
                <div className="space-y-2">
                  {payload.output.differentials.map(d => (
                    <div key={d.rank} className="flex items-center gap-3 bg-card rounded px-3 py-2">
                      <span className="text-xs text-muted w-4">#{d.rank}</span>
                      <span className="text-sm text-text flex-1">{d.diagnosis}</span>
                      <span className="text-xs text-muted">{d.icd11}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${d.confidence * 100}%` }} />
                        </div>
                        <span className="text-xs text-accent w-8">{(d.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${urgencyColor[d.urgency]}`}>{d.urgency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simple output */}
            {payload.output.severity && (
              <div className="bg-card rounded px-3 py-3 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">SEVERITY</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${urgencyColor[payload.output.severity] || 'text-green bg-green/10'}`}>{payload.output.severity}</span>
                </div>
                <p className="text-sm text-text">{payload.output.notes}</p>
              </div>
            )}

            {/* Validation row */}
            <div>
              <div className="text-xs text-muted mb-2 tracking-wider">VALIDATION STATUS</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(payload.validation).map(([k, v]) => (
                  <div key={k} className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${v ? 'bg-green/10 text-green' : 'bg-red-400/10 text-red-400'}`}>
                    <span>{v ? '✓' : '✗'}</span>
                    <span>{k.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JsonViewer() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          <span className="text-sm font-bold text-amber tracking-wider">LANGGRAPH JSON PAYLOAD PARSER</span>
        </div>
        <span className="text-xs text-muted">{SAMPLE_PAYLOADS.length} payloads • live feed</span>
      </div>
      <div className="p-4 space-y-4">
        {SAMPLE_PAYLOADS.map(p => <PayloadCard key={p.task_id} payload={p} />)}
      </div>
    </div>
  )
}
