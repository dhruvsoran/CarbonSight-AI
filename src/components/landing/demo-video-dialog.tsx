"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DemoVideoDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>CarbonSight AI Demo</DialogTitle>
          <DialogDescription>
            Watch a brief overview of our platform's key features.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {/* 
              To add your own video, uncomment the iframe below and replace the src with your video URL.
              For example, from YouTube, click "Share", then "Embed", and copy the src value.
            */}
            <div className="text-center text-muted-foreground">
              <p className="font-semibold">Your Demo Video Here</p>
              <p className="text-sm">Please provide a video URL to be embedded.</p>
            </div>
            {/*
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/your-video-id"
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
