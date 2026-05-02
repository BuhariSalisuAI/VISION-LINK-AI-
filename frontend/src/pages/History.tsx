import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Filter, ExternalLink, ChevronRight } from "lucide-react";

const allRecords = [
  { id: "QA-1024", lang: "Swahili", topic: "Maternal nutrition during third trimester", confidence: 94, category: "Maternity", date: "Today, 14:32" },
  { id: "QA-1023", lang: "Akan", topic: "Postpartum care and breastfeeding support", confidence: 88, category: "Maternity", date: "Today, 14:24" },
  { id: "QA-1022", lang: "Luganda", topic: "Newborn vaccination schedule Uganda", confidence: 91, category: "General", date: "Today, 14:11" },
  { id: "QA-1021", lang: "Swahili", topic: "Anemia treatment in pregnancy", confidence: 86, category: "Maternity", date: "Today, 13:47" },
  { id: "QA-1020", lang: "Akan", topic: "Safe delivery complications recognition", confidence: 90, category: "Maternity", date: "Today, 13:25" },
  { id: "QA-1019", lang: "Luganda", topic: "HIV transmission prevention mother to child", confidence: 92, category: "General", date: "Today, 12:50" },
  { id: "QA-1018", lang: "Swahili", topic: "Fever management in infants under 6 months", confidence: 87, category: "General", date: "Today, 12:15" },
  { id: "QA-1017", lang: "Akan", topic: "Family planning methods culturally appropriate", confidence: 83, category: "Maternity", date: "Yesterday, 18:40" },
  { id: "QA-1016", lang: "Luganda", topic: "Malnutrition signs in children under five", confidence: 89, category: "General", date: "Yesterday, 17:22" },
  { id: "QA-1015", lang: "Swahili", topic: "Hypertension management during pregnancy", confidence: 93, category: "Vital Signs", date: "Yesterday, 16:05" },
];

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

const categoryColor: Record<string, string> = {
  Maternity: "bg-pink-500/10 text-pink-400",
  General: "bg-emerald-500/10 text-emerald-400",
  "Vital Signs": "bg-amber-500/10 text-amber-400",
};

export default function History() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<string>("All");

  const langs = ["All", "Swahili", "Akan", "Luganda"];

  const filtered = allRecords.filter((r) => {
    const matchSearch = r.topic.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === "All" || r.lang === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Query History</h1>
        <p className="text-sm text-muted-foreground mt-1">All inference results and QA outputs</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search queries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5">
          {langs.map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                langFilter === lang ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Results</CardTitle>
          <CardDescription>{filtered.length} records found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filtered.map((record) => (
              <div key={record.id} className="flex items-center gap-3 px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{record.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${langColor[record.lang]}`}>{record.lang}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColor[record.category]}`}>{record.category}</span>
                  </div>
                  <p className="text-sm truncate pr-4">{record.topic}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{record.date}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{record.confidence}%</p>
                    <p className="text-[10px] text-muted-foreground">confidence</p>
                  </div>
                  <Link href={`/results/${record.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-12 text-muted-foreground">
                <Search className="h-8 w-8 mb-3 opacity-40" />
                <p className="text-sm">No results match your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
