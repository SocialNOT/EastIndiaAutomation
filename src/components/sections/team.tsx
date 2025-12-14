"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const teamMembers = [
    {
        id: 1,
        name: "Rajib Singh",
        title: "Founder and AI Engineer",
    },
    {
        id: 2,
        name: "Sharmistha Routh",
        title: "Director",
    },
    {
        id: 3,
        name: "Dr Tilak Chatterjee",
        title: "Investor and Mentor",
    },
];

function TeamMemberCard({ name, title }: { name: string, title: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const firstLetter = name.charAt(0);

    useLayoutEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        
        gsap.set(el, { opacity: 0, y: 50 });

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                gsap.to(el, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power3.out" 
                });
                observer.unobserve(el);
            }
        }, { threshold: 0.2 });
        
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Card ref={cardRef} className="text-center bg-transparent border-none shadow-none">
            <div className="relative h-64 w-64 mx-auto rounded-full border-4 border-primary bg-background flex items-center justify-center">
                 <div className="font-headline text-9xl text-primary">
                    {firstLetter}
                </div>
            </div>
            <CardHeader className="p-4">
                <CardTitle className="font-headline text-2xl">{name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-primary text-lg">{title}</p>
            </CardContent>
        </Card>
    );
}

export function TeamSection() {
  return (
    <section id="team" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl">Our Leadership</h2>
          <p className="text-lg text-muted-foreground mt-2">
            The architects of your automated future.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
                <TeamMemberCard key={member.id} {...member} />
            ))}
        </div>
      </div>
    </section>
  );
}
