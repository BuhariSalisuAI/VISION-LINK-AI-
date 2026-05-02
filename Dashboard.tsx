import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { Brain, Upload, Activity, Users, Languages, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

const accuracyData = [
  { month: "Jan", swahili: 72, akan: 68, luganda: 65 },
  { month: "Feb", swahili: 75, akan: 70, luganda: 68 },
  { month: "Mar", swahili: 79, akan: 74, luganda: 72 },
  { month: "Apr", swahili: 82, akan: 77, luganda: 75 },
  { month: "May", swahili: 85, akan: 80, luganda: 78 },
  { month: "Jun", swahili: 88, akan: 83, luganda: 81 },
];

const queryVolumeData = [
  { day: "Mon", queries: 1240 },
  { day: "Tue", queries: 1580 },
  { day: "Wed", queries: 1320 },
  { day: "Thu", queries: 1890 },
  { day: "Fri", queries: 2100 },
  { day: "Sat", queries: 960 },
  { day: "Sun", queries: 740 },
];

const languageDistribution = [
  { name: "Swahili", value: 45, color: "#0ea5e9" },
  { name: "Akan", value: 32, color: "#22d3ee" },
  { name: "Luganda", value: 23, color: "#818cf8" },
];

const recentActivity = [
  { id: "QA-1024", lang: "Swahili", topic: "Maternal nutrition during third trimester", confidence: 94, time: "2m ago" },
  { id: "QA-1023", lang: "Akan", topic: "Postpartum care and breastfeeding support", confidence: 88, time: "8m ago" },
  { id: "QA-1022", lang: "Luganda", topic: "Newborn vaccination schedule Uganda", confidence: 91, time: "15m ago" },
  { id: "QA-1021", lang: "Swahili", topic: "Anemia treatment in pregnancy", confidence: 86, time: "22m ago" },
  { id: "QA-1020", lang: "Akan", topic: "Safe delivery complications recognition", confidence: 90, time: "35m ago" },
];

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vision-Link AI — Multilingual Health QA Overview
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Queries", value: "47,382", delta: "+12.4%", icon: Brain, color: "text-sky-400" },
          { label: "Avg Confidence", value: "88.3%", delta: "+2.1%", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Active Languages", value: "3", delta: "Swahili · Akan · Luganda", icon: Languages, color: "text-indigo-400" },
          { label: "Records Trained", value: "29,841", delta: "of 30,000 target", icon: CheckCircle2, color: "text-amber-400" },
        ].map(({ label, value, delta, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{delta}</p>
                </div>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Model Accuracy by Language</CardTitle>
            <CardDescription>Monthly inference accuracy trend (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={accuracyData}>
                <defs>
                  <linearGradient id="sw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ak" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 95]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="swahili" stroke="#0ea5e9" fill="url(#sw)" strokeWidth={2} name="Swahili" />
                <Area type="monotone" dataKey="akan" stroke="#22d3ee" fill="url(#ak)" strokeWidth={2} name="Akan" />
                <Area type="monotone" dataKey="luganda" stroke="#818cf8" fill="url(#lu)" strokeWidth={2} name="Luganda" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Language Distribution</CardTitle>
            <CardDescription>Query share by language</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={languageDistribution} cx="50%" cy="50%" innerRadius={42} outerRadius={60} paddingAngle={3} dataKey="value">
                  {languageDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {languageDistribution.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <span className="text-muted-foreground">{name}</span>
                  </div>
                  <span className="font-medium">{value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent QA Activity</CardTitle>
            <CardDescription>Latest inference results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${langColor[item.lang]}`}>{item.lang}</span>
                  </div>
                  <p className="text-xs text-foreground/80 truncate">{item.topic}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-primary">{item.confidence}%</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Query Volume</CardTitle>
            <CardDescription>Queries processed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={queryVolumeData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="queries" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Queries" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Upload new health records</p>
              <p className="text-xs text-muted-foreground">Add multilingual medical data to improve model accuracy</p>
            </div>
          </div>
          <Button size="sm" className="gap-1.5 shrink-0" onClick={() => window.location.href = "/upload"}>
              Start Upload <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
