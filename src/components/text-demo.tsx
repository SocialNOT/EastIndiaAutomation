"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { streamFlow } from "@genkit-ai/next/client";
import { Bot, User, CornerDownLeft } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { askWebsite, WebsiteQAInput, WebsiteQAOutput } from "@/ai/flows/website-qa-flow";

type Message = {
  role: "user" | "bot";
  message: string;
};

export function TextDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { role: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const flowInput: WebsiteQAInput = { question: input };
    const botResponse: Message = { role: 'bot', message: '' };
    setMessages((prev) => [...prev, botResponse]);

    try {
      const stream = await streamFlow(askWebsite, flowInput);
      for await (const chunk of stream) {
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, message: msg.message + chunk.answerChunk }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error streaming flow:", error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, message: "Sorry, I encountered an error. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[60vh] bg-black/80 border border-primary/20 rounded-lg p-4 font-code shadow-[0_0_20px_hsl(var(--primary),0.3)]">
      <ScrollArea className="flex-1 w-full mb-4 pr-4">
        <div ref={scrollAreaRef} className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              {m.role === 'bot' ? <Bot className="text-primary h-6 w-6" /> : <User className="text-accent h-6 w-6" />}
              <div className="flex flex-col">
                <span className={`font-bold ${m.role === 'bot' ? 'text-primary' : 'text-accent'}`}>{m.role === 'bot' ? 'EIA-7B' : 'Operator'}</span>
                <p className="text-muted-foreground whitespace-pre-wrap">{m.message}{i === messages.length -1 && isLoading ? '...' : ''}</p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
              <div className="flex items-start gap-3">
                <Bot className="text-primary h-6 w-6" />
                <div className="flex flex-col">
                    <span className="font-bold text-primary">EIA-7B</span>
                    <p className="text-muted-foreground">Welcome, operator. I am the East India Automation-7B model. Ask me anything about our services.</p>
                </div>
              </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          className="bg-background/50 border-primary/30 h-12 pr-12 text-base"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-10" disabled={isLoading}>
          <CornerDownLeft className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
