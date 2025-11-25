"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateNetZeroPath, NetZeroPathOutput } from "@/ai/flows/ai-net-zero-path-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    mineSize: z.string().min(1, "Mine size is required"),
    currentEmissions: z.coerce.number().min(1, "Emissions must be greater than 0"),
    reductionTarget: z.coerce.number().min(1).max(100),
    timeframe: z.string().min(1, "Timeframe is required"),
    existingSinks: z.string().optional(),
    plannedInitiatives: z.string().optional(),
});

export default function NetZeroPathForm() {
  const [result, setResult] = useState<NetZeroPathOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mineSize: "medium",
      currentEmissions: 50000,
      reductionTarget: 50,
      timeframe: "10 years",
      existingSinks: "100 acres of mixed forest, recently planted.",
      plannedInitiatives: "Considering a small solar farm for administrative buildings.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const path = await generateNetZeroPath({
        ...values,
        existingSinks: values.existingSinks || "None",
        plannedInitiatives: values.plannedInitiatives || "None",
      });
      setResult(path);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate Net-Zero path from AI.",
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
          <CardTitle>AI Net-Zero Path Generator</CardTitle>
          <CardDescription>Create a step-by-step action plan to achieve your carbon neutrality goals.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="mineSize" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mine Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select mine size" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="currentEmissions" render={({ field }) => (
                    <FormItem><FormLabel>Current Emissions (tons/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="reductionTarget" render={({ field }) => (
                    <FormItem><FormLabel>Reduction Target (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="timeframe" render={({ field }) => (
                    <FormItem><FormLabel>Timeframe</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="existingSinks" render={({ field }) => (
                  <FormItem><FormLabel>Existing Sinks (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="plannedInitiatives" render={({ field }) => (
                  <FormItem><FormLabel>Planned Initiatives (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Net-Zero Path</>}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className={`transition-opacity duration-500 ${result || isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CardHeader>
          <CardTitle>Your Custom Net-Zero Action Plan</CardTitle>
          <CardDescription>A detailed roadmap generated by CarbonSight AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="flex items-center justify-center h-60"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
          {result && (
            <div className="space-y-6 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
                <div>
                    <h3 className="text-lg font-semibold">Action Plan</h3>
                    <p className="whitespace-pre-wrap font-code bg-muted/50 p-4 rounded-md">{result.actionPlan}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Estimated Cost</h3>
                    <p className="font-code bg-muted/50 p-4 rounded-md">{result.estimatedCost}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Key Performance Indicators (KPIs)</h3>
                    <p className="font-code bg-muted/50 p-4 rounded-md">{result.keyPerformanceIndicators}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
