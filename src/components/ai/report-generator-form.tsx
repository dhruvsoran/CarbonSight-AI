"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateReport, GenerateReportOutput } from "@/ai/flows/automated-report-generation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  companyName: z.string().min(3, "Company name is required"),
  reportType: z.string().min(1, "Report type is required"),
  emissionData: z.string().min(10, "Emission data is required"),
  complianceRequirements: z.string().min(10, "Compliance requirements are required"),
});

export default function ReportGeneratorForm() {
  const [result, setResult] = useState<GenerateReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "Global Mining Corp.",
      reportType: "annual",
      emissionData: "Total emissions for 2023: 52,300 tCO₂e. Scope 1: 45,000 tCO₂e. Scope 2: 7,300 tCO₂e.",
      complianceRequirements: "Report must adhere to GRI Standards and include a section on future reduction targets.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const report = await generateReport(values);
      setResult(report);
      toast({
        title: "Report Generated",
        description: "Your ESG report is ready for review and download.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate report from AI.",
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
          <CardTitle>AI Report Generator</CardTitle>
          <CardDescription>Automatically produce ESG-friendly carbon emission reports for compliance.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
               <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="reportType" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Report Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a report type" /></SelectTrigger></FormControl>
                          <SelectContent>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
              )} />
               <FormField control={form.control} name="emissionData" render={({ field }) => (
                  <FormItem><FormLabel>Emission Data Summary</FormLabel><FormControl><Textarea placeholder="e.g., Total emissions for Q2 2024..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="complianceRequirements" render={({ field }) => (
                  <FormItem><FormLabel>Compliance Requirements</FormLabel><FormControl><Textarea placeholder="e.g., Adhere to GRI standards..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Report</>}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className={`transition-opacity duration-500 ${result || isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated Report Preview</CardTitle>
            <CardDescription>Review the AI-generated report below. Download as PDF.</CardDescription>
          </div>
          <Button variant="outline" size="icon" disabled={!result}>
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="flex items-center justify-center h-60"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
          {result && (
            <div className="prose prose-sm prose-invert max-w-none h-[600px] overflow-y-auto bg-muted/30 p-4 rounded-md border">
              <pre className="whitespace-pre-wrap font-sans">{result.reportContent}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
