
"use client";

import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, UserCheck, Server, Globe, Bot } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <Icon className="h-6 w-6 text-accent" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-secondary-foreground">{title}</h3>
      <p className="text-secondary-foreground/80">{description}</p>
    </div>
  </div>
);

export function VoiceBotShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register } = useScrollAnimations(sectionRef);

  const features: FeatureCardProps[] = [
    {
      icon: UserCheck,
      title: "Human-Parity Conversations",
      description: "Our AI understands accents and nuances, providing a natural, professional experience for every caller.",
    },
    {
      icon: Server,
      title: "Zero Wait Time, Infinite Scale",
      description: "Handle thousands of simultaneous international calls without a single dropped connection or busy signal.",
    },
    {
      icon: Globe,
      title: "Global Reach, Local Presence",
      description: "Provide instant, expert-level support to high-value clients anywhere in the world, at any time.",
    },
  ];

  return (
    <section ref={sectionRef} id="voice-showcase" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div ref={register} className="order-2 md:order-1">
            <Card className="bg-background/40 border-accent/20 backdrop-blur-sm shadow-[0_0_30px_hsl(var(--accent)/0.2)]">
               <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <Bot className="h-8 w-8 text-accent" />
                    <h3 className="font-headline text-2xl text-secondary-foreground">Core Competencies</h3>
                </div>
                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 text-secondary-foreground order-1 md:order-2">
            <p ref={register} className="font-code text-sm tracking-widest text-accent uppercase">Feature Showcase: Voice Intelligence</p>
            <h2 ref={register} className="font-headline text-4xl md:text-5xl !leading-tight">
              The Instant International Hotline.
            </h2>
            <p ref={register} className="text-lg md:text-xl text-secondary-foreground/80">
              What is the cost of a missed call from a multi-million dollar client in another hemisphere? With our Voice AI, you'll never have to find out. Provide elite, instantaneous service and secure high-value deals the moment they call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
