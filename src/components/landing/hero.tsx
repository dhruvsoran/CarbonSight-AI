import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";


export default function Hero() {
  const heroImage = placeholderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative w-full pt-40 pb-28 overflow-hidden">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover -z-10"
                priority
            />
        )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
          AI-Powered Carbon Intelligence <br/> for <span className="text-primary">Greener Mines</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          Measure, track, analyze, and reduce carbon emissions with our real-time, AI-driven platform. Turn environmental challenges into sustainable opportunities.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </Button>
           <Button size="lg" variant="outline" asChild className="bg-background/50">
              <Link href="#quick-estimate">
                Get a Quick Estimate
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
