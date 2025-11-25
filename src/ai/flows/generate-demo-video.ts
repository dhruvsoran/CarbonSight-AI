'use server';

/**
 * @fileOverview Generates a demo video for the CarbonSight AI platform.
 *
 * - generateDemoVideo - A function that generates the video.
 * - GenerateDemoVideoOutput - The return type for the generateDemoVideo function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';
import {MediaPart} from 'genkit/model';

const GenerateDemoVideoOutputSchema = z.object({
  video: z.string().describe('The generated video as a data URI.'),
});
export type GenerateDemoVideoOutput = z.infer<typeof GenerateDemoVideoOutputSchema>;

export async function generateDemoVideo(): Promise<GenerateDemoVideoOutput> {
  return generateDemoVideoFlow();
}

const generateDemoVideoFlow = ai.defineFlow(
  {
    name: 'generateDemoVideoFlow',
    inputSchema: z.void(),
    outputSchema: GenerateDemoVideoOutputSchema,
  },
  async () => {
    let {operation} = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt:
        'A dynamic, futuristic animation of a software dashboard for environmental data analysis. Show graphs, charts, and maps with data points appearing. The theme is clean, with a high-tech feel, using a palette of greens, blues, and dark grays. The video should convey a sense of precision, intelligence, and environmental responsibility. A cinematic aerial shot of a modern, clean mining operation integrated with lush green landscapes.',
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find(p => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video');
    }

    // Veo returns a URL that needs the API key to be accessed
    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
      `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`
    );

    if (
      !videoDownloadResponse ||
      videoDownloadResponse.status !== 200 ||
      !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }

    const videoBuffer = await videoDownloadResponse.arrayBuffer();
    const base64Video = Buffer.from(videoBuffer).toString('base64');

    return {
      video: `data:video/mp4;base64,${base64Video}`,
    };
  }
);
