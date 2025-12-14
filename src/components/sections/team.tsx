"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const teamMembers = [
    {
        id: 1,
        name: "Rohan Chatterjee",
        title: "Founder & Lead Architect",
    },
    {
        id: 2,
        name: "Priya Sharma",
        title: "Head of AI Integration",
    },
    {
        id: 3,
        name: "Ankit Gupta",
        title: "Senior DevOps Engineer",
    },
];

function TeamMemberCard({ name, title }: { name: string, title: string }) {
    const nameRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = nameRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                gsap.from(el.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power3.out",
                });
                observer.unobserve(el);
            }
        }, { threshold: 0.5 });
        
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Card className="text-center bg-transparent border-none shadow-none">
            <div className="relative h-64 w-64 mx-auto rounded-full border-4 border-primary bg-background flex items-center justify-center">
                 <div ref={nameRef} className="font-headline text-3xl text-primary text-center p-4">
                    {name.split("").map((char, index) => (
                        <span key={index} className="inline-block opacity-0">{char === ' ' ? '\u00A0' : char}</span>
                    ))}
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
