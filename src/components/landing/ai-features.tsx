import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, Sprout, Route, FileText } from "lucide-react";

const aiFeatures = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: "AI Carbon Estimator & Forecaster",
    content: "Our AI model predicts and forecasts carbon emissions with remarkable accuracy by analyzing your inputs like vehicle numbers, machinery hours, and diesel usage. This allows you to anticipate future emissions and take preemptive action.",
  },
  {
    icon: <Sprout className="h-6 w-6 text-primary" />,
    title: "AI Sink Optimization Assistant",
    content: "Don't just track emissions; actively combat them. Our assistant recommends the most effective carbon sinks—such as specific trees and vegetation—tailored to your mine's location and conditions, maximizing your carbon offsetting efforts.",
  },
  {
    icon: <Route className="h-6 w-6 text-primary" />,
    title: "AI Net-Zero Path Generator",
    content: "Achieving carbon neutrality requires a clear plan. Our AI generates a customized, step-by-step roadmap, including actionable initiatives, timelines, and cost estimates, to guide your journey to net-zero.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Automated ESG Report Generation",
    content: "Simplify compliance with our automated reporting tool. Generate government-ready, ESG-friendly carbon emission reports in PDF format, ensuring you meet all regulatory requirements without the administrative headache.",
  },
];

export default function AiFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">The Intelligence Behind Greener Mines</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Explore the unique AI-driven features that set CarbonSight AI apart.
          </p>
        </div>
        <div className="mt-16 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {aiFeatures.map((feature, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card/50 border-border/50 my-2 rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    {feature.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {feature.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
