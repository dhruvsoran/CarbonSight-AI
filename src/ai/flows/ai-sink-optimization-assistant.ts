// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for the AI Sink Optimization Assistant, which recommends optimal carbon sinks (trees, vegetation, etc.)
 *  to offset mine emissions, helping users make informed decisions on carbon offsetting strategies.
 *
 * - aiSinkOptimizationAssistant - A function that initiates the carbon sink optimization process.
 * - AISinkOptimizationAssistantInput - The input type for the aiSinkOptimizationAssistant function.
 * - AISinkOptimizationAssistantOutput - The return type for the aiSinkOptimizationAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the AI Sink Optimization Assistant
const AISinkOptimizationAssistantInputSchema = z.object({
  emissionAmount: z.number().describe('The amount of carbon emissions to offset in tons.'),
  location: z.string().describe('The geographical location of the mine.'),
  existingVegetation: z.string().describe('Description of the current vegetation around the mine.'),
});
export type AISinkOptimizationAssistantInput = z.infer<
  typeof AISinkOptimizationAssistantInputSchema
>;

// Define the output schema for the AI Sink Optimization Assistant
const AISinkOptimizationAssistantOutputSchema = z.object({
  recommendedSinks: z
    .string()
    .describe(
      'A list of recommended carbon sinks (e.g., types of trees, vegetation) and their estimated carbon absorption rates.'
    ),
  rationale: z.string().describe('The AI’s rationale for recommending these specific carbon sinks.'),
});
export type AISinkOptimizationAssistantOutput = z.infer<
  typeof AISinkOptimizationAssistantOutputSchema
>;

// Define the main function that will be called
export async function aiSinkOptimizationAssistant(
  input: AISinkOptimizationAssistantInput
): Promise<AISinkOptimizationAssistantOutput> {
  return aiSinkOptimizationAssistantFlow(input);
}

// Define the prompt
const prompt = ai.definePrompt({
  name: 'aiSinkOptimizationAssistantPrompt',
  input: {schema: AISinkOptimizationAssistantInputSchema},
  output: {schema: AISinkOptimizationAssistantOutputSchema},
  prompt: `You are an AI assistant specialized in recommending carbon sinks to offset carbon emissions from coal mines.

  Based on the following information, recommend specific types of trees, vegetation, or other carbon sinks that would be most effective for this mine.

  Mine Location: {{{location}}}
  Current Vegetation: {{{existingVegetation}}}
  Emissions to Offset: {{{emissionAmount}}} tons

  Consider factors such as:
    - The local climate and soil conditions.
    - The carbon absorption rate of different plant species.
    - The potential for biodiversity enhancement.
    - Cost effectiveness of planting and maintaining the carbon sinks.

  Provide a list of recommended carbon sinks and their estimated carbon absorption rates, along with a brief rationale for your recommendations.
  `,
});

// Define the flow
const aiSinkOptimizationAssistantFlow = ai.defineFlow(
  {
    name: 'aiSinkOptimizationAssistantFlow',
    inputSchema: AISinkOptimizationAssistantInputSchema,
    outputSchema: AISinkOptimizationAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
