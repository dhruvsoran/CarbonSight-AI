"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateDemoVideo } from "@/ai/flows/generate-demo-video";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Film } from "lucide-react";
import { Button } from "../ui/button";

export function DemoVideoDialog({ children }: { children: React.ReactNode }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateVideo = async () => {
    if (videoUrl) return; // Don't re-generate if we already have a video

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateDemoVideo();
      setVideoUrl(result.video);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Video Generation Failed",
        description: "Could not generate the AI demo video. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => {
        if (open && !videoUrl && !isLoading) {
            handleGenerateVideo();
        }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>AI-Generated Platform Demo</DialogTitle>
          <DialogDescription>
            Watch a brief, AI-generated overview of our platform's key features.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {isLoading && (
                <div className="text-center text-muted-foreground space-y-4">
                    <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                    <p className="font-semibold">Generating AI Video...</p>
                    <p className="text-sm">This may take a minute or two. Please wait.</p>
                </div>
            )}
            {error && !isLoading && (
                <div className="text-center text-destructive-foreground bg-destructive/80 p-8 rounded-md">
                    <p className="font-semibold">Generation Failed</p>
                    <p className="text-sm mt-2">{error}</p>
                    <Button variant="secondary" className="mt-4" onClick={handleGenerateVideo}>
                        Retry
                    </Button>
                </div>
            )}
            {!isLoading && !error && videoUrl && (
                <video
                    className="w-full h-full"
                    src={videoUrl}
                    controls
                    autoPlay
                    muted
                >
                    Your browser does not support the video tag.
                </video>
            )}
             {!isLoading && !error && !videoUrl && (
                <div className="text-center text-muted-foreground space-y-4">
                    <Film className="h-12 w-12 mx-auto text-primary" />
                    <p className="font-semibold">Ready to Generate Video</p>
                    <p className="text-sm">The AI-powered demo will start generating when you open this dialog.</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
