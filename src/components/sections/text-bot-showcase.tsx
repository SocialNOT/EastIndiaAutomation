
"use client";

import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, Zap, Clock, MessageSquare, Briefcase } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export function TextBotShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register } = useScrollAnimations(sectionRef);

  const features: FeatureCardProps[] = [
    {
      icon: Languages,
      title: "Speak Every Customer's Language",
      description: "Engage clients in over 100 languages, instantly breaking down communication barriers and building trust.",
    },
    {
      icon: Clock,
      title: "Capture Leads 24/7/365",
      description: "Your AI agent never sleeps. Capture inquiries from any time zone, ensuring no opportunity is ever missed.",
    },
    {
        icon: Briefcase,
        title: "Qualify Prospects Automatically",
        description: "The AI qualifies leads based on your criteria, freeing up your human team to focus only on high-value conversations.",
    },
  ];

  return (
    <section ref={sectionRef} id="text-showcase" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <p ref={register} className="font-code text-sm tracking-widest text-primary uppercase">Feature Showcase: Text Intelligence</p>
            <h2 ref={register} className="font-headline text-4xl md:text-5xl !leading-tight text-foreground">
              The 24/7 Global Deal Room.
            </h2>
            <p ref={register} className="text-lg md:text-xl text-muted-foreground">
              Stop letting time zones and language barriers kill your international leads. Our AI-powered text intelligence transforms your website into a perpetual, multilingual sales engine that qualifies and captures opportunities while you sleep.
            </p>
          </div>
          
          <div ref={register}>
            <Card className="bg-black/20 border-primary/20 backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <h3 className="font-headline text-2xl text-foreground">Key Capabilities</h3>
                </div>
                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
