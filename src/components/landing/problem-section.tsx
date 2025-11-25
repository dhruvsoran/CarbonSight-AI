import { GanttChartSquare, ShieldAlert, MountainSnow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const problems = [
  {
    icon: <GanttChartSquare className="h-10 w-10 text-primary" />,
    title: "Lack of Clear Tools",
    description: "Mines struggle with fragmented and inaccessible tools to monitor their carbon footprint effectively."
  },
  {
    icon: <ShieldAlert className="h-10 w-10 text-primary" />,
    title: "Inaccurate Tracking",
    description: "Poor monitoring leads to unreliable data, making it difficult to plan actionable steps for carbon neutrality."
  },
  {
    icon: <MountainSnow className="h-10 w-10 text-primary" />,
    title: "Environmental Challenges",
    description: "Increasing regulatory pressure and environmental impact demand a proactive approach to emission reduction."
  }
];

export default function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">The Core Challenge for Mines</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Navigating the path to sustainability is complex. Here's what holds the industry back.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full">
                  {problem.icon}
                </div>
                <CardTitle className="mt-4">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
