"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, CornerDownLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { BotAvatar } from "./chat/bot-avatar";

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


export function TextDemo() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: 'initial',
        role: 'assistant',
        content: 'Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?'
      }
    ],
    // Prepend the system prompt to the messages body
    body: {
      systemInstruction,
    },
    // The new API route
    api: '/api/chat'
  });

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background rounded-lg font-code">
      <ScrollArea className="flex-1 w-full p-4" viewportRef={viewportRef}>
        <div className="flex flex-col gap-4">
          {messages.filter(m => m.role !== 'system').map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              {m.role === 'assistant' ? <BotAvatar /> : <User className="text-accent h-5 w-5 flex-shrink-0" />}
              <div className="flex flex-col">
                <span className={`font-bold text-sm ${m.role === 'assistant' ? 'text-primary' : 'text-accent'}`}>{m.role === 'assistant' ? 'EIA Protocol Agent' : 'Operator'}</span>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
              </div>
            </div>
          ))}
           {error && (
            <div className="flex items-start gap-3">
              <BotAvatar />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-destructive">Protocol Error</span>
                <p className="text-destructive/80 text-sm whitespace-pre-wrap leading-relaxed">{error.message}</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={isLoading ? "Generating response..." : "Ask about our services..."}
            className="bg-background/50 border-primary/30 h-11 pr-12 text-sm"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-9" disabled={isLoading || !input.trim()}>
            <CornerDownLeft className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
