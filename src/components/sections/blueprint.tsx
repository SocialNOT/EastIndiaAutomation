import { FileText, Bot, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

function StepCard({ icon: Icon, title, description }: StepProps) {
    return (
        <div className="relative pl-16">
            <div className="absolute left-0 top-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-primary bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-headline text-2xl mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

export function BlueprintSection() {
    const steps: StepProps[] = [
        {
            icon: FileText,
            title: "Step 1: Data Handoff",
            description: "You provide the raw documents/FAQs. We secure it in our vector databases.",
        },
        {
            icon: Bot,
            title: "Step 2: The Build & Train",
            description: "Our engineers fine-tune the models and build the integration pipelines.",
        },
        {
            icon: Rocket,
            title: "Step 3: Go Live",
            description: "We deploy on your channels. You start capturing value immediately.",
        },
    ];

  return (
    <section id="blueprint" className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="font-headline text-4xl md:text-5xl">Deployment Protocol: 3 Steps.</h2>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="relative flex flex-col gap-16">
                    <div className="absolute left-[22px] top-0 h-full w-0.5 bg-border -z-10" />
                    {steps.map((step, index) => (
                        <StepCard key={index} {...step} />
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
