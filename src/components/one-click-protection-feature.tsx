"use client";

import type { GenerateCounterClauseInput, GenerateCounterClauseOutput } from '@/ai/flows/one-click-protection';
import { generateCounterClause } from '@/ai/flows/one-click-protection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, ShieldPlus, Loader2, Wand2 } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function OneClickProtectionFeature() {
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [counterClause, setCounterClause] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!contractText.trim()) {
      toast({
        title: "No contract text provided",
        description: "Please enter the contract text to generate protection.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setCounterClause(null);

    try {
      const input: GenerateCounterClauseInput = { contractText };
      const result: GenerateCounterClauseOutput = await generateCounterClause(input);
      setCounterClause(result.counterClause);
      toast({
        title: "Protection Generated",
        description: "Counter-clause created successfully.",
        variant: "default",
        className: "bg-accent text-accent-foreground"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center gap-3">
          <ShieldPlus className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">1-Click Protection</CardTitle>
            <CardDescription>Generate a protective counter-clause for your contract with a single click.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contract-text" className="text-base font-medium">Enter Contract Text</Label>
          <Textarea
            id="contract-text"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste the full text of your contract here..."
            rows={8}
            className="resize-none text-sm p-3 focus:border-primary transition-colors"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {counterClause && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-xl font-semibold font-headline text-primary">Generated Counter-Clause</h3>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p className="text-sm whitespace-pre-wrap">{counterClause}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-6">
        <Button onClick={handleSubmit} disabled={isLoading || !contractText.trim()} className="w-full sm:w-auto text-base py-3 px-6 bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Protection
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
