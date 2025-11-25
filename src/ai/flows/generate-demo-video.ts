'use server';

/**
 * @fileOverview Generates a demo image for the CarbonSight AI platform.
 *
 * - generateDemoImage - A function that generates the image.
 * - GenerateDemoImageOutput - The return type for the generateDemoImage function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const GenerateDemoImageOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
});
export type GenerateDemoImageOutput = z.infer<typeof GenerateDemoImageOutputSchema>;

export async function generateDemoImage(): Promise<GenerateDemoImageOutput> {
  return generateDemoImageFlow();
}

const generateDemoImageFlow = ai.defineFlow(
  {
    name: 'generateDemoImageFlow',
    inputSchema: z.void(),
    outputSchema: GenerateDemoImageOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: googleAI.model('imagen-4.0-fast-generate-001'),
      prompt:
        'A dynamic, futuristic animation of a software dashboard for environmental data analysis. Show graphs, charts, and maps with data points appearing. The theme is clean, with a high-tech feel, using a palette of greens, blues, and dark grays. The image should convey a sense of precision, intelligence, and environmental responsibility. A cinematic aerial shot of a modern, clean mining operation integrated with lush green landscapes.',
    });

    if (!media.url) {
      throw new Error('Failed to generate image');
    }

    return {
      imageUrl: media.url,
    };
  }
);
