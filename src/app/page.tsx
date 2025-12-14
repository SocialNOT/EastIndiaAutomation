import { HeroSection } from "@/components/sections/hero";
import { TrustTickerSection } from "@/components/sections/trust-ticker";
import { AgitationSection } from "@/components/sections/agitation";
import { SolutionOverviewSection } from "@/components/sections/solution-overview";
import { PillarsSection } from "@/components/sections/pillars";
import { ExperienceZoneSection } from "@/components/sections/experience-zone";
import { BlueprintSection } from "@/components/sections/blueprint";
import { WhyUsSection } from "@/components/sections/why-us";
import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <TrustTickerSection />
      <AgitationSection />
      <SolutionOverviewSection />
      <PillarsSection />
      <ExperienceZoneSection />
      <BlueprintSection />
      <WhyUsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
