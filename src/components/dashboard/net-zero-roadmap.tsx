import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const roadmapItems = [
    { text: "Install Solar Panels (Phase 1)", completed: true },
    { text: "Upgrade Haul Truck Fleet to EV", completed: true },
    { text: "Reforestation Project (Area A)", completed: false },
    { text: "Implement Energy Efficiency Audit", completed: false },
];

export default function NetZeroRoadmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Net-Zero Roadmap</CardTitle>
        <CardDescription>Key milestones towards carbon neutrality.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
            <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border -z-10"></div>
            <ul className="space-y-6">
                {roadmapItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${item.completed ? 'bg-primary' : 'bg-muted'}`}>
                            <CheckCircle2 className={`h-5 w-5 ${item.completed ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        </div>
                        <p className={`pt-1 ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{item.text}</p>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
