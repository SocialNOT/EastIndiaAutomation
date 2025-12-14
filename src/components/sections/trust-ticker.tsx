export function TrustTickerSection() {
    const tickerContent = "POWERED BY GOOGLE GEMINI // VAPI VOICE // SECURE INFRASTRUCTURE // MADE FOR BENGAL // 99.9% UPTIME PROTOCOL // ";
    
    return (
      <section id="trust-ticker" className="w-full bg-background/50 py-4 border-y-2 border-border overflow-hidden">
        <div className="relative flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
                <p key={i} className="text-lg font-semibold text-muted-foreground tracking-widest mx-4">
                    {tickerContent}
                </p>
            ))}
          </div>
        </div>
      </section>
    );
  }
  