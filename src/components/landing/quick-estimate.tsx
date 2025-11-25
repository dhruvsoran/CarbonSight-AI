"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Co2Icon } from '../icons';
import { Loader2 } from 'lucide-react';

// Simplified emission factor for diesel (kg CO2e per liter)
const DIESEL_EMISSION_FACTOR = 2.68;

export default function QuickEstimate() {
  const [dieselUsage, setDieselUsage] = useState('');
  const [estimatedEmissions, setEstimatedEmissions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const usage = parseFloat(dieselUsage);
    if (!isNaN(usage) && usage > 0) {
      setIsLoading(true);
      setEstimatedEmissions(null);
      // Simulate AI calculation delay
      setTimeout(() => {
        const emissions = usage * DIESEL_EMISSION_FACTOR;
        setEstimatedEmissions(emissions);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <section id="quick-estimate" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Get a Glimpse of Our Power</h2>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-xl">
              Curious about your operational emissions? Enter your monthly diesel usage to get an instant, AI-powered estimate. It's a small preview of the deep insights our platform provides.
            </p>
          </div>

          <Card className="w-full max-w-lg mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Co2Icon className="h-6 w-6" />
                Quick Emission Estimator
              </CardTitle>
              <CardDescription>Enter monthly diesel usage to see a sample calculation.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    value={dieselUsage}
                    onChange={(e) => setDieselUsage(e.target.value)}
                    className="flex-grow"
                    required
                  />
                  <Button type="submit" className="w-32" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Calculate'}
                  </Button>
                </div>
              </form>
              {(isLoading || estimatedEmissions !== null) && (
                <div className="mt-6 p-6 bg-background rounded-lg text-center transition-all duration-500">
                  {isLoading ? (
                     <div className="flex flex-col items-center justify-center h-24">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-muted-foreground">AI is calculating...</p>
                    </div>
                  ) : estimatedEmissions !== null && (
                    <div>
                        <p className="text-sm text-muted-foreground">Estimated Monthly Emissions</p>
                        <p className="text-4xl font-bold text-primary mt-1">
                            {Math.round(estimatedEmissions / 1000).toLocaleString()}
                            <span className="text-2xl font-medium text-muted-foreground"> tCO₂e</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            This is a simplified estimate. Our platform provides detailed, multi-factor analysis.
                        </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
