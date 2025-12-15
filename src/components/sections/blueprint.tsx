import { Database, BrainCircuit, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepProps {
    icon: LucideIcon;
    title: string;
    description: string;
    stepNumber: number;
}

function StepCard({ icon: Icon, title, description, stepNumber }: StepProps) {
    return (
        <div className="relative pl-16">
            <div className="absolute left-0 top-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-primary bg-primary/10">
                <span className="font-headline text-xl text-primary">{stepNumber}</span>
            </div>
            <h3 className="font-headline text-xl md:text-2xl mb-2 text-secondary-foreground !leading-tight">{title}</h3>
            <p className="text-secondary-foreground/80">{description}</p>
        </div>
    );
}

export function BlueprintSection() {
    const steps: Omit<StepProps, 'stepNumber'>[] = [
        {
            icon: Database,
            title: "Global Data Ingestion & Compliance",
            description: "We securely ingest your multi-regional data, ensuring adherence to GDPR, CCPA, and local regulations.",
        },
        {
            icon: BrainCircuit,
            title: "International Model Training",
            description: "Our engineers fine-tune models for cultural nuances, specific languages, and regional business logic.",
        },
        {
            icon: Rocket,
            title: "Ubiquitous Integration & Go-Live",
            description: "We deploy across your global channels with 24/7 monitoring and redundant fail-safes.",
        },
    ];

  return (
    <section id="blueprint" className="w-full py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl !leading-tight">Global Deployment Protocol: 3 Steps.</h2>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="relative flex flex-col gap-12 md:gap-16">
                    <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-primary/30" />
                    {steps.map((step, index) => (
                        <StepCard key={index} {...step} stepNumber={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
