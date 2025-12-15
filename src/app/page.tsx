
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero";
import { TrustTickerSection } from "@/components/sections/trust-ticker";
import { AgitationSection } from "@/components/sections/agitation";
import { SolutionOverviewSection } from "@/components/sections/solution-overview";
import { ExperienceZoneSection } from "@/components/sections/experience-zone";
import { BlueprintSection } from "@/components/sections/blueprint";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { CtaSection } from "@/components/sections/cta";
import { LeadershipSection } from "@/components/sections/leadership";
import { Footer } from "@/components/sections/footer";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <HeroSection />
      <TrustTickerSection />
      <AgitationSection />
      <SolutionOverviewSection />
      <ExperienceZoneSection />
      <BlueprintSection />
      <CaseStudiesSection />
      <LeadershipSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
