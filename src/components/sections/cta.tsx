import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl md:text-5xl">
          Ready to Automate Your Enterprise?
        </h2>
        <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Take the first step towards operational excellence. Our team is ready to design a bespoke AI solution that fits your unique challenges.
        </p>
        <Button size="lg" className="font-bold tracking-wider text-xl px-8 py-8 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]">
          Request a Consultation
        </Button>
      </div>
    </section>
  );
}
