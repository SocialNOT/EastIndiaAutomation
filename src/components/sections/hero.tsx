"use client";

import { ThreeGlobe } from "@/components/three-globe";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe, ShieldCheck, Flag } from "lucide-react";
import { useModal } from "../modal-provider";

export function HeroSection() {
  const { setOpen } = useModal();

  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center pt-24 pb-12">
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <ThreeGlobe />
      </div>
      <div className="z-10 flex flex-col items-center gap-6 px-4 max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground !leading-tight">
          The Global Industrial Renaissance of Intelligence.
        </h1>
        <p className="max-w-3xl text-base md:text-lg text-muted-foreground">
          Empowering enterprises worldwide with 24/7 AI workforces. From our headquarters in Kolkata to the global stage, we engineer reliable infrastructure.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" />
            <span>Govt. Registered Entity</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Enterprise-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <span>Deployable in 100+ Countries</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
          <Button 
            size="lg" 
            className="font-bold tracking-wider text-base md:text-lg h-12 md:h-14 flex-1 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
            onClick={() => setOpen(true)}
          >
            DEPLOY GLOBAL INTELLIGENCE
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold tracking-wider text-base md:text-lg h-12 md:h-14 flex-1 border-2 transition-all duration-300 hover:bg-primary/10">
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
