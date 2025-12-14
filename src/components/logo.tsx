"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const text = "EIA";

export function Logo({ className }: { className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        // Keep cursor blinking
        setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 500);
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className={cn("relative font-code text-4xl md:text-5xl font-bold text-primary", className)}>
      <span>{displayText}</span>
      <span className={cn("ml-1 inline-block h-8 w-2 bg-primary", showCursor ? 'animate-pulse' : 'opacity-0')}></span>
    </div>
  );
}
