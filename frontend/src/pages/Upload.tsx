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
  file?: File;
}

const initialFiles: FileItem[] = [];

const statusIcon = {
  pending: <AlertCircle className="h-4 w-4 text-amber-400" />,
  processing: <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />,
  done: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  error: <AlertCircle className="h-4 w-4 text-red-400" />,
};

const langColor: Record<string, string> = {
  DNA: "bg-violet-500/15 text-violet-400",
  RNA: "bg-fuchsia-500/15 text-fuchsia-400",
  Protein: "bg-rose-500/15 text-rose-400",
  Sample: "bg-slate-500/15 text-slate-400",
};

const sampleImages = [
  { label: "DNA Sequence", src: "/DNA.jpeg" },
  { label: "RNA Sequence", src: "/RNA.jpeg" },
  { label: "Protein Sequence", src: "/Proteins.jpeg" },
];

export default function UploadPage() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inferType = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("dna")) return "DNA";
    if (lower.includes("rna")) return "RNA";
    if (lower.includes("protein")) return "Protein";
    return "Sample";
  };

  const addFile = (name: string, file?: File) => {
    const fileType = inferType(name);
    const newFile: FileItem = {
      id: Date.now().toString(),
      name,
      size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      lang: fileType,
      status: "processing",
      progress: Math.floor(Math.random() * 60) + 10,
      file,
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const handleFileUpload = async (file: File) => {
    addFile(file.name, file);
    // TODO: connect this to your AI pipeline if available.
    // Example: await analyzeImage(file);
  };

  const handleUseSample = async (sample: (typeof sampleImages)[number]) => {
    const response = await fetch(sample.src);
    const blob = await response.blob();
    const extension = sample.src.split('.').pop() || 'jpg';
    const file = new File([blob], `${sample.label.replace(/ /g, '_').toLowerCase()}.${extension}`, {
      type: blob.type,
    });
    await handleFileUpload(file);
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach((f) => handleFileUpload(f));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Sequence Image</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a DNA/RNA/Protein sequence image or use a sample image for quick inference.
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
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
              <p className="font-semibold text-foreground">Drop an image here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, GIF — max 50 MB per image</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["DNA", "RNA", "Protein"].map((lang) => (
                <span key={lang} className={`rounded-full px-3 py-1 text-xs font-medium ${langColor[lang]}`}>{lang}</span>
              ))}
            </div>
            <input ref={inputRef} type="file" multiple className="hidden" accept="image/*"
              onChange={(e) => { Array.from(e.target.files || []).forEach((f) => handleFileUpload(f)); }} />
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-4">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick Test / Examples</p>
                <h2 className="text-base font-semibold">Sample Images for Judges</h2>
              </div>
              <p className="text-sm text-muted-foreground">Click a sample to load it into the queue and preview how the AI can analyze DNA/RNA/Protein sequences.</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {sampleImages.map((sample) => (
                <div key={sample.label} className="overflow-hidden rounded-3xl border border-border/60 bg-background transition hover:border-primary/60 hover:bg-primary/5">
                  <div className="overflow-hidden rounded-t-3xl bg-muted">
                    <img
                      src={sample.src}
                      alt={`Sample ${sample.label}`}
                      className="h-36 w-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">{sample.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">Preview image for quick judge testing</p>
                    <Button variant="secondary" className="mt-4 w-full" onClick={() => handleUseSample(sample)}>
                      Use Sample Image
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Accepted Formats", value: "JPG, PNG, GIF" },
              { label: "Max File Size", value: "50 MB" },
              { label: "Ready for AI Analysis", value: "Image-driven inference" },
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
