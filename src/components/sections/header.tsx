"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useModal } from "../modal-provider";

export function Header() {
    const { setTheme, theme } = useTheme();
    const { setOpen } = useModal();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex items-center justify-between h-24">
                <Logo />
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#solution" className="text-muted-foreground hover:text-primary transition-colors">Solution</a>
                        <a href="#pillars" className="text-muted-foreground hover:text-primary transition-colors">Pillars</a>
                        <a href="#experience-zone" className="text-muted-foreground hover:text-primary transition-colors">Demo</a>
                        <a href="#blueprint" className="text-muted-foreground hover:text-primary transition-colors">Blueprint</a>
                        <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                    </nav>
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button onClick={() => setOpen(true)}>
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    )
}
