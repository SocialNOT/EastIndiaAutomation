
"use client";

import { Button } from "@/components/ui/button";
import { Mic, LoaderCircle, Bot, User } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

type DemoStatus = "idle" | "listening" | "processing" | "speaking" | "ended";

const userQuery = "Tell me about your international human-parity voice AI solutions.";
const agentResponse = "Our voice agents handle inbound calls from any country with ultra-low latency and accent-agnostic understanding, ensuring you never miss a global inquiry.";

export function VoiceDemo() {
  const [status, setStatus] = useState<DemoStatus>("idle");
  const [displayText, setDisplayText] = useState<string | null>(null);
  const [displayRole, setDisplayRole] = useState<"user" | "bot" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startDemo = () => {
    if (status !== "idle" && status !== "ended") return;
    
    cleanup();
    setStatus("listening");
    setDisplayRole("user");
    setDisplayText(userQuery);

    timeoutRef.current = setTimeout(() => {
      setStatus("processing");
      timeoutRef.current = setTimeout(() => {
        setStatus("speaking");
        setDisplayRole("bot");
        setDisplayText(agentResponse);
        
        timeoutRef.current = setTimeout(() => {
          setStatus("ended");
        }, 8000); // Agent finishes "speaking"

      }, 2000); // Processing time
    }, 3000); // User finishes "speaking"
  };

  useEffect(() => {
    return cleanup;
  }, [cleanup]);
  
  const handleButtonClick = () => {
    if (status === "idle" || status === "ended") {
      startDemo();
    } else {
      cleanup();
      setStatus("idle");
      setDisplayRole(null);
      setDisplayText(null);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "listening":
        return (
          <>
            <Mic className="h-12 w-12 text-destructive animate-pulse" />
            <span className="text-xl font-bold tracking-wider">LISTENING...</span>
          </>
        );
      case "processing":
        return (
          <>
            <LoaderCircle className="h-12 w-12 animate-spin" />
            <span className="text-xl font-bold tracking-wider">PROCESSING</span>
          </>
        );
      case "speaking":
        return (
          <>
            <Bot className="h-12 w-12 text-accent" />
            <span className="text-xl font-bold tracking-wider">AGENT RESPONDING</span>
          </>
        );
      case "ended":
         return (
          <>
            <Mic className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">RESTART DEMO</span>
          </>
        );
      case "idle":
      default:
        return (
          <>
            <Mic className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">ACTIVATE DEMO</span>
          </>
        );
    }
  };

  const getButtonClassName = () => {
     switch (status) {
      case "listening":
        return "border-destructive/80 bg-destructive/20 text-destructive-foreground cursor-not-allowed";
      case "processing":
      case "speaking":
        return "border-accent/80 bg-accent/20 text-accent cursor-not-allowed";
      case "ended":
      case "idle":
      default:
        return "border-accent bg-accent/20 text-accent hover:bg-accent/30";
    }
  }
  
  const getHelperText = () => {
    switch (status) {
        case 'listening': return 'Simulating user voice query...';
        case 'speaking': return 'Simulating agent voice response...';
        case 'processing': return 'Thinking...';
        case 'ended': return 'Demo complete. Click to restart.';
        default: return 'Click the button to start the simulated demo.';
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] items-center justify-center bg-black/5 dark:bg-black/50 border border-accent/20 rounded-lg p-4 gap-8">
      <div className="h-24 text-center text-muted-foreground transition-opacity duration-500" style={{opacity: displayRole ? 1 : 0}}>
        {displayRole && (
          <div className="flex flex-col items-center gap-2 max-w-md">
            {displayRole === 'user' ? 
              <User className="h-6 w-6 text-primary" /> : 
              <Bot className="h-6 w-6 text-accent" />
            }
            <p className={`font-code text-base ${displayRole === 'user' ? 'text-primary' : 'text-accent'}`}>
              &quot;{displayText}&quot;
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleButtonClick}
        className={`relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 transition-all duration-300 ease-in-out font-code ${getButtonClassName()}`}
      >
        {getButtonContent()}
      </Button>

      <p className="h-4 text-muted-foreground text-sm">
        {getHelperText()}
      </p>
    </div>
  );
}
