"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { aiCarbonEstimator, AiCarbonEstimatorOutput } from "@/ai/flows/ai-carbon-estimator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  numberOfVehicles: z.coerce.number().min(0, "Must be a positive number"),
  machineryHours: z.coerce.number().min(0, "Must be a positive number"),
  dieselUsage: z.coerce.number().min(0, "Must be a positive number"),
});

export default function CarbonEstimatorForm() {
  const [result, setResult] = useState<AiCarbonEstimatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfVehicles: 10,
      machineryHours: 500,
      dieselUsage: 10000,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const estimation = await aiCarbonEstimator(values);
      setResult(estimation);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get estimation from AI.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>AI Carbon Estimator</CardTitle>
          <CardDescription>Predict total carbon emissions based on your operational data. Fill in the details below to get an AI-powered estimation.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="numberOfVehicles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Vehicles</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="machineryHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Machinery Hours (per month)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dieselUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Diesel Usage (Liters per month)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Estimating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Estimate Emissions
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className={`transition-opacity duration-500 ${result || isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CardHeader>
          <CardTitle>Estimation Result</CardTitle>
          <CardDescription>The AI has generated the following carbon emission estimation.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-60 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">AI is processing your data...</p>
            </div>
          )}
          {result && (
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground">Predicted Emissions</p>
                    <p className="text-4xl font-bold text-primary">{result.predictedEmissions.toLocaleString()} kg CO₂e</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Estimation Details</p>
                    <p className="text-base font-code bg-muted/50 p-4 rounded-md">{result.estimationDetails}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
