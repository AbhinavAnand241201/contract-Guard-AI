import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquareText, ShieldPlus, ArrowRight, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ContractGuard AI - Secure Your Agreements with AI',
  description: 'Effortlessly analyze contracts, decode complex clauses, and generate protective counter-clauses with ContractGuard AI. Your smart co-pilot for contract management.',
};

export default function LandingPage() {
  const features = [
    {
      icon: <FileText className="w-10 h-10 text-primary mb-4" />,
      title: 'AI Contract Risk Scanner',
      description: 'Upload your contracts and our AI will scan them for potential risks, high-risk clauses, and ambiguities. Get a clear risk score and detailed report.',
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'Contract Risk Scanner illustration',
      aiHint: 'contract document',
    },
    {
      icon: <MessageSquareText className="w-10 h-10 text-primary mb-4" />,
      title: 'Plain-English Clause Decoder',
      description: "Don't get lost in legal jargon. Paste any complex legal clause and get an instant, easy-to-understand explanation in plain English.",
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'Clause Decoder illustration',
      aiHint: 'legal text',
    },
    {
      icon: <ShieldPlus className="w-10 h-10 text-primary mb-4" />,
      title: '1-Click Protection',
      description: 'Feeling vulnerable? Provide your contract text, and our AI will generate a protective counter-clause to safeguard your interests effectively.',
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: '1-Click Protection illustration',
      aiHint: 'shield protection',
    },
  ];

  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-foreground">
              Navigate Contracts with <span className="text-primary">AI-Powered Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              ContractGuard AI is your smart co-pilot for understanding, analyzing, and securing your agreements.
              Turn complex legal documents into clear, actionable insights.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="text-lg py-7 px-10">
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg py-7 px-10 border-primary text-primary hover:bg-primary/5">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4 text-foreground">
              Unlock Powerful Contract Insights
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl mx-auto">
              Our suite of AI tools is designed to demystify legal documents and empower you in negotiations.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col">
                  <CardHeader className="items-center text-center bg-muted/30">
                    {feature.icon}
                    <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pt-6 text-center">
                    <Image 
                      src={feature.imgSrc} 
                      alt={feature.imgAlt} 
                      width={600} 
                      height={400} 
                      className="rounded-md mb-4 aspect-video object-cover"
                      data-ai-hint={feature.aiHint} 
                    />
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-16">
              <Button asChild size="lg" className="text-lg py-7 px-10 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">
                  Try ContractGuard AI Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works (Optional Simple Section) */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
              Simple Steps to Contract Clarity
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">1</div>
                <h3 className="text-xl font-semibold mb-2">Upload or Paste</h3>
                <p className="text-muted-foreground text-sm">Securely provide your contract document or specific clauses.</p>
              </div>
              <div className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">2</div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground text-sm">Our intelligent engine processes the text in seconds.</p>
              </div>
              <div className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">3</div>
                <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                <p className="text-muted-foreground text-sm">Receive clear reports, explanations, or protective clauses.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
