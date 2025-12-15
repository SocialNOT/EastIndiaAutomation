"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  return (
    <section id="case-studies" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Proven International Implementations</h2>
          <p className="text-lg text-muted-foreground mt-4 tracking-widest font-code">TRUSTED BY ENTERPRISES IN: USA | UAE | UK | SINGAPORE | INDIA</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map(study => (
                <Card key={study.id} className="overflow-hidden bg-card/50 group border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                    <div className="relative h-64 w-full">
                         <Image 
                            src={study.image.url}
                            alt={study.title}
                            fill
                            className="object-cover"
                            data-ai-hint={study.image.hint}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{study.title}</CardTitle>
                        <CardDescription>{study.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="link" className="text-primary p-0 group-hover:underline">Read Case Study</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
