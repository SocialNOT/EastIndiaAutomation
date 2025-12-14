"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const text = "EIA";

export function Logo({ className }: { className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        // Keep cursor blinking
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, [isMounted]);

  return (
    <div className={cn("relative font-code text-4xl md:text-5xl font-bold text-primary", className)}>
      <span>{isMounted ? displayText : ""}</span>
      <span className={cn("ml-1 inline-block h-8 w-2 bg-primary", isMounted && showCursor ? 'animate-pulse' : 'opacity-0')}></span>
    </div>
  );
}
