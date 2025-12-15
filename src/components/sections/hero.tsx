"use client";

import { ThreeGlobe } from "@/components/three-globe";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe, ShieldCheck, Flag } from "lucide-react";
import { useModal } from "../modal-provider";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroSection() {
  const { setOpen } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-animate='hero-title']", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo("[data-animate='hero-subtitle']", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo("[data-animate='hero-credibility']", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6, stagger: 0.1 }
      );
      gsap.fromTo("[data-animate='hero-cta']", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <ThreeGlobe />
      </div>
      <div className="z-10 flex flex-col items-center gap-6 px-4 max-w-4xl mx-auto">
        <h1 data-animate="hero-title" className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground !leading-tight">
          The Global Industrial Renaissance of Intelligence.
        </h1>
        <p data-animate="hero-subtitle" className="max-w-3xl text-base md:text-lg text-muted-foreground">
          Empowering enterprises worldwide with 24/7 AI workforces. From our headquarters in Kolkata to the global stage, we engineer reliable infrastructure.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs md:text-sm text-muted-foreground mt-2">
          <div data-animate="hero-credibility" className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" />
            <span>Govt. Registered Entity</span>
          </div>
          <div data-animate="hero-credibility" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Enterprise-Grade Security</span>
          </div>
          <div data-animate="hero-credibility" className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <span>Deployable in 100+ Countries</span>
          </div>
        </div>
        <div data-animate="hero-cta" className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
          <Button 
            size="lg" 
            className="font-bold tracking-wider text-base md:text-lg h-14 flex-1 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.8)] active:scale-95"
            onClick={() => setOpen(true)}
          >
            DEPLOY GLOBAL INTELLIGENCE
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold tracking-wider text-base md:text-lg h-14 flex-1 border-2 transition-all duration-300 hover:bg-primary/10 active:scale-95">
            <a href="#experience-zone">
              Experience Intl. Demo
              <ArrowDown className="ml-2 h-5 w-5 hidden md:inline" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
