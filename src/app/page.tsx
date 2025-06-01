
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquareText, ShieldAlert, ArrowRight, Zap, Brain, Lightbulb, CheckCircle, Users } from 'lucide-react';

interface FeatureCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth?: number;
  imgHeight?: number;
}

interface TestimonialData {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

export const metadata: Metadata = {
  title: 'ContractGuard AI - Secure Your Agreements with AI',
  description: 'Effortlessly analyze contracts, decode complex clauses, get clause improvement suggestions, and practice negotiation with ContractGuard AI. Your smart co-pilot for contract management.',
};

export default function LandingPage() {
  const features: FeatureCardData[] = [
    {
      icon: <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'AI Contract Risk Scanner',
      description: 'Upload your contracts and our AI will scan them for potential risks, assigning a clear risk level (Low, Medium, High) with detailed reports and factors.',
      imgSrc: '/assets/features/feature-risk-scanner.png',
      imgAlt: 'AI Contract Risk Scanner analyzing a document',
    },
    {
      icon: <MessageSquareText className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'Plain-English Clause Decoder',
      description: "Don't get lost in legal jargon. Paste any complex legal clause and get an instant, easy-to-understand explanation in plain English.",
      imgSrc: '/assets/features/feature-clause-decoder.png',
      imgAlt: 'Legal clause being decoded into simple text',
    },
    {
      icon: <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'Clause Guardian AI',
      description: 'Provide your contract text, and our AI will identify potentially unfavorable clauses and offer suggestions for improvement to safeguard your interests.',
      imgSrc: '/assets/features/feature-clause-guardian.png',
      imgAlt: 'Shield protecting a contract document',
    },
    {
      icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />,
      title: 'AI Negotiation Simulator',
      description: 'Practice high-stakes contract negotiations risk-free. Simulate conversations against AI counterparties and get feedback to improve your skills.',
      imgSrc: '/assets/features/feature-negotiation-simulator.png',
      imgAlt: 'Two figures in a negotiation chat simulation',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />,
      title: 'Upload or Paste',
      description: 'Securely provide your contract document or specific clauses for analysis, or enter text for negotiation practice.',
    },
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />,
      title: 'AI Analysis & Interaction',
      description: 'Our intelligent engine processes the text in seconds for risks, explanations, clause suggestions, or engages in simulated negotiation.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />,
      title: 'Get Insights & Suggestions',
      description: 'Receive clear risk reports, plain-English explanations, clause improvement ideas, or detailed negotiation feedback.',
    },
     {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />,
      title: 'Practice & Improve',
      description: 'Use the AI Simulator to practice critical conversations, build confidence, and refine your negotiation strategies.',
    },
  ];

  const testimonials: TestimonialData[] = [
    {
      name: "Suresh Kumar",
      title: "Freelance Consultant",
      quote: "ContractGuard AI has revolutionized how I approach client contracts. The risk scanner is a lifesaver!",
      avatar: "/assets/avatars/avatar-suresh.png",
    },
    {
      name: "Ajay Sharma",
      title: "Small Business Owner",
      quote: "The Clause Decoder saved me hours of trying to understand complex terms. And the Negotiation Simulator actually helped me close a better deal.",
      avatar: "/assets/avatars/avatar-ajay.png",
    },
    {
      name: "Abhinav Patel",
      title: "Startup Founder",
      quote: "As a new founder, legal can be intimidating. ContractGuard AI gives me confidence, especially the Clause Guardian suggestions.",
      avatar: "/assets/avatars/avatar-abhinav.png",
    }
  ];


  return (
    <>
      <main className="flex-grow overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414zM41 0c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM52 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM21.464 15.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <Zap className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 text-foreground leading-tight">
              Navigate Contracts with <br className="hidden sm:block" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI-Powered Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              ContractGuard AI is your smart co-pilot for understanding, analyzing, securing your agreements, and honing your negotiation skills.
              Turn complex legal documents into clear, actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
              <Button asChild size="lg" className="text-base sm:text-lg py-3 px-6 md:py-4 md:px-8 bg-accent text-accent-foreground hover:bg-accent/90 button-hover-effect shadow-lg hover:shadow-xl group">
                <Link href="/dashboard">Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base sm:text-lg py-3 px-6 md:py-4 md:px-8 border-primary text-primary hover:bg-primary/10 hover:text-primary button-hover-effect shadow-md hover:shadow-lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Core Features</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Unlock Powerful Contract Insights & Skills
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our suite of AI tools is designed to demystify legal documents, empower you in negotiations, and help you practice critical conversations.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group bg-card card-hover-effect rounded-xl overflow-hidden flex flex-col">
                  <CardHeader className="items-center text-center pt-6 sm:pt-8 pb-4 border-b bg-card/50">
                    {feature.icon}
                    <CardTitle className="text-lg sm:text-xl font-headline group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-5 sm:p-6 text-center flex flex-col items-center">
                    <div className="relative w-full h-40 sm:h-48 mb-5 shadow-md group-hover:opacity-90 transition-opacity duration-300 rounded-lg overflow-hidden">
                      <Image 
                        src={feature.imgSrc}
                        alt={feature.imgAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                        priority={index < 2}
                        quality={75}
                      />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{feature.description}</p>
                     <Button variant="link" asChild className="mt-4 text-primary group-hover:text-accent transition-colors duration-300">
                        <Link href="/dashboard">Learn More <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12 sm:mt-16">
              <Button asChild size="lg" className="text-base sm:text-lg py-3 px-6 md:py-4 md:px-8 bg-accent hover:bg-accent/90 text-accent-foreground button-hover-effect shadow-lg hover:shadow-xl group">
                <Link href="/dashboard">
                  Try ContractGuard AI Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Get Started Easily</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Simple Steps to Contract Clarity & Negotiation Prowess
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 flex flex-col items-center group">
                  <div className="bg-primary/10 text-primary rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-6 shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 ease-in-out">
                    {step.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Trusted by Professionals</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mt-2 text-foreground">
                Why Users Love ContractGuard AI
              </h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card card-hover-effect rounded-xl p-6">
                  <CardContent className="pt-0">
                    <div className="flex items-center mb-4">
                      <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="rounded-full mr-3 border-2 border-primary/50" />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-6 text-foreground">
              Ready to Master Your Contracts?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who are saving time, reducing risk, and negotiating smarter with ContractGuard AI.
            </p>
            <Button asChild size="lg" className="text-base sm:text-lg py-3.5 px-8 md:py-4 md:px-10 bg-accent text-accent-foreground hover:bg-accent/90 button-hover-effect shadow-xl hover:shadow-2xl group">
              <Link href="/dashboard">Start Your Free Trial Now <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" /></Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
