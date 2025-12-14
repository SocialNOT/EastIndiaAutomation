import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorClosed, Repeat1, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AgitationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function AgitationCard({ icon: Icon, title, description }: AgitationCardProps) {
  return (
    <Card className="bg-card/50 border-2 border-transparent transition-all duration-300 hover:border-destructive/50 hover:shadow-[0_0_15px_hsl(var(--destructive),0.5)]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="h-10 w-10 text-primary" />
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function AgitationSection() {
  const cards: AgitationCardProps[] = [
    {
      icon: DoorClosed,
      title: "The 6 PM Shutdown",
      description: "Your customers are awake at 10 PM. Your staff is not. You are losing leads daily.",
    },
    {
      icon: Repeat1,
      title: "The Support Loop",
      description: "Your best employees waste hours answering the same 5 questions instead of doing high-value work.",
    },
    {
      icon: MessagesSquare,
      title: "The Language Barrier",
      description: "In a multilingual region, English-only support is a business failure.",
    },
  ];

  return (
    <section id="agitation" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Your Operations Are Bleeding Efficiency.</h2>
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
