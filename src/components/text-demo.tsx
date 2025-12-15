"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, CornerDownLeft } from "lucide-react";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { askWebsite } from "@/app/actions";

type Message = {
  role: "user" | "bot";
  message: string;
};

export function TextDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", message: input };
    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput("");

    startTransition(async () => {
      const botMessage: Message = { role: 'bot', message: '' };
      setMessages(prev => [...prev, botMessage]);

      try {
        const stream = await askWebsite({ question });
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let fullAnswer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            fullAnswer += chunk;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "bot") {
                    lastMessage.message = fullAnswer;
                }
                return newMessages;
            });
        }
      } catch (error) {
        console.error("Error streaming from server action:", error);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "bot") {
            lastMessage.message = "**Protocol Error:** An operational error occurred. Please verify your Gemini API key configuration and try again.";
          }
          return newMessages;
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg font-code">
      <ScrollArea className="flex-1 w-full p-4" viewportRef={viewportRef}>
        <div className="flex flex-col gap-4">
          {messages.length === 0 && (
              <div className="flex items-start gap-3">
                <Bot className="text-primary h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col">
                    <span className="font-bold text-primary text-sm">EIA Protocol Agent</span>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?</p>
                </div>
              </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              {m.role === 'bot' ? <Bot className="text-primary h-5 w-5 flex-shrink-0" /> : <User className="text-accent h-5 w-5 flex-shrink-0" />}
              <div className="flex flex-col">
                <span className={`font-bold text-sm ${m.role === 'bot' ? 'text-primary' : 'text-accent'}`}>{m.role === 'bot' ? 'EIA Protocol Agent' : 'Operator'}</span>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{m.message}{i === messages.length - 1 && isPending && m.role === 'bot' ? '...' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={isPending ? "Generating response..." : "Ask about our services..."}
            className="bg-background/50 border-primary/30 h-11 pr-12 text-sm"
            disabled={isPending}
          />
          <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-9" disabled={isPending || !input.trim()}>
            <CornerDownLeft className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
