import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Languages, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AgitationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function AgitationCard({ icon: Icon, title, description }: AgitationCardProps) {
  return (
    <Card className="bg-transparent border-none shadow-none text-secondary-foreground">
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="h-10 w-10 text-primary" />
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-secondary-foreground/80">{description}</p>
      </CardContent>
    </Card>
  );
}

export function AgitationSection() {
  const cards: AgitationCardProps[] = [
    {
      icon: Globe,
      title: "The Time Zone Trap",
      description: "Losing international leads because your support team is offline during their business hours.",
    },
    {
      icon: Languages,
      title: "The Language Barrier",
      description: "Failing to capture global market share due to a lack of native-level multilingual support.",
    },
    {
      icon: Users,
      title: "The Scale Bottleneck",
      description: "Human teams cannot scale instantly to meet seasonal global demand without massive overhead.",
    },
  ];

  return (
    <section id="agitation" className="w-full py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-secondary-foreground">Your Operations Are Bleeding Efficiency.</h2>
          <p className="text-lg md:text-xl text-secondary-foreground/80 mt-4">The 24/7 Global Market Never Sleeps. Your Operations Shouldn't Either.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <AgitationCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
