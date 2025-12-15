"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/components/modal-provider";

export function CtaSection() {
  const { setOpen } = useModal();

  return (
    <section id="cta" className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
         {/* Placeholder for a glowing globe visual */}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-headline text-5xl md:text-7xl">
          Ready to Automate Your Global Enterprise?
        </h2>
        <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Initiate an International Consultation Protocol. We onboard a limited number of global partners monthly to maintain our quality standards.
        </p>
        <Button 
          size="lg" 
          className="font-bold tracking-wider text-xl w-full max-w-2xl h-auto py-6 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
          onClick={() => setOpen(true)}
        >
          INITIATE INTERNATIONAL CONSULTATION
        </Button>
      </div>
    </section>
  );
}
