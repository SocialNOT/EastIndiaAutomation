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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollable = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollable) {
        scrollable.scrollTo({
          top: scrollable.scrollHeight,
          behavior: 'smooth'
        });
      }
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
        let fullAnswer = "";
        for await (const chunk of stream) {
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
            lastMessage.message = "An operational error occurred. Please verify your Gemini API key configuration and try again.";
          }
          return newMessages;
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-[60vh] bg-black/80 dark:bg-black/80 border border-primary/20 rounded-lg p-4 font-code shadow-[0_0_20px_hsl(var(--primary),0.3)]">
      <ScrollArea className="flex-1 w-full mb-4 pr-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              {m.role === 'bot' ? <Bot className="text-primary h-6 w-6" /> : <User className="text-accent h-6 w-6" />}
              <div className="flex flex-col">
                <span className={`font-bold ${m.role === 'bot' ? 'text-primary' : 'text-accent'}`}>{m.role === 'bot' ? 'EIA Protocol Agent' : 'Operator'}</span>
                <p className="text-muted-foreground whitespace-pre-wrap">{m.message}{i === messages.length - 1 && isPending && m.role === 'bot' ? '...' : ''}</p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
              <div className="flex items-start gap-3">
                <Bot className="text-primary h-6 w-6" />
                <div className="flex flex-col">
                    <span className="font-bold text-primary">EIA Protocol Agent</span>
                    <p className="text-muted-foreground">Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?</p>
                </div>
              </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={isPending ? "Generating response..." : "Ask about our global logistics protocols... (English / Español / हिंदी)"}
          className="bg-background/50 border-primary/30 h-12 pr-12 text-base"
          disabled={isPending}
        />
        <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-10" disabled={isPending || !input.trim()}>
          <CornerDownLeft className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
