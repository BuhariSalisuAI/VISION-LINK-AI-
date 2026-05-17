export default function StatusBar() {
  const metrics = [
    { label: 'PIPELINE', value: 'ACTIVE', color: 'text-green' },
    { label: 'AGENTS ONLINE', value: '2/2', color: 'text-accent' },
    { label: 'TASKS PROCESSED', value: '1,482', color: 'text-text' },
    { label: 'AVG LATENCY', value: '340ms', color: 'text-amber' },
    { label: 'ERROR RATE', value: '0.02%', color: 'text-green' },
    { label: 'MODEL SWITCHES', value: '47', color: 'text-accent' },
  ]

  return (
    <div className="bg-card border-b border-border px-6 py-2 flex items-center gap-8 overflow-x-auto">
      {metrics.map((m, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted tracking-wider">{m.label}</span>
          <span className={`text-xs font-bold ${m.color}`}>{m.value}</span>
        </div>
      ))}
    </div>
  )
}
