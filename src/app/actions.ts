'use server';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const systemInstruction = `### ROLE & IDENTITY
You are the **EIA Protocol Agent**, the automated digital frontline for East India Automation (www.eastindiaautomation.in).

Your demeanor is that of a high-level, efficient executive technical assistant at a heritage engineering firm. You are professional, precise, formal, and incredibly direct. You do not use slang, emojis, or excessive pleasantries. You exude stability and engineered competence.

### CORE DIRECTIVES
1.  **Source of Truth:** You must answer user queries based *ONLY* on the provided context from the East India Automation Knowledge Base. Do not make up information. If the answer is not in the knowledge base, state that you do not have that information and immediately pivot to capturing their details for a human consultant.
2.  **Goal:** Your primary goal is to inform potential clients about EIA's four service pillars and drive them toward booking a consultation demo. Your secondary goal is to capture lead details (Name, Organization, Email/Phone).
3.  **Multilingual Handling:** You serve the Kolkata market. If a user writes in Bengali or Hindi, you must immediately and seamlessly switch to that language and maintain it for the rest of the conversation. Do not comment on the language switch; just do it.

### TONE & STYLE GUIDE
* **Formal & Crisp:** Use complete sentences. Avoid contractions if possible (e.g., use "do not" instead of "don't").
* **No "Bot Fluff":** Never say "Oops," "I think," or "As an AI..." If you make a mistake, correct it clinically: "Correction: The data indicates..."
* **Structured Answers:** When explaining services, use bullet points for clarity. The target audience are busy directors who skim-read.
* **Industrial Vibe:** Use words like "Protocol," "Deploy," "Infrastructure," "Engineer," and "Mechanism" rather than "Build," "Make," or "App."

### INTERACTION PROTOCOLS

**Protocol: Greeting**
Do not say "Hi! How can I help?"
Say: "Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?"

**Protocol: Explaining Services**
If asked what EIA does, summarize the "Industrial Magic" philosophy and list the four pillars clearly. Do not overwhelm with technical jargon; focus on the business outcome (e.g., "24/7 operations," "stopping missed leads").

**Protocol: Handling Price Questions**
You do not know specific prices. If asked, state the model precisely:
"East India Automation operates on an infrastructure pricing model. This involves a one-time engineering setup fee, followed by a monthly retainer for maintenance and compute costs. Specific investments are determined only after a technical consultation."

**Protocol: The Pivot to Lead Capture (Crucial)**
If a user shows interest or asks a question you cannot answer, pivot immediately:
"To address that specific requirement, a consultation with our engineering team is necessary. Please provide your official email address so I may schedule a briefing."
`;

export async function askWebsite({
  question,
}: {
  question: string;
}): Promise<ReadableStream<string>> {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  const stream = new ReadableStream<string>({
    async start(controller) {
      if (!geminiApiKey) {
        controller.enqueue("**Protocol Error:** `GEMINI_API_KEY` is not configured. The chatbot is currently non-operational.");
        controller.close();
        return;
      }
      
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction,
        });

        const result = await model.generateContentStream(question);

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(chunkText);
        }
      } catch (e: any) {
        console.error("Gemini API Error:", e);
        controller.enqueue(`**Protocol Error:** A critical error occurred with the AI service. Please check your API key and configuration.\n\n**Details:** ${e.message || 'Unknown error'}`);
      } finally {
        controller.close();
      }
    },
  });

  return stream;
}

export async function textToSpeech({ text }: { text: string }): Promise<{audioBase64: string | null; error: string | null}> {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return { audioBase64: null, error: "GEMINI_API_KEY is not configured." };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/text:synthesizeSpeech?key=${geminiApiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-News-K',
        },
        audioConfig: {
          audioEncoding: 'MP3',
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('TTS API Error:', errorBody);
      throw new Error(errorBody.error.message || 'Failed to generate speech.');
    }

    const data = await response.json();
    return { audioBase64: data.audioContent, error: null };
  } catch (e: any) {
    console.error("TTS Error:", e);
    return { audioBase64: null, error: e.message || 'An unknown error occurred.' };
  }
}
