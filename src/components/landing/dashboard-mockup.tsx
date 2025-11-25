import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Card } from "../ui/card";

export default function DashboardMockup() {
  const mockupImage = placeholderImages.find(img => img.id === 'dashboard-mockup');

  return (
    <section className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">An Intuitive, Powerful Dashboard</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            All your carbon data, beautifully visualized in one place.
          </p>
        </div>
        <div className="mt-16">
          <Card className="p-2 border-2 border-border/50 bg-background/50 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
            {mockupImage && (
              <Image
                src={mockupImage.imageUrl}
                alt={mockupImage.description}
                data-ai-hint={mockupImage.imageHint}
                width={1200}
                height={800}
                className="rounded-lg"
              />
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
