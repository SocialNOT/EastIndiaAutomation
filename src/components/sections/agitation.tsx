"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Languages, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";

interface AgitationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function AgitationCard({ icon: Icon, title, description }: AgitationCardProps) {
  return (
    <Card className="bg-transparent border-none shadow-none text-secondary-foreground text-left md:text-center">
      <CardHeader className="flex flex-col items-start md:items-center gap-4 p-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-secondary-foreground/80 text-base">{description}</p>
      </CardContent>
    </Card>
  );
}

export function AgitationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register } = useScrollAnimations(sectionRef, {
    stagger: 0.15,
  });

  const cards: AgitationCardProps[] = [
    {
      icon: Globe,
      title: "The Time Zone Trap",
      description: "Losing international leads because your support team is offline during their business hours.",
    },
    {
      icon: Languages,
      title: "The Language Barrier",
      description: "Failing to capture global market share due to a lack of native-level multilingual support.",
    },
    {
      icon: Users,
      title: "The Scale Bottleneck",
      description: "Human teams cannot scale instantly to meet seasonal global demand without massive overhead.",
    },
  ];

  return (
    <section ref={sectionRef} id="agitation" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 ref={register} className="font-headline text-3xl md:text-5xl text-secondary-foreground !leading-tight">Your Operations Are Bleeding Efficiency.</h2>
          <p ref={register} className="text-lg md:text-xl text-secondary-foreground/80 mt-4">The 24/7 Global Market Never Sleeps. Your Operations Shouldn't Either.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} ref={register}>
              <AgitationCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
