"use client";

import { liveGeminiDemo } from "@/ai/flows/live-gemini-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFlow } from "@genkit-ai/next/client";
import { Bot, User } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export function TextDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [stream, setStream] = useState<{ chunk: any }[]>([]);
  
  const [run, { data, loading, error }] = useFlow(liveGeminiDemo);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const running = loading;

  useEffect(() => {
    if (!data) return;
  
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'bot') {
        newMessages[newMessages.length - 1].text = data.response;
      }
      return newMessages;
    });
  
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || running) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage, { role: "bot", text: "" }]);
    run({ query: input });
    setInput("");
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, running]);


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
                <Bot className="h-6 w-6 text-cyan-400 shrink-0 mt-1" />
              )}
              <div
                className={`max-w-xl rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}{msg.role === 'bot' && running && index === messages.length -1 ? '...' : ''}</p>
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
          className="bg-background/80 text-base focus-visible:ring-cyan-400"
          disabled={running}
        />
        <Button type="submit" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" disabled={running}>
          {running ? "Processing..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
