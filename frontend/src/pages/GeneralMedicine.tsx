import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Stethoscope, TrendingUp, AlertCircle, BookOpen } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const conditionData = [
  { condition: "Malaria", queries: 3820, accuracy: 91 },
  { condition: "Tuberculosis", queries: 2140, accuracy: 88 },
  { condition: "HIV/AIDS", queries: 2960, accuracy: 93 },
  { condition: "Malnutrition", queries: 1870, accuracy: 86 },
  { condition: "Diarrheal Diseases", queries: 1540, accuracy: 89 },
  { condition: "Hypertension", queries: 1320, accuracy: 87 },
];

const recentAlerts = [
  { condition: "Ebola preparedness", lang: "Swahili", severity: "high", time: "1h ago" },
  { condition: "Cholera outbreak protocol", lang: "Luganda", severity: "medium", time: "3h ago" },
  { condition: "Monkeypox identification", lang: "Akan", severity: "low", time: "6h ago" },
];

const severityColor: Record<string, string> = {
  high: "text-red-400 bg-red-500/10",
  medium: "text-amber-400 bg-amber-500/10",
  low: "text-emerald-400 bg-emerald-500/10",
};

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

export default function GeneralMedicine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">General Medicine</h1>
        <p className="text-sm text-muted-foreground mt-1">Disease-specific QA accuracy and coverage</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total QA Records", value: "13,650", icon: BookOpen, color: "text-emerald-400" },
          { label: "Avg Model Accuracy", value: "89.0%", icon: TrendingUp, color: "text-sky-400" },
          { label: "Conditions Covered", value: "38", icon: Stethoscope, color: "text-indigo-400" },
          { label: "Active Alerts", value: "3", icon: AlertCircle, color: "text-amber-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Query Volume by Condition</CardTitle>
            <CardDescription>Total queries processed per condition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={conditionData} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="condition" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="queries" fill="#22d3ee" radius={[0, 4, 4, 0]} name="Queries" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Accuracy by Condition</CardTitle>
            <CardDescription>Model confidence scores per disease area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {conditionData.map(({ condition, accuracy }) => (
              <div key={condition} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{condition}</span>
                  <span className="font-semibold text-primary">{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" /> Clinical Alerts
          </CardTitle>
          <CardDescription>Emerging outbreak and preparedness queries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAlerts.map((alert, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${severityColor[alert.severity]}`}>{alert.severity}</span>
                <p className="text-sm truncate">{alert.condition}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${langColor[alert.lang]}`}>{alert.lang}</span>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
