import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, UserCheck, User, Languages, Calendar, MapPin, FileText, ChevronRight } from "lucide-react";

const patients = [
  {
    id: "PAT-0041", name: "Amara Diallo", age: 28, lang: "Swahili", region: "Nairobi, Kenya",
    condition: "Antenatal Care — Week 32", risk: "low", lastQuery: "2h ago",
    queries: 12, avgConfidence: 91,
  },
  {
    id: "PAT-0038", name: "Abena Mensah", age: 34, lang: "Akan", region: "Kumasi, Ghana",
    condition: "Postpartum Recovery — Day 8", risk: "medium", lastQuery: "5h ago",
    queries: 7, avgConfidence: 87,
  },
  {
    id: "PAT-0035", name: "Nakato Ssali", age: 22, lang: "Luganda", region: "Kampala, Uganda",
    condition: "Family Planning Consultation", risk: "low", lastQuery: "1d ago",
    queries: 4, avgConfidence: 89,
  },
  {
    id: "PAT-0031", name: "Zara Omondi", age: 30, lang: "Swahili", region: "Mombasa, Kenya",
    condition: "High-Risk Pregnancy — Hypertension", risk: "high", lastQuery: "30m ago",
    queries: 19, avgConfidence: 93,
  },
];

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

const riskColor: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-400",
  medium: "bg-amber-500/10 text-amber-400",
  high: "bg-red-500/10 text-red-400",
};

export default function PatientID() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof patients[0] | null>(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient ID</h1>
        <p className="text-sm text-muted-foreground mt-1">Patient-level QA history and language profiles</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Card className="overflow-hidden">
            <div className="divide-y divide-border/50">
              {filtered.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelected(patient)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors flex items-start gap-3 ${selected?.id === patient.id ? "bg-muted/40" : ""}`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{patient.name}</p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase ${riskColor[patient.risk]}`}>{patient.risk}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{patient.id} · {patient.lang}</p>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">No patients found</div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg">{selected.name}</CardTitle>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${riskColor[selected.risk]}`}>{selected.risk} risk</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{selected.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Calendar, label: "Age", value: `${selected.age} years` },
                    { icon: Languages, label: "Language", value: selected.lang },
                    { icon: MapPin, label: "Region", value: selected.region },
                    { icon: FileText, label: "Active Condition", value: selected.condition },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5 rounded-md bg-muted/30 px-3 py-2.5">
                      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-5 pb-4">
                    <p className="text-xs text-muted-foreground">Total QA Queries</p>
                    <p className="text-3xl font-bold mt-1">{selected.queries}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last query: {selected.lastQuery}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-5 pb-4">
                    <p className="text-xs text-muted-foreground">Avg Confidence</p>
                    <p className="text-3xl font-bold mt-1 text-primary">{selected.avgConfidence}%</p>
                    <Progress value={selected.avgConfidence} className="h-1.5 mt-2" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Language Profile</CardTitle>
                  <CardDescription>Inference language and regional context</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${langColor[selected.lang]}`}>{selected.lang}</span>
                    <span className="rounded-full px-3 py-1.5 text-sm bg-muted text-muted-foreground">{selected.region}</span>
                    <span className="rounded-full px-3 py-1.5 text-sm bg-muted text-muted-foreground">AMD MI300X inference</span>
                    <span className="rounded-full px-3 py-1.5 text-sm bg-muted text-muted-foreground">RAG-augmented</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground">
              <UserCheck className="h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
