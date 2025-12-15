"use client";

import { Map, MapPin } from "lucide-react";

export function LeadershipSection() {
    return (
        <section id="leadership" className="w-full py-16 md:py-24 bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="font-headline text-4xl md:text-5xl !leading-tight">Global Reach, Local Expertise.</h2>
                    <p className="text-lg text-secondary-foreground/80">Headquartered in Kolkata, West Bengal, with engineering leadership serving clients across 4 continents.</p>
                    
                    <div className="mt-4 p-6 border-2 border-primary/50 rounded-lg bg-background/20 text-left">
                        <h3 className="font-headline text-xl text-primary mb-3">OFFICIALLY REGISTERED ENTERPRISE</h3>
                        <div className="space-y-1 font-code text-sm">
                            <p><strong className="text-secondary-foreground/80">Govt. of India (MSME)</strong></p>
                            <p><strong>Registration No:</strong> UDYAM-WB-18-0168489</p>
                            <p><strong>Date of Registration:</strong> 15/12/2025</p>
                        </div>
                    </div>
                </div>
                <div className="relative h-64 md:h-96 -mx-4 md:mx-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Map className="w-full h-full text-primary/10" />
                    </div>
                    <div className="absolute h-4 w-4 flex items-center" style={{ left: '68%', top: '45%' }}>
                        <MapPin className="h-8 w-8 text-primary" />
                        <span className="absolute font-code text-xs whitespace-nowrap -right-2 top-full -translate-x-1/2 mt-1 bg-background/50 px-1 rounded">Kolkata</span>
                    </div>
                     <div className="absolute h-4 w-4 flex items-center" style={{ left: '55%', top: '40%' }}>
                        <MapPin className="h-6 w-6 text-primary/70" />
                         <span className="absolute font-code text-xs whitespace-nowrap -right-2 top-full -translate-x-1/2 mt-1 bg-background/50 px-1 rounded">Dubai</span>
                    </div>
                    <div className="absolute h-4 w-4 flex items-center" style={{ left: '48%', top: '25%' }}>
                        <MapPin className="h-6 w-6 text-primary/70" />
                         <span className="absolute font-code text-xs whitespace-nowrap -right-2 top-full -translate-x-1/2 mt-1 bg-background/50 px-1 rounded">London</span>
                    </div>
                    <div className="absolute h-4 w-4 flex items-center" style={{ left: '20%', top: '35%' }}>
                        <MapPin className="h-6 w-6 text-primary/70" />
                         <span className="absolute font-code text-xs whitespace-nowrap -right-2 top-full -translate-x-1/2 mt-1 bg-background/50 px-1 rounded">New York</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
