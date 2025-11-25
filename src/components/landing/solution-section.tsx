import { BrainCircuit, Sprout, Route, FileText } from "lucide-react";

const solutions = [
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "AI Carbon Estimator",
    description: "Predict total carbon emissions with high accuracy based on operational inputs."
  },
  {
    icon: <Sprout className="h-8 w-8" />,
    title: "AI Sink Optimization",
    description: "Get recommendations for the most effective carbon sinks to offset emissions."
  },
  {
    icon: <Route className="h-8 w-8" />,
    title: "AI Net-Zero Path Generator",
    description: "Automatically create a step-by-step action plan to achieve carbon neutrality."
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "AI Report Generator",
    description: "Produce ESG-friendly carbon emission reports for compliance effortlessly."
  }
];

export default function SolutionSection() {
  return (
    <section className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Introducing CarbonSight AI</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Our intelligent platform provides the clarity and foresight needed for a sustainable future.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution) => (
            <div key={solution.title} className="p-6 rounded-lg border bg-background/50 shadow-lg hover:shadow-primary/20 transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold">{solution.title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
