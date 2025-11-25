"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";

export function DemoVideoDialog({ children }: { children: React.ReactNode }) {

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Platform Preview</DialogTitle>
          <DialogDescription>
            A glimpse of our platform's key features.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex flex-col items-center justify-center text-center text-muted-foreground">
            <PlayCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="font-semibold">Your product demo video here.</p>
            <p className="text-sm">Provide a video URL to be embedded.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
