import { CheckCircle2 } from "lucide-react";

const usps = [
  "The only platform combining real-time data with predictive AI.",
  "Advanced predictive modeling for emission forecasting.",
  "Intelligent carbon sink recommendations for effective offsetting.",
  "Government-ready reporting to simplify compliance and audits."
];

export default function UspSection() {
  return (
    <section className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Why Choose CarbonSight AI?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            We provide an unparalleled, all-in-one solution designed for the future of mining.
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto">
          <ul className="space-y-6">
            {usps.map((usp, index) => (
              <li key={index} className="flex items-start gap-4 text-lg">
                <CheckCircle2 className="h-7 w-7 text-primary mt-1 shrink-0" />
                <span>{usp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
