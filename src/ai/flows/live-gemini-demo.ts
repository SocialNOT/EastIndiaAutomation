'use server';
/**
 * @fileOverview A Gemini-powered live demo flow.
 *
 * - liveGeminiDemo - A function that handles interaction with the Gemini model and streams the response.
 * - LiveGeminiDemoInput - The input type for the liveGeminiDemo function.
 * - LiveGeminiDemoOutput - The return type for the liveGeminiDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveGeminiDemoInputSchema = z.object({
  query: z.string().describe('The query to send to the Gemini model.'),
});
export type LiveGeminiDemoInput = z.infer<typeof LiveGeminiDemoInputSchema>;

const LiveGeminiDemoOutputSchema = z.object({
  response: z.string().describe('The response from the Gemini model.'),
});
export type LiveGeminiDemoOutput = z.infer<typeof LiveGeminiDemoOutputSchema>;

export async function liveGeminiDemo(input: LiveGeminiDemoInput) {
    return liveGeminiDemoFlow(input);
}
  

const liveGeminiDemoFlow = ai.defineFlow(
    {
      name: 'liveGeminiDemoFlow',
      inputSchema: LiveGeminiDemoInputSchema,
      outputSchema: LiveGeminiDemoOutputSchema,
    },
    async (input) => {
        const {stream, response} = await ai.generate({
            prompt: input.query,
            model: 'gemini-1.5-flash',
            stream: true,
        });
  
        let text = '';
        for await (const chunk of stream) {
            text += chunk.text;
        }
        
        const final = await response;
        return final.output!;
    }
  );
  
