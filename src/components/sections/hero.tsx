import { ThreeGlobe } from "@/components/three-globe";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MoveDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <ThreeGlobe />
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <div className="z-10 flex flex-col items-center gap-6 px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-foreground animate-fade-in-down">
          The Industrial Revolution of Intelligence.
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground animate-fade-in-up">
          We engineer 24/7 AI workforces for Kolkata’s premier institutions. Stop relying on manual labor for digital problems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button size="lg" className="font-bold tracking-wider text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]">
            DEPLOY INTELLIGENCE
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold tracking-wider text-lg px-8 py-6 border-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary">
            <a href="#experience-zone">
              Experience Live Demo
              <MoveDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
