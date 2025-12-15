"use client";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-code text-4xl md:text-5xl font-bold text-primary tracking-tighter", className)}>
      EIA
    </div>
  );
}
