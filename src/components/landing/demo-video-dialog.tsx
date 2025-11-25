"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export function DemoVideoDialog({ children }: { children: React.ReactNode }) {
  const mockupImage = placeholderImages.find(img => img.id === 'dashboard-mockup');

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
        <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {mockupImage ? (
                <Image
                    src={mockupImage.imageUrl}
                    alt={mockupImage.description}
                    data-ai-hint={mockupImage.imageHint}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                />
            ) : (
                <div className="text-center text-muted-foreground">
                    <p>Dashboard preview image not found.</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
