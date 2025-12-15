export function TrustTickerSection() {
    const tickerContent = "PARTNERS: GOOGLE // MICROSOFT AZURE // AWS // SERVING PAN-INDIA & GLOBAL MARKETS (USA, UAE, UK, SG) // ";
    
    return (
      <section id="trust-ticker" className="w-full bg-primary/90 text-primary-foreground py-3 border-y-2 border-primary overflow-hidden">
        <div className="relative flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
                <p key={i} className="text-sm font-code tracking-widest mx-4">
                    {tickerContent}
                </p>
            ))}
          </div>
        </div>
      </section>
    );
  }
  