"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/components/modal-provider";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";

export function CtaSection() {
  const { setOpen } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register } = useScrollAnimations(sectionRef);

  return (
    <section ref={sectionRef} id="cta" className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
         {/* Placeholder for a glowing globe visual */}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 ref={register} className="font-headline text-4xl sm:text-5xl md:text-6xl !leading-tight">
          Ready to Automate Your Global Enterprise?
        </h2>
        <p ref={register} className="mt-4 mb-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Initiate an International Consultation Protocol. We onboard a limited number of global partners monthly to maintain our quality standards.
        </p>
        <div ref={register}>
            <Button 
                size="lg" 
                className="font-bold tracking-wider text-base md:text-xl w-full max-w-lg h-auto py-5 md:py-6 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))] active:scale-95"
                onClick={() => setOpen(true)}
                >
                INITIATE INTERNATIONAL CONSULTATION
            </Button>
        </div>
      </div>
    </section>
  );
}
