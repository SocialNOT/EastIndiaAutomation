"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Globe, Server, Code } from 'lucide-react';

const tickerItems = [
    { type: 'text', content: 'POWERED BY INDUSTRY STANDARD INFRASTRUCTURE' },
    { type: 'icon', Icon: Globe },
    { type: 'text', content: '99.9% UPTIME PROTOCOL' },
    { type: 'icon', Icon: Server },
    { type: 'text', content: 'MADE FOR BENGAL' },
    { type: 'icon', Icon: Code },
];

export function ReliabilityTicker() {
    const tickerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ticker = tickerRef.current;
        if (!ticker) return;

        const items = ticker.children;
        const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0);
        
        gsap.set(ticker, { width: totalWidth });

        const tl = gsap.timeline({ repeat: -1, ease: "none" });
        tl.to(ticker, {
            x: `-=${totalWidth / 2}`,
            duration: 30,
        });

    }, []);

    const duplicatedItems = [...tickerItems, ...tickerItems];

    return (
        <section className="w-full bg-card/30 border-y-2 border-border overflow-hidden">
            <div className="py-4 flex">
                <div ref={tickerRef} className="flex items-center gap-8">
                    {duplicatedItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 flex-shrink-0">
                            {item.type === 'text' ? (
                                <span className="font-code text-sm tracking-widest text-muted-foreground uppercase whitespace-nowrap">
                                    {item.content}
                                </span>
                            ) : (
                                <item.Icon className="h-5 w-5 text-primary" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
