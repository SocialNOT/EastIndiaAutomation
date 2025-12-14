import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("w-48 md:w-64", className)}>
      <svg
        viewBox="0 0 350 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="East India Automation Logo"
      >
        <style>
          {`
            .logo-text-top {
              font-family: 'Playfair Display', serif;
              font-size: 24px;
              fill: hsl(var(--primary));
              font-weight: 700;
              letter-spacing: 2px;
            }
            .logo-text-bottom {
              font-family: 'JetBrains Mono', monospace;
              font-size: 24px;
              fill: hsl(var(--foreground));
              font-weight: 400;
              letter-spacing: -1px;
            }
            .logo-line {
              stroke: hsl(var(--foreground));
              stroke-width: 0.5;
            }
            .logo-chip {
              fill: hsl(var(--foreground));
              animation: pulse 4s infinite ease-in-out;
            }
             @media (prefers-color-scheme: dark) {
              .logo-text-top {
                fill: hsl(var(--primary));
              }
              .logo-text-bottom, .logo-line, .logo-chip {
                fill: hsl(var(--foreground));
                stroke: hsl(var(--foreground));
              }
            }
            @keyframes pulse {
              0%, 100% {
                opacity: 0.7;
              }
              50% {
                opacity: 1;
              }
            }
          `}
        </style>
        
        <text x="0" y="20" className="logo-text-top">EAST INDIA</text>
        
        <g transform="translate(180, 18)" className="logo-chip">
            <line x1="-15" y1="0" x2="15" y2="0" className="logo-line" />
            <rect x="-4" y="-4" width="8" height="8" />
            <path d="M-5 -2 h-1 v-1 h-1 v-1 h1 v-1 h1 v1 h1 v-1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1z" transform="scale(0.5) translate(1,1)" />
            <path d="M5 -2 h1 v-1 h1 v-1 h-1 v-1 h-1 v1 h-1 v-1 h-1 v1 h-1 v1 h1 v1 h1 v-1 h1z" transform="scale(0.5) translate(-1,1)" />
             <path d="M-5 2 h-1 v1 h-1 v1 h1 v1 h1 v-1 h1 v1 h1 v-1 h-1 v-1 h-1 v1 h-1z" transform="scale(0.5) translate(1,-1)" />
            <path d="M5 2 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v1 h-1 v-1 h1 v-1 h1 v-1 h-1z" transform="scale(0.5) translate(-1,-1)" />

        </g>
        
        <text x="0" y="45" className="logo-text-bottom">AUTOMATION</text>
      </svg>
    </div>
  );
}
