import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Users, BookOpen, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

const topicAccuracy = [
  { topic: "Nutrition", accuracy: 92 },
  { topic: "Antenatal Care", accuracy: 88 },
  { topic: "Delivery", accuracy: 85 },
  { topic: "Postnatal", accuracy: 90 },
  { topic: "Breastfeeding", accuracy: 94 },
  { topic: "Family Planning", accuracy: 82 },
];

const queryTrend = [
  { week: "W1", queries: 320 },
  { week: "W2", queries: 410 },
  { week: "W3", queries: 380 },
  { week: "W4", queries: 520 },
  { week: "W5", queries: 490 },
  { week: "W6", queries: 610 },
];

const recentQueries = [
  { lang: "Swahili", query: "Iron-deficiency anemia management in pregnancy", confidence: 93, status: "high" },
  { lang: "Akan", query: "Eclampsia warning signs and emergency response", confidence: 89, status: "high" },
  { lang: "Luganda", query: "Kangaroo mother care for premature infants", confidence: 87, status: "good" },
  { lang: "Swahili", query: "Gestational diabetes dietary management", confidence: 91, status: "high" },
];

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

export default function MaternityWing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Maternity Wing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Maternal and reproductive health QA analytics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Maternity Queries", value: "21,340", icon: Heart, color: "text-pink-400" },
          { label: "Avg Confidence", value: "90.1%", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Languages", value: "3 active", icon: Users, color: "text-sky-400" },
          { label: "Topics Covered", value: "47", icon: BookOpen, color: "text-amber-400" },
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
            <CardTitle className="text-base">Accuracy by Topic</CardTitle>
            <CardDescription>Model confidence per maternity topic (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topicAccuracy} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="topic" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="accuracy" fill="#ec4899" radius={[0, 4, 4, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Query Volume Trend</CardTitle>
            <CardDescription>Weekly maternity queries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={queryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="queries" stroke="#ec4899" strokeWidth={2.5} dot={{ fill: "#ec4899", strokeWidth: 0, r: 4 }} name="Queries" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Maternity Queries</CardTitle>
          <CardDescription>Latest inference outputs in this category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentQueries.map((q, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${langColor[q.lang]}`}>{q.lang}</span>
                </div>
                <p className="text-sm truncate">{q.query}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-primary">{q.confidence}%</p>
                <p className="text-[10px] text-muted-foreground">{q.status === "high" ? "High confidence" : "Good confidence"}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Topic Coverage</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {topicAccuracy.map(({ topic, accuracy }) => (
            <div key={topic} className="rounded-lg border border-border/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{topic}</span>
                <span className="text-sm text-primary font-semibold">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
