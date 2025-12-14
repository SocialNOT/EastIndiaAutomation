"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const studies = [
    {
        id: 1,
        title: "Educational Institution Lead Capture",
        description: "Automated 85% of admission inquiries via a multilingual chatbot, resulting in a 40% increase in qualified leads.",
        stats: [
            { value: "85%", label: "Inquiries Automated" },
            { value: "40%", label: "Lead Increase" }
        ]
    },
    {
        id: 2,
        title: "Manufacturing Plant Workflow Automation",
        description: "Connected inventory and sales systems, reducing manual data entry by 200 hours per month and cutting order processing time by half.",
        stats: [
            { value: "200h", label: "Hours Saved Monthly" },
            { value: "50%", label: "Processing Time Cut" }
        ]
    },
];

function AnimatedStat({ value, label }: { value: string, label: string }) {
    const statRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = statRef.current;
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 20 });

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                gsap.to(el, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power3.out", 
                    delay: 0.2 
                });
                observer.unobserve(el);
            }
        }, { threshold: 0.5 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);


    return (
        <div ref={statRef} className="text-center">
            <p className="font-headline text-5xl text-primary">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}


export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Proven Implementations</h2>
          <p className="text-lg text-muted-foreground mt-2">
            See how we've transformed operations for institutions like yours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map(study => (
                <Card key={study.id} className="overflow-hidden bg-card/50 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-8">{study.description}</p>
                        <div className="flex justify-around items-center h-24 bg-card/50 rounded-lg p-4">
                            {study.stats.map(stat => (
                                <AnimatedStat key={stat.label} {...stat} />
                            ))}
                        </div>
                    </CardContent>
                    <CardContent>
                         <Button variant="link" className="text-primary p-0">Read Full Study</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
