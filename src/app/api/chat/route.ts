import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse, Message } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response('**Protocol Error:** `GEMINI_API_KEY` is not configured on the server.', { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  try {
    const { messages } = await req.json();

    const stream = await model.generateContentStream({
        contents: messages.map((m: Message) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        })),
    });

    const aiStream = GoogleGenerativeAIStream(stream);

    return new StreamingTextResponse(aiStream);
  } catch (error: any) {
    console.error('[EIA_CHAT_API_ERROR]', error);
    const errorMessage = error.message || 'An unknown error occurred.';
    // Ensure we send a plain text response for errors
    return new Response(`**Protocol Error:** A server-side error occurred.\n\n**Details:** ${errorMessage}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
