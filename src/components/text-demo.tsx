"use client";

import { liveGeminiDemo } from "@/ai/flows/live-gemini-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { streamFlow } from "@genkit-ai/next/client";
import { Bot, User } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export function TextDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    const userMessage: Message = { role: "user", text: input };
    const botMessage: Message = { role: "bot", text: "" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    
    const currentInput = input;
    setInput("");

    try {
      const stream = streamFlow(liveGeminiDemo, { query: currentInput });
      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.role === 'bot') {
            lastMessage.text = chunk.response;
          }
          return newMessages;
        });
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, loading]);


  return (
    <div className="flex flex-col h-[60vh] bg-black/50 border border-primary/20 rounded-lg p-4 font-code">
      <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "bot" && (
                <Bot className="h-6 w-6 text-accent shrink-0 mt-1" />
              )}
              <div
                className={`max-w-xl rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}{msg.role === 'bot' && loading && index === messages.length -1 ? '...' : ''}</p>
              </div>
              {msg.role === "user" && (
                <User className="h-6 w-6 text-primary shrink-0 mt-1" />
              )}
            </div>
          ))}
          {error && <p className="text-destructive">Error: {error.message}</p>}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query the system..."
          className="bg-background/80 text-base focus-visible:ring-accent"
          disabled={loading}
        />
        <Button type="submit" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground" disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
