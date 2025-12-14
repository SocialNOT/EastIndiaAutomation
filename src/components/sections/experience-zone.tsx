import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextDemo } from "@/components/text-demo";
import { VoiceDemo } from "@/components/voice-demo";

export function ExperienceZoneSection() {
  return (
    <section id="experience-zone" className="w-full py-20 md:py-32 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary tracking-wider">
            ACCESS THE MAINFRAME
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-2">
            Interact with our prototype agents powered by Gemini and Vapi.
          </p>
        </div>

        <Tabs defaultValue="voice" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-14 p-2 bg-background/80 border border-primary/20">
            <TabsTrigger value="text" className="text-lg h-full data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground" disabled>
              TEXT TERMINAL (Gemini)
            </TabsTrigger>
            <TabsTrigger value="voice" className="text-lg h-full data-[state=active]:bg-cyan-600/80 data-[state=active]:text-white">
              VOICE CHANNEL (Vapi)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-6">
            <TextDemo />
          </TabsContent>
          <TabsContent value="voice" className="mt-6">
            <VoiceDemo />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
