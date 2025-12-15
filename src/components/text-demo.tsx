"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, CornerDownLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { BotAvatar } from "./chat/bot-avatar";

export function TextDemo() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: 'initial',
        role: 'assistant',
        content: 'Welcome to East India Automation. I am the automated Protocol Agent. How may I direct your inquiry regarding our AI infrastructure services?'
      }
    ]
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
          {messages.map((m) => (
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
