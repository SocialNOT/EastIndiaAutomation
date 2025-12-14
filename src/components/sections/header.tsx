import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex items-center justify-between h-20">
                <Logo />
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#solution" className="text-muted-foreground hover:text-primary transition-colors">Solution</a>
                    <a href="#pillars" className="text-muted-foreground hover:text-primary transition-colors">Pillars</a>
                    <a href="#experience-zone" className="text-muted-foreground hover:text-primary transition-colors">Demo</a>
                    <a href="#blueprint" className="text-muted-foreground hover:text-primary transition-colors">Blueprint</a>
                    <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                </nav>
                <Button asChild>
                    <a href="#contact">Get Started</a>
                </Button>
            </div>
        </header>
    )
}
