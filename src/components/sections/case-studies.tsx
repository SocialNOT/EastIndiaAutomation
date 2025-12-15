"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";

const studies = [
    {
        id: 1,
        title: "Automating a Fortune 500 Logistics Hub in Dubai",
        description: "Reduced track-and-trace queries by 85% using a trilingual voice and chat bot.",
        image: {
          url: "https://picsum.photos/seed/dubaihub/800/600",
          hint: "logistics hub"
        }
    },
    {
        id: 2,
        title: "Scaling Support for a European E-commerce Giant",
        description: "Handled 50,000+ Black Friday queries across 5 languages with zero downtime.",
        image: {
          url: "https://picsum.photos/seed/euroffice/800/600",
          hint: "diverse office"
        }
    },
];

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register } = useScrollAnimations(sectionRef, { stagger: 0.2 });

  return (
    <section ref={sectionRef} id="case-studies" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 ref={register} className="font-headline text-3xl md:text-5xl !leading-tight">Proven International Implementations</h2>
          <p ref={register} className="text-sm text-muted-foreground mt-4 tracking-widest font-code">TRUSTED BY ENTERPRISES IN: USA | UAE | UK | SINGAPORE | INDIA</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {studies.map(study => (
                <div key={study.id} ref={register}>
                    <Card className="overflow-hidden bg-card/30 group border border-transparent hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                        <div className="relative h-56 w-full">
                            <Image 
                                src={study.image.url}
                                alt={study.title}
                                fill
                                className="object-cover"
                                data-ai-hint={study.image.hint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="font-headline text-2xl !leading-tight mb-2">{study.title}</h3>
                            <p className="text-muted-foreground mb-4 flex-grow text-base">{study.description}</p>
                            <Button variant="link" className="text-primary p-0 group-hover:underline self-start font-bold">
                                Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
