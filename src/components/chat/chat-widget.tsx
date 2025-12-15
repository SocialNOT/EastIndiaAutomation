"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";
import { TextDemo } from "../text-demo";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-primary/50 transition-shadow"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[80vh] max-h-[700px] flex flex-col shadow-2xl animate-fade-in-up border-primary/30">
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <h3 className="font-headline text-lg text-primary">EIA Protocol Agent</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <TextDemo />
          </div>
        </Card>
      )}
    </div>
  );
}
