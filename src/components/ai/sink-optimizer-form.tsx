"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { aiSinkOptimizationAssistant, AISinkOptimizationAssistantOutput } from "@/ai/flows/ai-sink-optimization-assistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  emissionAmount: z.coerce.number().min(1, "Must be at least 1 ton"),
  location: z.string().min(3, "Location is required"),
  existingVegetation: z.string().min(10, "Please describe the existing vegetation"),
});

export default function SinkOptimizerForm() {
  const [result, setResult] = useState<AISinkOptimizationAssistantOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emissionAmount: 1000,
      location: "Wyoming, USA",
      existingVegetation: "Sparse grasslands with some shrubs. Soil is mostly clay.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const optimization = await aiSinkOptimizationAssistant(values);
      setResult(optimization);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get optimization from AI.",
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
          <CardTitle>AI Sink Optimization Assistant</CardTitle>
          <CardDescription>Get recommendations for the best carbon sinks to offset your emissions.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emissionAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbon Emissions to Offset (tons)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mine Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wyoming, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="existingVegetation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Vegetation & Soil Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe current plants and soil..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Get Recommendations</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className={`transition-opacity duration-500 ${result || isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>The AI suggests the following carbon sinks for optimal performance.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-60 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">AI is analyzing your environment...</p>
            </div>
          )}
          {result && (
            <div className="space-y-6 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
                <div>
                    <h3 className="text-lg font-semibold">Recommended Sinks</h3>
                    <p className="font-code bg-muted/50 p-4 rounded-md">{result.recommendedSinks}</p>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold">Rationale</h3>
                    <p className="font-code bg-muted/50 p-4 rounded-md">{result.rationale}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
