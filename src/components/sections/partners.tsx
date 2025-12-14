import { Globe, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

const partners = [
    { name: 'Google Gemini', icon: BrainCircuit },
    { name: 'Vapi AI', icon: Zap },
    { name: 'Global Vector Solutions', icon: Globe },
    { name: 'CyberSec Trust Corp', icon: ShieldCheck },
];

export function PartnersSection() {
  return (
    <section id="partners" className="w-full py-20 md:py-32 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Our Technology Partners</h2>
          <p className="text-lg text-muted-foreground mt-2">
            We build on the shoulders of giants to deliver robust and scalable solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {partners.map(partner => (
            <div key={partner.name} className="flex flex-col items-center gap-4">
              <partner.icon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold text-muted-foreground">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
