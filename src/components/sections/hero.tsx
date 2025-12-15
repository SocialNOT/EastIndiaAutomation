"use client";

import { ThreeGlobe } from "@/components/three-globe";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe, ShieldCheck, Flag } from "lucide-react";
import { useModal } from "../modal-provider";

export function HeroSection() {
  const { setOpen } = useModal();

  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center pt-24">
      <div className="absolute inset-0 z-0">
        <ThreeGlobe />
      </div>
      <div className="z-10 flex flex-col items-center gap-6 px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-foreground">
          The Global Industrial Renaissance of Intelligence.
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground">
          Empowering enterprises worldwide with 24/7 AI workforces. From our headquarters in Kolkata to the global stage, we engineer reliable infrastructure.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground mt-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            <span>Govt. Registered Entity</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Enterprise-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Deployable in 100+ Countries</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            size="lg" 
            className="font-bold tracking-wider text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
            onClick={() => setOpen(true)}
          >
            DEPLOY GLOBAL INTELLIGENCE
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold tracking-wider text-lg px-8 py-6 border-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary-foreground hover:border-primary">
            <a href="#experience-zone">
              Experience International Demo
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
