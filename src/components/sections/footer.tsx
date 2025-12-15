"use client";

import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "../logo";

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-background border-t-2 border-primary/10 py-12 md:py-16">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
        <Logo className="w-32" />
        
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
                <a href="mailto:eastindiaautomationai@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors"><Mail /></a>
            </div>
            <p className="text-sm text-muted-foreground mt-4 max-w-md">
                Registered Office: Matri Bhaban, Chatrakhali, Basanti, South 24 Parganas, West Bengal, India, 703329.
            </p>
            <p className="text-sm text-muted-foreground">
                <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Service</a>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
            © 2025 East India Automation. All Rights Reserved. A Registered Indian Enterprise.
            </p>
        </div>
      </div>
    </footer>
  );
}
