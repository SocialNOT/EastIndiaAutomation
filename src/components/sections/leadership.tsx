"use client";

import { Map, MapPin } from "lucide-react";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useRef } from "react";

export function LeadershipSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { register } = useScrollAnimations(sectionRef, { stagger: 0.2 });

    const locations = [
        { name: "Kolkata", left: '68%', top: '45%', size: 'h-8 w-8' },
        { name: "Dubai", left: '55%', top: '40%', size: 'h-6 w-6' },
        { name: "London", left: '48%', top: '25%', size: 'h-6 w-6' },
        { name: "New York", left: '20%', top: '35%', size: 'h-6 w-6' },
        { name: "Singapore", left: '80%', top: '55%', size: 'h-6 w-6' },
    ];

    return (
        <section ref={sectionRef} id="leadership" className="w-full py-16 md:py-24 bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="space-y-6">
                    <h2 ref={register} className="font-headline text-3xl md:text-5xl !leading-tight">Global Reach, Local Expertise.</h2>
                    <p ref={register} className="text-lg text-secondary-foreground/80">Headquartered in Kolkata, West Bengal, with engineering leadership serving clients across 4 continents.</p>
                    
                    <div ref={register} className="mt-4 p-6 border-2 border-primary/50 rounded-lg bg-background/20 text-left">
                        <h3 className="font-headline text-lg text-primary mb-3">OFFICIALLY REGISTERED ENTERPRISE</h3>
                        <div className="space-y-1 font-code text-sm">
                            <p className="text-secondary-foreground/80"><strong>Govt. of India (MSME)</strong></p>
                            <p><strong>Registration No:</strong> UDYAM-WB-18-0168489</p>
                            <p><strong>Date of Registration:</strong> 15/12/2025</p>
                        </div>
                    </div>
                </div>
                <div ref={register} className="relative h-64 md:h-96 -mx-4 md:mx-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Map className="w-full h-full text-primary/10" />
                    </div>
                    {locations.map((loc, index) => (
                        <div key={index} className="absolute flex items-center" style={{ left: loc.left, top: loc.top }}>
                            <MapPin className={`${loc.size} ${loc.name === 'Kolkata' ? 'text-primary' : 'text-primary/70'}`} />
                            <span className="absolute font-code text-xs whitespace-nowrap left-1/2 -translate-x-1/2 top-full mt-1 bg-background/50 text-secondary-foreground px-1.5 py-0.5 rounded">{loc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
