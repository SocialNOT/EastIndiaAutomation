import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const teamMembers = [
    {
        id: 1,
        name: "Rohan Chatterjee",
        title: "Founder & Lead Architect",
        imageUrl: "https://picsum.photos/seed/team1/400/400",
        imageHint: "male portrait",
    },
    {
        id: 2,
        name: "Priya Sharma",
        title: "Head of AI Integration",
        imageUrl: "https://picsum.photos/seed/team2/400/400",
        imageHint: "female portrait",
    },
    {
        id: 3,
        name: "Ankit Gupta",
        title: "Senior DevOps Engineer",
        imageUrl: "https://picsum.photos/seed/team3/400/400",
        imageHint: "male engineer",
    },
];

export function TeamSection() {
  return (
    <section id="team" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Our Leadership</h2>
          <p className="text-lg text-muted-foreground mt-2">
            The architects of your automated future.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
                <Card key={member.id} className="text-center bg-transparent border-none shadow-none">
                    <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden border-4 border-primary">
                        <Image src={member.imageUrl} alt={member.name} layout="fill" objectFit="cover" data-ai-hint={member.imageHint} />
                    </div>
                    <CardHeader className="p-4">
                        <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-primary text-lg">{member.title}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
