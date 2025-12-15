"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextDemo } from "@/components/text-demo";
import { VoiceDemo } from "@/components/voice-demo";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function ExperienceZoneSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="experience-zone" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary tracking-wider">
            ACCESS THE MAINFRAME
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-2">
            Test our prototype agents' multi-language capabilities in real-time.
          </p>
        </div>

        <Tabs defaultValue="text" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-14 p-2 bg-background/80 border border-primary/20">
            <TabsTrigger value="text" className="text-lg h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-code">
              GLOBAL TEXT TERMINAL
            </TabsTrigger>
            <TabsTrigger value="voice" className="text-lg h-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground font-code">
              INTERNATIONAL VOICE CHANNEL
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-6">
            <TextDemo />
          </TabsContent>
          <TabsContent value="voice" className="mt-6">
            {isClient ? (
              <VoiceDemo />
            ) : (
              <div className="flex flex-col h-[60vh] items-center justify-center bg-black/5 border dark:bg-black/50 border-accent/20 rounded-lg p-4 gap-8">
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-64 h-64 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
