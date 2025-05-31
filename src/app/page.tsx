
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquareText, ShieldAlert, ArrowRight, Zap, Brain, Lightbulb, CheckCircle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ContractGuard AI - Secure Your Agreements with AI',
  description: 'Effortlessly analyze contracts, decode complex clauses, get clause improvement suggestions, and practice negotiation with ContractGuard AI. Your smart co-pilot for contract management.',
};

export default function LandingPage() {
  const features = [
    {
      icon: <FileText className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'AI Contract Risk Scanner',
      description: 'Upload your contracts and our AI will scan them for potential risks, assigning a clear risk level (Low, Medium, High) with detailed reports and factors.',
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'Contract Risk Scanner illustration',
      aiHint: 'contract document',
    },
    {
      icon: <MessageSquareText className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'Plain-English Clause Decoder',
      description: "Don't get lost in legal jargon. Paste any complex legal clause and get an instant, easy-to-understand explanation in plain English.",
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'Clause Decoder illustration',
      aiHint: 'legal text',
    },
    {
      icon: <ShieldAlert className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'Clause Guardian AI',
      description: 'Provide your contract text, and our AI will identify potentially unfavorable clauses and offer suggestions for improvement to safeguard your interests.',
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'Clause Guardian AI illustration',
      aiHint: 'shield protection',
    },
    {
      icon: <Brain className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'AI Negotiation Simulator',
      description: 'Practice high-stakes contract negotiations risk-free. Simulate conversations against AI counterparties and get feedback to improve your skills.',
      imgSrc: 'https://placehold.co/600x400.png',
      imgAlt: 'AI Negotiation Simulator illustration',
      aiHint: 'negotiation practice',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <Lightbulb className="w-10 h-10 text-accent" />,
      title: 'Upload or Paste',
      description: 'Securely provide your contract document or specific clauses for analysis, or enter text for negotiation practice.',
    },
    {
      icon: <Zap className="w-10 h-10 text-accent" />,
      title: 'AI Analysis & Interaction',
      description: 'Our intelligent engine processes the text in seconds for risks, explanations, clause suggestions, or engages in simulated negotiation.',
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-accent" />,
      title: 'Get Insights & Suggestions',
      description: 'Receive clear risk reports, plain-English explanations, clause improvement ideas, or detailed negotiation feedback.',
    },
     {
      icon: <Users className="w-10 h-10 text-accent" />,
      title: 'Practice & Improve',
      description: 'Use the AI Simulator to practice critical conversations, build confidence, and refine your negotiation strategies.',
    },
  ];

  return (
    <>
      <main className="flex-grow overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414zM41 0c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM52 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM21.464 15.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <Zap className="w-20 h-20 md:w-24 md:h-24 text-primary mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 text-foreground leading-tight">
              Navigate Contracts with <br className="hidden sm:block" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI-Powered Confidence</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              ContractGuard AI is your smart co-pilot for understanding, analyzing, securing your agreements, and honing your negotiation skills.
              Turn complex legal documents into clear, actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
              <Button asChild size="lg" className="text-lg py-4 px-8 md:py-7 md:px-10 bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl group">
                <Link href="/dashboard">Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg py-4 px-8 md:py-7 md:px-10 border-primary text-primary hover:bg-primary/10 hover:text-primary transform hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Core Features</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Unlock Powerful Contract Insights & Skills
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our suite of AI tools is designed to demystify legal documents, empower you in negotiations, and help you practice critical conversations.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group bg-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col transform hover:-translate-y-1">
                  <CardHeader className="items-center text-center pt-8 pb-4 border-b bg-card">
                    {feature.icon}
                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-6 text-center flex flex-col items-center">
                    <Image 
                      src={feature.imgSrc} 
                      alt={feature.imgAlt} 
                      width={600} 
                      height={400} 
                      className="rounded-lg mb-5 aspect-video object-cover shadow-md group-hover:opacity-90 transition-opacity duration-300"
                      data-ai-hint={feature.aiHint} 
                    />
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{feature.description}</p>
                     <Button variant="link" asChild className="mt-4 text-primary group-hover:text-accent transition-colors duration-300">
                        <Link href="/dashboard">Learn More <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-16">
              <Button asChild size="lg" className="text-lg py-4 px-8 md:py-7 md:px-10 bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl group">
                <Link href="/dashboard">
                  Try ContractGuard AI Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started Easily</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Simple Steps to Contract Clarity & Negotiation Prowess
                </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center group">
                  <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Placeholder Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trusted by Professionals</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Why Users Love ContractGuard AI
              </h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <CardContent className="pt-0">
                    <div className="flex items-center mb-4">
                      <Image src="https://placehold.co/40x40.png" alt={`User ${i}`} width={40} height={40} className="rounded-full mr-3" data-ai-hint="person avatar" />
                      <div>
                        <p className="font-semibold text-foreground">User Name {i}</p>
                        <p className="text-xs text-muted-foreground">Job Title, Company</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"ContractGuard AI has revolutionized how I approach contracts. The risk scanner is a lifesaver, and the negotiation simulator gave me the confidence I needed!"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-6 text-foreground">
              Ready to Master Your Contracts?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who are saving time, reducing risk, and negotiating smarter with ContractGuard AI.
            </p>
            <Button asChild size="lg" className="text-xl py-4 px-10 md:py-8 md:px-12 bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl group">
              <Link href="/dashboard">Start Your Free Trial Now <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" /></Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
