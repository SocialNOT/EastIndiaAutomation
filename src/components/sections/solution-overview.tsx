"use client";

import { BrainCircuit, Waves, Server, Cog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";

interface PillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillarsData: PillarProps[] = [
  {
    icon: BrainCircuit,
    title: "Worldwide Intelligent Chat Protocols",
    description: "Deploy multilingual agents (100+ languages) across web & WhatsApp to capture global leads 24/7.",
  },
  {
    icon: Waves,
    title: "International Human-Parity Voice AI",
    description: "Handle inbound calls from any country with ultra-low latency, accent-agnostic voice agents.",
  },
  {
    icon: Server,
    title: "Cross-Border Custom Enterprise LLMs",
    description: "Secure, private AI models trained on your multi-regional internal data, compliant with global data regulations.",
  },
  {
    icon: Cog,
    title: "Global End-to-End Business Automation",
    description: "Connect your disparate international systems (CRM, ERP, Logistics) into one seamless automated workflow.",
  }
];

function PillarCard({ icon: Icon, title, description }: PillarProps) {
  return (
    <div className="p-6 border border-primary/20 bg-card/30 transition-all duration-300 hover:border-primary/50 hover:bg-card/50 hover:shadow-[0_0_20px_hsl(var(--primary),0.2)] rounded-lg flex flex-col gap-4 text-left h-full">
        <Icon className="h-10 w-10 text-primary" />
        <h3 className="font-headline text-xl md:text-2xl !leading-tight">{title}</h3>
        <p className="text-muted-foreground flex-grow text-base">{description}</p>
    </div>
  );
}


export function SolutionOverviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { register } = useScrollAnimations(sectionRef, {stagger: 0.1});

    return (
      <section ref={sectionRef} id="solution" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 ref={register} className="font-headline text-3xl md:text-5xl mb-4 !leading-tight">Our Global AI Infrastructure.</h2>
              <p ref={register} className="text-lg md:text-xl text-muted-foreground">
                Built on a foundation of registered Indian engineering expertise and scalable cloud architecture.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {pillarsData.map((pillar) => (
                    <div key={pillar.title} ref={register} className="h-full">
                      <PillarCard {...pillar} />
                    </div>
                ))}
            </div>
        </div>
      </section>
    );
  }
  
