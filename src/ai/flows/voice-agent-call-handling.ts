'use server';
/**
 * @fileOverview An AI agent for real-time voice call handling.
 *
 * - handleVoiceCall - A function that handles inbound calls and automates tasks.
 * - HandleVoiceCallInput - The input type for the handleVoiceCall function.
 * - HandleVoiceCallOutput - The return type for the handleVoiceCall function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandleVoiceCallInputSchema = z.object({
  callTranscript: z
    .string()
    .describe('The transcript of the current voice call.'),
});
export type HandleVoiceCallInput = z.infer<typeof HandleVoiceCallInputSchema>;

const HandleVoiceCallOutputSchema = z.object({
  agentResponse: z.string().describe('The AI agent’s response to the call.'),
});
export type HandleVoiceCallOutput = z.infer<typeof HandleVoiceCallOutputSchema>;

export async function handleVoiceCall(input: HandleVoiceCallInput): Promise<HandleVoiceCallOutput> {
  return handleVoiceCallFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceCallPrompt',
  input: {schema: HandleVoiceCallInputSchema},
  output: {schema: HandleVoiceCallOutputSchema},
  prompt: `You are an ultra-low latency voice agent designed to handle inbound calls.

  Based on the following call transcript, formulate a response to the caller.  Your goal is to schedule appointments and answer queries.

  Call Transcript:
  {{callTranscript}}`,
});

const handleVoiceCallFlow = ai.defineFlow(
  {
    name: 'handleVoiceCallFlow',
    inputSchema: HandleVoiceCallInputSchema,
    outputSchema: HandleVoiceCallOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
