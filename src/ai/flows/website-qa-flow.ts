"use server";
/**
 * @fileOverview A flow for answering questions about the East India Automation website.
 *
 * - askWebsite - A function that takes a user's question and returns an answer.
 * - WebsiteQAInput - The input type for the askWebsite function.
 * - WebsiteQAOutput - The return type for the askWebsite function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

export const WebsiteQAInputSchema = z.object({
  question: z.string().describe("The user's question about the company."),
});
export type WebsiteQAInput = z.infer<typeof WebsiteQAInputSchema>;

export const WebsiteQAOutputSchema = z.object({
  answerChunk: z.string().describe("A chunk of the answer to the user's question."),
});
export type WebsiteQAOutput = z.infer<typeof WebsiteQAOutputSchema>;

export async function askWebsite(input: WebsiteQAInput): Promise<WebsiteQAOutput> {
  const result = await websiteQAFlow(input);
  // This is a workaround for streaming. We just return the first chunk.
  // The client will use streamFlow to get all chunks.
  return { answerChunk: result.answerChunk };
}

const websiteQAFlow = ai.defineFlow(
  {
    name: "websiteQAFlow",
    inputSchema: WebsiteQAInputSchema,
    outputSchema: WebsiteQAOutputSchema,
    stream: true,
  },
  async (input, streamingCallback) => {
    const companyInfo = `
      East India Automation is a bespoke, industrial-grade AI pipeline provider based in Kolkata. 
      We engineer 24/7 AI workforces for premier institutions. We automate conversations, processes, and knowledge retrieval.

      Core Services (Pillars):
      1. 24/7 Frontline Chat Agents: Multilingual (Bengali/Hindi/English) agents trained on client data to capture leads and integrate with CRMs.
      2. Human-Parity Voice AI: Ultra-low latency voice agents for handling inbound calls, scheduling, and answering queries.
      3. Your Institutional Brain, Digitized: Secure, private Large Language Models trained on internal documents for instant staff querying.
      4. The Invisible Glue: Workflow automation to connect disconnected apps and trigger actions without human intervention.

      Deployment Protocol:
      1. Data Handoff: Client provides raw documents/FAQs, which are secured in vector databases.
      2. The Build & Train: Our engineers fine-tune models and build integration pipelines.
      3. Go Live: We deploy on the client's channels for immediate value capture.

      Why Us:
      We are a Kolkata-based infrastructure firm, not faceless freelancers. We understand the local business landscape and provide unmatched reliability.

      Technology Partners: Google Gemini, Vapi AI, and other leading tech giants.

      Target Audience: Premier institutions in Kolkata and the wider Bengal region. We onboard only 3 institutions per month to ensure quality.
    `;

    const prompt = `You are EIA-7B, a helpful AI assistant for East India Automation. Your personality is professional, slightly formal, and confident, like a high-end consultant. You are representing a premium, cutting-edge technology firm.

    Use the following information about the company to answer the user's question. Answer concisely and stay on topic. Do not make up information. If the answer is not in the provided context, politely state that you do not have that information.

    Company Information:
    ---
    ${companyInfo}
    ---

    User Question: "${input.question}"

    Your Answer:`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: "googleai/gemini-1.5-flash-latest",
      stream: true,
    });

    for await (const chunk of llmResponse.stream) {
      if (chunk.text) {
        streamingCallback({ answerChunk: chunk.text });
      }
    }
    
    // This is needed for the flow to have a final return value.
    const fullResponse = await llmResponse.response;
    return { answerChunk: fullResponse.text || "" };
  }
);
