
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldAlert, Star, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Choose the perfect ContractGuard AI plan to fit your needs. From free trials to enterprise solutions, get started with AI-powered contract analysis and negotiation simulation today.',
};

const pricingPlans = [
  {
    icon: <ShieldAlert className="w-10 h-10 text-primary mb-4" />,
    title: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for individuals trying out our core features & basic simulation.',
    features: [
      '1 Contract Scan / month (Risk Level assessment)',
      '3 Clause Decodes / month',
      'Basic Clause Guardian AI Suggestions',
      '1 AI Negotiation Simulation / week (5 scenarios)',
      'Basic AI Opponent Logic',
      'Basic Negotiation Feedback Score',
      'Basic Email Support',
    ],
    cta: 'Get Started Free',
    href: '/dashboard',
    popular: false,
  },
  {
    icon: <Star className="w-10 h-10 text-accent mb-4" />,
    title: 'Pro',
    price: '$29',
    period: '/ month',
    description: 'For professionals and small teams needing more power and advanced simulation.',
    features: [
      '25 Contract Scans / month (Risk Level assessment)',
      '100 Clause Decodes / month',
      'Full Clause Guardian AI Access',
      'Unlimited AI Negotiation Simulations',
      'Industry-Specific Scenarios (Coming Soon)',
      'Emotion-Aware AI Opponent (Coming Soon)',
      'Detailed Negotiation Feedback & Suggestions',
      'Export Reports (when available)',
      'Priority Email Support',
    ],
    cta: 'Choose Pro Plan',
    href: '/signup?plan=pro', 
    popular: true,
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary mb-4" />,
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations and high volume needs, including advanced simulation features.',
    features: [
      'Unlimited Contract Scans (Risk Level assessment)',
      'Unlimited Clause Decodes',
      'Unlimited Clause Guardian AI Access',
      'Unlimited AI Negotiation Simulations + Custom Roles',
      'Custom Scenario Library Creation',
      'Advanced AI Opponent Customization',
      'Team Performance Tracking for Simulations',
      'Dedicated Account Manager',
      'Custom Integrations',
      'Volume Discounts',
    ],
    cta: 'Contact Sales',
    href: '/contact-sales', 
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
            Find the Right Plan for You
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AI contract analysis and negotiation simulation with a plan that matches your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 rounded-xl flex flex-col ${plan.popular ? 'border-2 border-accent ring-4 ring-accent/20' : 'border-border'}`}
            >
              <CardHeader className="text-center items-center pt-8 border-b bg-card/50">
                {plan.icon}
                <CardTitle className="text-3xl font-headline">{plan.title}</CardTitle>
                <div className="my-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription className="text-sm h-12 px-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6 pb-8 border-t bg-muted/50">
                <Button asChild className={`w-full text-base py-3 button-hover-effect shadow hover:shadow-md ${plan.popular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>All plans come with robust security and privacy features. Need something different? <Link href="/contact-sales" className="text-primary hover:underline hover:text-accent transition-colors">Contact us</Link> for custom solutions.</p>
        </div>
      </main>
    </>
  );
}
