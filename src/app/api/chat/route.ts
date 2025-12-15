
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse, Message } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ 
      error: `**Protocol Error:** \`GEMINI_API_KEY\` is not configured on the server.` 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const { messages, systemInstruction } = await req.json();
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      systemInstruction: {
        role: 'model',
        parts: [{ text: systemInstruction }],
      },
    });

    const stream = await model.generateContentStream({
      contents: messages.filter((m: Message) => m.role !== 'system' && m.role !== 'assistant' || m.content !== 'Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?').map((m: Message) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const aiStream = GoogleGenerativeAIStream(stream);

    return new StreamingTextResponse(aiStream);

  } catch (error: any) {
    console.error('[EIA_CHAT_API_ERROR]', error);
    const errorMessage = error.message || 'An unknown error occurred.';
    // Return a structured JSON error for the client to handle
    return new Response(JSON.stringify({ 
      error: `**Protocol Error:** A server-side error occurred.\n\n**Details:** ${errorMessage}` 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
