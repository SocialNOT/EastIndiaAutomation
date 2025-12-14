"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrainCircuit, Waveform, Server, Cog, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillarsData: PillarProps[] = [
  {
    icon: BrainCircuit,
    title: "24/7 Frontline Chat Agents",
    description: "Forget dumb menu bots. We deploy multilingual agents (Bengali/Hindi/English) trained on your data that capture qualified leads and inject them directly into your CRM while you sleep.",
  },
  {
    icon: Waveform,
    title: "Human-Parity Voice AI",
    description: "Eliminate hold times. Our ultra-low latency voice agents handle inbound calls, schedule appointments, and answer queries over the phone with startling realism.",
  },
  {
    icon: Server,
    title: "Your Institutional Brain, Digitized",
    description: "Secure, private Large Language Models trained exclusively on your decades of messy internal documents, PDFs, and policies for instant staff querying.",
  },
  {
    icon: Cog,
    title: "The Invisible Glue",
    description: "We connect your disconnected apps. When 'A' happens in your CRM, we automatically trigger 'B' in your accounts software, without human intervention.",
  }
];

function PillarCard({ icon: Icon, title, description, isVisible }: PillarProps & { isVisible: boolean }) {
  return (
    <div className={cn(
      "p-8 border-l-4 border-primary bg-card/30 transition-all duration-700 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className="h-10 w-10 text-primary" />
        <h3 className="font-headline text-3xl">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
        Explore Protocols <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

export function PillarsSection() {
  const [visiblePillars, setVisiblePillars] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pillarIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setTimeout(() => {
              setVisiblePillars((prev) => [...prev, pillarIndex]);
            }, pillarIndex * 200); // Staggered delay
          }
        });
      },
      { threshold: 0.2 }
    );

    const pillars = sectionRef.current?.querySelectorAll('.pillar-item');
    if (pillars) {
      pillars.forEach((pillar) => observer.observe(pillar));
    }

    return () => {
      if (pillars) {
        pillars.forEach((pillar) => observer.unobserve(pillar));
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="pillars" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {pillarsData.map((pillar, index) => (
            <div key={index} className="pillar-item" data-index={index}>
              <PillarCard {...pillar} isVisible={visiblePillars.includes(index)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
