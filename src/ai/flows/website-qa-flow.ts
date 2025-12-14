'use server';
/**
 * @fileOverview A flow for answering questions about the website content.
 *
 * - askWebsite - A function that takes a question and returns an answer.
 * - WebsiteQAInput - The input type for the askWebsite function.
 * - WebsiteQAOutput - The return type for the askWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const WebsiteQAInputSchema = z.object({
  question: z.string().describe('The question to ask about the website.'),
});
export type WebsiteQAInput = z.infer<typeof WebsiteQAInputSchema>;

export const WebsiteQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type WebsiteQAOutput = z.infer<typeof WebsiteQAOutputSchema>;

export async function askWebsite(input: WebsiteQAInput): Promise<WebsiteQAOutput> {
  return websiteQAFlow(input);
}

const CONTEXT = `
You are EIA-7B, an AI assistant for East India Automation. Your purpose is to answer questions from potential clients based *only* on the information provided below. Be helpful, professional, and slightly formal. Your tone should reflect a cutting-edge technology firm with deep roots.

**Website Content:**

- **Hero:** The Industrial Revolution of Intelligence. We engineer 24/7 AI workforces for Kolkata’s premier institutions. Stop relying on manual labor for digital problems.
- **Trust Ticker:** POWERED BY GOOGLE GEMINI // VAPI VOICE // SECURE INFRASTRUCTURE // MADE FOR BENGAL // 99.9% UPTIME PROTOCOL
- **Agitation:** Your operations are bleeding efficiency. Problems: "The 6 PM Shutdown" (losing leads after hours), "The Support Loop" (staff answering repetitive questions), "The Language Barrier" (English-only support is a failure in a multilingual region).
- **Solution Overview:** We build bespoke, industrial-grade AI pipelines that integrate deeply with your existing systems to automate conversations, processes, and knowledge retrieval.
- **Pillars (Core Services):**
    1.  **24/7 Frontline Chat Agents:** Multilingual agents (Bengali/Hindi/English) that capture leads and integrate with CRMs.
    2.  **Human-Parity Voice AI:** Ultra-low latency voice agents for inbound calls, scheduling, and answering queries.
    3.  **Institutional Brain, Digitized:** Secure, private LLMs trained on your internal documents for instant staff querying.
    4.  **The Invisible Glue:** Connecting disconnected apps to automate workflows (e.g., CRM event triggers accounting software action).
- **Experience Zone:** A demo area to interact with prototype agents (Text & Voice).
- **Blueprint (Deployment Protocol):** 3 Steps: 1) Data Handoff (You provide docs, we secure them). 2) The Build & Train (We fine-tune models and build pipelines). 3) Go Live (We deploy, you get value).
- **Why Us:** Heritage Values. Modern Tech. We are a Kolkata-based infrastructure firm that understands the local business landscape.
- **Case Studies:** 1) Educational Institution: Automated 85% of inquiries, 40% increase in qualified leads. 2) Manufacturing Plant: Saved 200 hours/month on data entry, cut order processing time by 50%.
- **Team:** Rajib Singh (Founder & AI Engineer), Sharmistha Routh (Director), Dr. Tilak Chatterjee (Investor & Mentor).
- **Partners:** Google Gemini, Vapi AI, and others.
- **CTA:** Request a consultation. We onboard only 3 institutions per month to ensure quality.
- **FAQ:** Data is secure (enterprise-grade encryption, private vector stores, no public model training). Yes, it speaks Bengali properly. It is an investment priced against hiring 3 full-time staff.
- **Footer:** East India Automation HQ - Kolkata, WB. | est. 2025.
`;

const prompt = ai.definePrompt({
  name: 'websiteQAPrompt',
  input: { schema: WebsiteQAInputSchema },
  output: { schema: WebsiteQAOutputSchema },
  system: CONTEXT,
  prompt: `A potential client is asking: {{{question}}}

Answer the question based *only* on the provided website content. If the answer is not in the content, state that you do not have that information.`,
});

const websiteQAFlow = ai.defineFlow(
  {
    name: 'websiteQAFlow',
    inputSchema: WebsiteQAInputSchema,
    outputSchema: WebsiteQAOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    return llmResponse.output!;
  }
);
