"use client";

import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero";
import { TrustTickerSection } from "@/components/sections/trust-ticker";
import { AgitationSection } from "@/components/sections/agitation";
import { SolutionOverviewSection } from "@/components/sections/solution-overview";
import { PillarsSection } from "@/components/sections/pillars";
import { ExperienceZoneSection } from "@/components/sections/experience-zone";
import { BlueprintSection } from "@/components/sections/blueprint";
import { WhyUsSection } from "@/components/sections/why-us";
import { CtaSection } from "@/components/sections/cta";
import { PartnersSection } from "@/components/sections/partners";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { TeamSection } from "@/components/sections/team";
import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { useModal } from "@/components/modal-provider";

export default function Home() {
  const { setOpen } = useModal();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <HeroSection />
      <TrustTickerSection />
      <AgitationSection />
      <SolutionOverviewSection />
      <PillarsSection />
      <ExperienceZoneSection />
      <BlueprintSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <TeamSection />
      <PartnersSection />
      <CtaSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
