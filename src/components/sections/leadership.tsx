"use client";

import { Map, MapPin } from "lucide-react";

export function LeadershipSection() {
    return (
        <section id="leadership" className="w-full py-20 md:py-32 bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-4">
                    <h2 className="font-headline text-4xl md:text-5xl">Global Reach, Local Expertise.</h2>
                    <p className="text-lg text-secondary-foreground/80">Headquartered in Kolkata, West Bengal, with engineering leadership serving clients across 4 continents.</p>
                    
                    <div className="mt-8 p-6 border-2 border-primary rounded-lg bg-background/20 text-left">
                        <h3 className="font-headline text-xl text-primary mb-2">OFFICIALLY REGISTERED ENTERPRISE</h3>
                        <p className="font-code text-sm">East India Automation is a registered MSME with the Government of India.</p>
                        <p className="font-code text-sm mt-2"><strong>Registration No:</strong> UDYAM-WB-18-0168489</p>
                        <p className="font-code text-sm"><strong>Date of Registration:</strong> 15/12/2025</p>
                    </div>
                </div>
                <div className="relative h-64 md:h-96">
                    {/* Basic map representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Map className="w-full h-full text-primary/10" />
                    </div>
                    <MapPin className="absolute h-8 w-8 text-primary" style={{ left: '68%', top: '45%' }} />
                    <span className="absolute font-code text-xs" style={{ left: 'calc(68% + 2rem)', top: '45%' }}>Kolkata</span>

                    <MapPin className="absolute h-8 w-8 text-primary" style={{ left: '55%', top: '40%' }} />
                    <span className="absolute font-code text-xs" style={{ left: 'calc(55% + 2rem)', top: '40%' }}>Dubai</span>

                    <MapPin className="absolute h-8 w-8 text-primary" style={{ left: '48%', top: '25%' }} />
                     <span className="absolute font-code text-xs" style={{ left: 'calc(48% + 2rem)', top: '25%' }}>London</span>
                    
                    <MapPin className="absolute h-8 w-8 text-primary" style={{ left: '20%', top: '35%' }} />
                     <span className="absolute font-code text-xs" style={{ left: 'calc(20% + 2rem)', top: '35%' }}>New York</span>
                </div>
            </div>
        </section>
    );
}
