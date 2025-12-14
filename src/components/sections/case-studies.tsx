import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const studies = [
    {
        id: 1,
        title: "Educational Institution Lead Capture",
        description: "Automated 85% of admission inquiries via a multilingual chatbot, resulting in a 40% increase in qualified leads.",
        imageUrl: "https://picsum.photos/seed/cs1/600/400",
        imageHint: "university students",
    },
    {
        id: 2,
        title: "Manufacturing Plant Workflow Automation",
        description: "Connected inventory and sales systems, reducing manual data entry by 200 hours per month and cutting order processing time by half.",
        imageUrl: "https://picsum.photos/seed/cs2/600/400",
        imageHint: "factory interior",
    },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Proven Implementations</h2>
          <p className="text-lg text-muted-foreground mt-2">
            See how we've transformed operations for institutions like yours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map(study => (
                <Card key={study.id} className="overflow-hidden bg-card/50">
                    <Image src={study.imageUrl} alt={study.title} width={600} height={400} className="w-full h-64 object-cover" data-ai-hint={study.imageHint} />
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{study.description}</p>
                        <Button variant="link" className="text-primary p-0">Read Full Study</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
