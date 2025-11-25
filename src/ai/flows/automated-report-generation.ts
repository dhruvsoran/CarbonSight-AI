'use server';

/**
 * @fileOverview An AI agent to generate ESG-friendly carbon emission reports for compliance purposes automatically.
 *
 * - generateReport - A function that handles the report generation process.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportInputSchema = z.object({
  companyName: z.string().describe('The name of the company for the report.'),
  reportType: z.string().describe('The type of report to generate (e.g., annual, quarterly).'),
  emissionData: z.string().describe('The carbon emission data for the period covered by the report.'),
  complianceRequirements: z.string().describe('The specific compliance requirements to meet.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  reportContent: z.string().describe('The generated ESG-friendly carbon emission report content.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are an expert in generating ESG-friendly carbon emission reports for compliance.

You will generate a report based on the provided emission data and compliance requirements for {{companyName}}.

Report Type: {{reportType}}
Emission Data: {{emissionData}}
Compliance Requirements: {{complianceRequirements}}

Ensure the report meets all specified requirements and is suitable for submission to regulatory bodies.`,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
