import { Tractor, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Co2Icon } from "@/components/icons";

const previewData = [
  {
    icon: <Co2Icon className="h-8 w-8 text-primary" />,
    label: "Live CO₂ Emissions",
    value: "412 ppm",
    change: "+2.1% Today"
  },
  {
    icon: <Tractor className="h-8 w-8 text-primary" />,
    label: "Top Machine Footprint",
    value: "Excavator #3",
    change: "14 tCO₂e"
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    label: "Carbon Sink Status",
    value: "82% Capacity",
    change: "-5% vs Target"
  }
];

export default function DataPreview() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Real-Time Data at Your Fingertips</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Integrate with live data sources to get an up-to-the-minute view of your environmental impact.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewData.map((item, index) => (
            <Card key={index} className="bg-card hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{item.value}</div>
                <p className={`text-xs ${item.change.startsWith('+') ? 'text-destructive' : 'text-primary'}`}>{item.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
