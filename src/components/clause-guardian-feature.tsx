
"use client";

import type { ClauseGuardianInput, ClauseGuardianOutput } from '@/ai/flows/clause-guardian-flow'; // Updated import
import { generateClauseSuggestions } from '@/ai/flows/clause-guardian-flow'; // Updated import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ShieldAlert, Loader2, Wand2, Info } from 'lucide-react'; // Replaced ShieldPlus with ShieldAlert for a more "suggestion" feel
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ClauseGuardianFeature() { // Renamed component
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ClauseGuardianOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!contractText.trim()) {
      toast({
        title: "No contract text provided",
        description: "Please enter the contract text to get improvement suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const input: ClauseGuardianInput = { contractText };
      const result: ClauseGuardianOutput = await generateClauseSuggestions(input); // Updated function call
      setAnalysisResult(result);
      toast({
        title: "Suggestions Generated",
        description: "Clause improvement suggestions created successfully.",
        variant: "default",
        className: "bg-primary text-primary-foreground"
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
      <CardHeader className="border-b p-4 sm:p-6"> 
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
          <div>
            <CardTitle className="text-xl sm:text-2xl font-headline">Clause Guardian AI</CardTitle>
            <CardDescription className="text-sm">Get AI-powered suggestions to improve potentially risky or unfavorable clauses in your contract.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contract-text" className="text-base font-medium">Enter Full Contract Text</Label>
          <Textarea
            id="contract-text"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste the full text of your contract here..."
            rows={10} 
            className="resize-none text-sm p-3 focus:border-primary transition-colors bg-background border"
          />
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <div className="space-y-6 pt-6 border-t mt-6">
            <h3 className="text-xl font-semibold font-headline text-primary">Suggested Improvements</h3>
            {analysisResult.suggestedImprovements.length > 0 ? (
              analysisResult.suggestedImprovements.map((item, index) => (
                <Card key={index} className="bg-muted/30 border rounded-lg">
                  <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
                    <CardTitle className="text-base sm:text-lg font-semibold">Suggestion {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-5 pb-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Original Clause Context:</h4>
                      <p className="text-xs sm:text-sm p-2 bg-background border rounded-md whitespace-pre-wrap">{item.originalClauseContext}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Suggested Improvement:</h4>
                      <p className="text-xs sm:text-sm p-2 bg-background border rounded-md whitespace-pre-wrap">{item.suggestion}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Reasoning:</h4>
                      <p className="text-xs sm:text-sm p-2 bg-background border rounded-md whitespace-pre-wrap">{item.reasoning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No specific improvement suggestions were generated for this contract at this time.</p>
            )}
             <Alert variant="default" className="mt-6 bg-accent/10 border-accent text-accent-foreground">
              <Info className="h-5 w-5 text-accent" />
              <AlertTitle className="font-semibold text-accent">Important Disclaimer</AlertTitle>
              <AlertDescription className="text-xs sm:text-sm">
                {analysisResult.disclaimer}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4 sm:p-6 bg-muted/50">
        <Button onClick={handleSubmit} disabled={isLoading || !contractText.trim()} className="w-full sm:w-auto text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Get Suggestions
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
