import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const heartRateData = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  value: 72 + Math.sin(i * 0.8) * 8 + Math.random() * 4,
}));

const bloodPressureData = [
  { time: "08:00", systolic: 118, diastolic: 76 },
  { time: "10:00", systolic: 122, diastolic: 79 },
  { time: "12:00", systolic: 125, diastolic: 82 },
  { time: "14:00", systolic: 119, diastolic: 77 },
  { time: "16:00", systolic: 121, diastolic: 78 },
  { time: "18:00", systolic: 116, diastolic: 75 },
];

const tempData = [
  { time: "06:00", temp: 36.7 },
  { time: "09:00", temp: 36.9 },
  { time: "12:00", temp: 37.1 },
  { time: "15:00", temp: 37.3 },
  { time: "18:00", temp: 37.0 },
  { time: "21:00", temp: 36.8 },
];

const vitalMetrics = [
  { label: "Heart Rate", value: "72 bpm", status: "Normal", icon: Heart, color: "text-red-400", statusColor: "text-emerald-400" },
  { label: "Blood Pressure", value: "121/78", status: "Normal", icon: Activity, color: "text-sky-400", statusColor: "text-emerald-400" },
  { label: "Temperature", value: "37.1°C", status: "Normal", icon: Thermometer, color: "text-amber-400", statusColor: "text-emerald-400" },
  { label: "Resp. Rate", value: "16 /min", status: "Normal", icon: Wind, color: "text-indigo-400", statusColor: "text-emerald-400" },
];

export default function VitalSigns() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vital Signs</h1>
        <p className="text-sm text-muted-foreground mt-1">Patient vitals monitoring and QA inference reference</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitalMetrics.map(({ label, value, status, icon: Icon, color, statusColor }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className={`text-xs font-medium mt-1 ${statusColor}`}>{status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" /> Heart Rate Monitor
            </CardTitle>
            <CardDescription>Real-time ECG-style trace (bpm)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="t" hide />
                <YAxis domain={[55, 90]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v.toFixed(1)} bpm`, "Heart Rate"]} />
                <ReferenceLine y={72} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-400" /> Blood Pressure
            </CardTitle>
            <CardDescription>Systolic and diastolic readings (mmHg)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 140]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="systolic" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9" }} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#818cf8" strokeWidth={2} dot={{ r: 3, fill: "#818cf8" }} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-amber-400" /> Body Temperature
          </CardTitle>
          <CardDescription>24-hour temperature trend (°C)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[36, 38]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}°C`, "Temperature"]} />
              <ReferenceLine y={37.5} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: "Fever threshold", fontSize: 10, fill: "#f59e0b" }} />
              <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b" }} name="Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
