"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Lock, Cpu, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        icon: Lock,
        title: "Data Handoff",
        description: "Secure analysis of your existing communication patterns and knowledge base."
    },
    {
        icon: Cpu,
        title: "The Build",
        description: "Engineering your custom AI assistant on industry-standard, secure infrastructure."
    },
    {
        icon: Radio,
        title: "Go Live",
        description: "Deployment and integration with your existing channels, with 24/7 monitoring."
    }
];

export function AssemblyLineSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const path = svgRef.current?.querySelector(".draw-path");
            if (!path) return;
            
            const pathLength = (path as SVGPathElement).getTotalLength();
            gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            });

            tl.to(path, {
                strokeDashoffset: 0,
                ease: "none"
            });

            gsap.utils.toArray<HTMLElement>(".step-item").forEach((step, i) => {
                 tl.from(step, {
                    opacity: 0,
                    y: 30,
                 }, i * 0.5); // Stagger the appearance of each step
            });


        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="process" className="w-full py-20 md:py-32 bg-card/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-5xl text-foreground !leading-tight">
                        Deployment in 3 Simple Steps
                    </h2>
                </div>
                <div className="relative max-w-lg mx-auto">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full">
                        <svg ref={svgRef} width="4" height="100%" viewBox="0 0 4 600" preserveAspectRatio="none">
                            <path className="draw-path" d="M 2 0 V 600" stroke="hsl(var(--primary))" strokeWidth="4" fill="none"/>
                        </svg>
                    </div>
                    <div className="relative flex flex-col gap-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="step-item flex items-start gap-6">
                                    <div className="flex-shrink-0 bg-background border-2 border-primary rounded-full p-3 mt-1">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-headline text-2xl mb-2 text-foreground">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
