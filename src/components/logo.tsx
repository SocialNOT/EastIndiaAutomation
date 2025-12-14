"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-48 h-24 md:w-56 md:h-28", className)}>
      <Image 
        src="/logo.png" 
        alt="East India Automation Logo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
