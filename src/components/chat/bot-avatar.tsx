"use client";

import { cn } from "@/lib/utils";

export function BotAvatar({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-5 w-5 flex-shrink-0", className)}>
      <style>
        {`
          @keyframes wave {
            0%, 60%, 100% { transform: initial; }
            30% { transform: translateY(-6px); }
          }
          .wave-dot {
            animation: wave 1.3s ease-in-out infinite;
            display: inline-block;
            background-color: hsl(var(--primary));
            border-radius: 50%;
            width: 4px;
            height: 4px;
            position: absolute;
            bottom: 2px;
          }
        `}
      </style>
      <span className="wave-dot" style={{ left: '2px', animationDelay: '0s' }}></span>
      <span className="wave-dot" style={{ left: '9px', animationDelay: '0.2s' }}></span>
      <span className="wave-dot" style={{ left: '16px', animationDelay: '0.4s' }}></span>
    </div>
  );
}
