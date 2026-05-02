import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle2, AlertCircle, CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  id: string;
  name: string;
  size: string;
  lang: string;
  status: "pending" | "processing" | "done" | "error";
  progress: number;
}

const initialFiles: FileItem[] = [
  { id: "1", name: "maternal_health_swahili_batch4.csv", size: "2.4 MB", lang: "Swahili", status: "done", progress: 100 },
  { id: "2", name: "akan_reproductive_qa_set2.json", size: "1.8 MB", lang: "Akan", status: "done", progress: 100 },
  { id: "3", name: "luganda_postnatal_records.csv", size: "3.1 MB", lang: "Luganda", status: "processing", progress: 64 },
];

const statusIcon = {
  pending: <AlertCircle className="h-4 w-4 text-amber-400" />,
  processing: <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />,
  done: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  error: <AlertCircle className="h-4 w-4 text-red-400" />,
};

const langColor: Record<string, string> = {
  Swahili: "bg-sky-500/15 text-sky-400",
  Akan: "bg-cyan-500/15 text-cyan-400",
  Luganda: "bg-indigo-500/15 text-indigo-400",
};

export default function UploadPage() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = (name: string) => {
    const langs = ["Swahili", "Akan", "Luganda"];
    const newFile: FileItem = {
      id: Date.now().toString(),
      name,
      size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      lang: langs[Math.floor(Math.random() * langs.length)],
      status: "processing",
      progress: Math.floor(Math.random() * 60) + 10,
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach((f) => addFile(f.name));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Records</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add multilingual health QA datasets to the training pipeline
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="queue">Processing Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 mt-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 cursor-pointer transition-all",
              dragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CloudUpload className="h-7 w-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">Supports CSV, JSON, JSONL, TXT — max 50 MB per file</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Swahili", "Akan", "Luganda"].map((lang) => (
                <span key={lang} className={`rounded-full px-3 py-1 text-xs font-medium ${langColor[lang]}`}>{lang}</span>
              ))}
            </div>
            <input ref={inputRef} type="file" multiple className="hidden" accept=".csv,.json,.jsonl,.txt"
              onChange={(e) => { Array.from(e.target.files || []).forEach((f) => addFile(f.name)); }} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Accepted Formats", value: "CSV, JSON, JSONL, TXT" },
              { label: "Max File Size", value: "50 MB" },
              { label: "Auto-Language Detection", value: "Enabled" },
            ].map(({ label, value }) => (
              <Card key={label}>
                <CardContent className="pt-5 pb-4">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium mt-1">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Processing Queue</CardTitle>
              <CardDescription>{files.length} files in pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="rounded-lg border border-border/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${langColor[file.lang]}`}>{file.lang}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {statusIcon[file.status]}
                      <button onClick={() => removeFile(file.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {file.status === "processing" && (
                    <div className="mt-3 space-y-1">
                      <Progress value={file.progress} className="h-1.5" />
                      <p className="text-[10px] text-muted-foreground">{file.progress}% processed</p>
                    </div>
                  )}
                </div>
              ))}
              {files.length === 0 && (
                <div className="flex flex-col items-center py-10 text-muted-foreground">
                  <Upload className="h-8 w-8 mb-3 opacity-40" />
                  <p className="text-sm">No files in queue</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
