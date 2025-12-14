'use server';
/**
 * @fileOverview A multilingual chat agent that can handle inquiries in Bengali, Hindi, and English.
 *
 * - multilingualChatAgent - A function that handles the chat agent process.
 * - MultilingualChatAgentInput - The input type for the multilingualChatAgent function.
 * - MultilingualChatAgentOutput - The return type for the multilingualChatAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultilingualChatAgentInputSchema = z.object({
  query: z.string().describe('The user query in Bengali, Hindi, or English.'),
  language: z
    .enum(['Bengali', 'Hindi', 'English'])
    .describe('The language of the user query.'),
});
export type MultilingualChatAgentInput = z.infer<typeof MultilingualChatAgentInputSchema>;

const MultilingualChatAgentOutputSchema = z.object({
  response: z
    .string()
    .describe('The response from the chat agent in the same language as the query.'),
});
export type MultilingualChatAgentOutput = z.infer<typeof MultilingualChatAgentOutputSchema>;

export async function multilingualChatAgent(input: MultilingualChatAgentInput): Promise<MultilingualChatAgentOutput> {
  return multilingualChatAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'multilingualChatAgentPrompt',
  input: {schema: MultilingualChatAgentInputSchema},
  output: {schema: MultilingualChatAgentOutputSchema},
  prompt: `You are a multilingual chat agent that can handle inquiries in Bengali, Hindi, and English.

You will respond in the same language as the query.

{% if language === 'Bengali' %}
You are fluent in Bengali.
{% elseif language === 'Hindi' %}
You are fluent in Hindi.
{% elseif language === 'English' %}
You are fluent in English.
{% endif %}

Query: {{{query}}}`,
});

const multilingualChatAgentFlow = ai.defineFlow(
  {
    name: 'multilingualChatAgentFlow',
    inputSchema: MultilingualChatAgentInputSchema,
    outputSchema: MultilingualChatAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
