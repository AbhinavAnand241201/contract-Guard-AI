
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider

export const metadata: Metadata = {
  title: {
    default: 'ContractGuard AI - Your AI-Powered Contract Co-Pilot',
    template: '%s | ContractGuard AI',
  },
  description: 'Secure your agreements with AI-driven contract analysis, clause decoding, and risk protection. ContractGuard AI helps you understand and improve your contracts effortlessly.',
  keywords: ['contract analysis', 'ai legal tech', 'contract review', 'legal ai', 'risk management', 'clause decoder', 'negotiation simulator'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <div className="flex-grow w-full">
            {children}
          </div>
          <AppFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
