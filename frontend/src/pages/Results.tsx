import { useParams } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Results() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "unknown";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Results</h1>
          <p className="text-sm text-muted-foreground mt-1">Inference output for run id: {id}</p>
        </div>
        <Link href="/upload">
          <Button variant="secondary">Back to Upload</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder</CardTitle>
          <CardDescription>
            This page wasn’t present in the repo, so I created a minimal version to get the app running.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Next step: wire this to the backend API / history storage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

