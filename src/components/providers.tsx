"use client";

// The GenkitProvider is no longer needed in recent versions.
// The necessary context is handled automatically by the hooks.
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
