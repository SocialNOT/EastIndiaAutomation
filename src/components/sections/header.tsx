"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useModal } from "../modal-provider";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

const navLinks = [
    { href: "#solution", label: "Solutions" },
    { href: "#experience-zone", label: "Platform" },
    { href: "#leadership", label: "Global Reach" },
    { href: "#contact", label: "Company" },
]

export function Header() {
    const { setTheme, theme } = useTheme();
    const { setOpen } = useModal();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleLinkClick = () => {
        setIsSheetOpen(false);
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-24">
                <a href="#hero">
                    <Logo className="w-28 md:w-32" />
                    <span className="sr-only">East India Automation Home</span>
                </a>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {link.label}
                         </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button onClick={() => setOpen(true)} className="hidden md:inline-flex font-bold text-sm tracking-wide">
                        DEPLOY INTELLIGENCE
                    </Button>
                    
                    {/* Mobile Nav */}
                    <div className="md:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6"/>
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] bg-background">
                                <div className="flex flex-col gap-8 pt-10">
                                    <nav className="flex flex-col gap-6">
                                        {navLinks.map(link => (
                                             <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                                {link.label}
                                             </a>
                                        ))}
                                    </nav>
                                    <Button onClick={() => { setOpen(true); handleLinkClick(); }} className="w-full font-bold text-base py-6">
                                        DEPLOY INTELLIGENCE
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
