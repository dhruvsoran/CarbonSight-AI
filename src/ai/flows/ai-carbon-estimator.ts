'use server';

/**
 * @fileOverview Predicts total carbon emissions based on user input.
 *
 * - aiCarbonEstimator - A function that predicts total carbon emissions.
 * - AiCarbonEstimatorInput - The input type for the aiCarbonEstimator function.
 * - AiCarbonEstimatorOutput - The return type for the aiCarbonEstimator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCarbonEstimatorInputSchema = z.object({
  numberOfVehicles: z.number().describe('The number of vehicles used in the mine.'),
  machineryHours: z.number().describe('The number of hours machinery is used.'),
  dieselUsage: z.number().describe('The amount of diesel used in liters.'),
});
export type AiCarbonEstimatorInput = z.infer<typeof AiCarbonEstimatorInputSchema>;

const AiCarbonEstimatorOutputSchema = z.object({
  predictedEmissions: z.number().describe('The predicted total carbon emissions in kilograms.'),
  estimationDetails: z.string().describe('Details about the estimation, including factors considered.'),
});
export type AiCarbonEstimatorOutput = z.infer<typeof AiCarbonEstimatorOutputSchema>;

export async function aiCarbonEstimator(input: AiCarbonEstimatorInput): Promise<AiCarbonEstimatorOutput> {
  return aiCarbonEstimatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCarbonEstimatorPrompt',
  input: {schema: AiCarbonEstimatorInputSchema},
  output: {schema: AiCarbonEstimatorOutputSchema},
  prompt: `You are an AI carbon emission estimator for coal mines.
  Based on the input data, predict the total carbon emissions and provide details about the estimation process.

  Number of Vehicles: {{{numberOfVehicles}}}
  Machinery Hours: {{{machineryHours}}}
  Diesel Usage (Liters): {{{dieselUsage}}}

  Consider factors such as fuel consumption rates, emission factors for diesel,
  and typical operational conditions of coal mines.
  The final answer must include the total predicted carbon emissions in kilograms and an explanation of the factors considered.
  Ensure that the predictedEmissions field is a number.
  Estimation details should clearly explain factors considered.
  Always output the response in JSON format.
  `,
});

const aiCarbonEstimatorFlow = ai.defineFlow(
  {
    name: 'aiCarbonEstimatorFlow',
    inputSchema: AiCarbonEstimatorInputSchema,
    outputSchema: AiCarbonEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
