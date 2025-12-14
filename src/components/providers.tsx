"use client";

import { GenkitProvider } from "@genkit-ai/next/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GenkitProvider>{children}</GenkitProvider>;
}
