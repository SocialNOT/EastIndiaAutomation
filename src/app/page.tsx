
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero";
import { TrustTickerSection } from "@/components/sections/trust-ticker";
import { AgitationSection } from "@/components/sections/agitation";
import { SolutionOverviewSection } from "@/components/sections/solution-overview";
import { TextBotShowcase } from "@/components/sections/text-bot-showcase";
import { VoiceBotShowcase } from "@/components/sections/voice-bot-showcase";
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
      <TextBotShowcase />
      <VoiceBotShowcase />
      <BlueprintSection />
      <CaseStudiesSection />
      <LeadershipSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
