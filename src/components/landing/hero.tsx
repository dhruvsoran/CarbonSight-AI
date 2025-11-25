import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full pt-40 pb-28 overflow-hidden animated-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
          AI-Powered Carbon Intelligence <br/> for <span className="text-primary">Greener Mines</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Measure, track, analyze, and reduce carbon emissions with our real-time, AI-driven platform. Turn environmental challenges into sustainable opportunities.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent">
            <Link href="#">
              <PlayCircle className="mr-2" /> Watch Free Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
