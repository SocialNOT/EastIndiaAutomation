"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    "24/7 Availability",
    "Instant Responses",
    "Multilingual Support (Bengali & English)",
];

export function TrojanHorseSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const chatTimeline = useRef<gsap.core.Timeline | null>(null);
    const [litBenefit, setLitBenefit] = useState(-1);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            chatTimeline.current = gsap.timeline({
                scrollTrigger: {
                    trigger: ".phone-screen",
                    start: "center center",
                    toggleActions: "play none none reverse"
                },
                paused: true
            });

            chatTimeline.current
                .fromTo(".customer-bubble", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, onStart: () => setLitBenefit(0) })
                .fromTo(".typing-dots", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, onStart: () => setLitBenefit(1) })
                .to(".typing-dots", { opacity: 0, duration: 0.3 }, "+=1")
                .fromTo(".ai-bubble", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, onStart: () => setLitBenefit(2) });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="trojan-horse" className="w-full py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-5xl text-foreground !leading-tight">
                        Introducing Your New AI Front Office
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left Side: Benefits */}
                    <div className="flex flex-col gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-4"
                                animate={{
                                    color: litBenefit === index ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                                    scale: litBenefit === index ? 1.05 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                <span className="text-lg font-medium">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side: Phone Mockup */}
                    <div className="flex justify-center">
                        <div className="w-80 h-[600px] bg-card rounded-[40px] border-4 border-border p-4">
                            <div className="phone-screen w-full h-full bg-background rounded-[24px] flex flex-col p-4">
                                <div className="flex-grow flex flex-col justify-end gap-3">
                                    {/* Customer Bubble */}
                                    <div className="customer-bubble opacity-0 w-3/4 bg-blue-600/70 rounded-xl p-3 self-start">
                                        <p className="text-sm text-white">অ্যাডমিশন ফিস কত?</p>
                                    </div>

                                    {/* Typing Dots */}
                                    <div className="typing-dots opacity-0 flex gap-1 items-center self-end">
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                                    </div>
                                    
                                    {/* AI Bubble */}
                                    <div className="ai-bubble opacity-0 w-5/6 bg-secondary rounded-xl p-3 self-end">
                                        <p className="text-sm text-foreground">Admission fee is ₹25,000. Would you like to know about payment deadlines?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
