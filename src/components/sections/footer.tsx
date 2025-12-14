"use client";

import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "../logo";
import { useModal } from "../modal-provider";

export function Footer() {
  const { setOpen } = useModal();
  return (
    <footer id="contact" className="w-full bg-background border-t-2 border-primary/20 py-20">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-8">
        <Logo className="w-32" />
        <div className="max-w-2xl">
            <h2 className="font-headline text-4xl md:text-5xl mb-4">
            Ready to modernize your operations?
            </h2>
            <p className="text-lg text-muted-foreground">
            We onboard only 3 institutions per month to ensure quality protocols.
            </p>
        </div>
        <Button 
          size="lg" 
          className="w-full max-w-md font-bold tracking-wider text-xl px-8 py-8 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]"
          onClick={() => setOpen(true)}
        >
          INITIATE CONSULTATION PROTOCOL
        </Button>
        <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex gap-6">
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
                <a href="#" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors"><Mail /></a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
            East India Automation HQ - Kolkata, WB. | est. 2025
            </p>
        </div>
      </div>
    </footer>
  );
}
