
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from './theme-toggle-button'; 

export function AppHeader() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Shield className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold font-headline whitespace-nowrap">ContractGuard AI</h1>
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
          <Link href="/#features" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 px-1 sm:px-2 py-1">
            Features
          </Link>
          <Link href="/pricing" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 px-1 sm:px-2 py-1">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 px-1 sm:px-2 py-1">
            Dashboard
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex button-hover-effect text-xs sm:text-sm h-8 sm:h-9">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
