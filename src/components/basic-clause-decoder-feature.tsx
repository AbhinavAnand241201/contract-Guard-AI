
"use client";

import type { DecodeClauseInput, DecodeClauseOutput } from '@/ai/flows/basic-clause-decoder';
import { decodeClause } from '@/ai/flows/basic-clause-decoder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2, MessageSquareText, Sparkles, Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function BasicClauseDecoderFeature() {
  const [clauseText, setClauseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setLoadingText("ContractGuard AI is thinking...");
      timer = setTimeout(() => {
        setLoadingText("ContractGuard AI is analysing...");
      }, 2500); 
    } else {
      setLoadingText(null);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!clauseText.trim()) {
      toast({
        title: "No clause provided",
        description: "Please enter a legal clause to decode.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const input: DecodeClauseInput = { clause: clauseText };
      const result: DecodeClauseOutput = await decodeClause(input);
      setExplanation(result.explanation);
      toast({
        title: "Clause Decoded",
        description: "Explanation generated successfully.",
        variant: "default",
        className: "bg-primary text-primary-foreground"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Decoding Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden card-hover-effect">
      <CardHeader className="border-b p-4 sm:p-6 bg-card/50"> 
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
          <div>
            <CardTitle className="text-xl sm:text-2xl font-headline">Basic Clause Decoder</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Understand complex legal terms. Enter a clause to get a plain-English explanation.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clause-text" className="text-base font-medium">Enter Legal Clause</Label>
          <Textarea
            id="clause-text"
            value={clauseText}
            onChange={(e) => setClauseText(e.target.value)}
            placeholder="Paste or type your legal clause here..."
            rows={6} 
            className="resize-none text-sm p-3 focus:border-primary transition-colors bg-background border shadow-sm"
            disabled={isLoading}
          />
        </div>
        
        {isLoading && loadingText && (
          <div className="flex items-center justify-center p-4 my-4 text-sm text-primary bg-primary/10 rounded-md border border-primary/30">
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            <span>{loadingText}</span>
          </div>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="mt-4 text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {explanation && !isLoading && (
          <div className="space-y-4 pt-6 border-t mt-6">
            <h3 className="text-lg sm:text-xl font-semibold font-headline text-primary">Explanation</h3>
            <Card className="bg-muted/50 border rounded-lg shadow-md"> 
              <CardContent className="p-3 sm:p-4">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{explanation}</p>
              </CardContent>
            </Card>
            <Alert variant="default" className="mt-6 bg-accent/10 border-accent/50 text-accent-foreground text-xs sm:text-sm shadow">
              <Info className="h-5 w-5 text-accent" />
              <AlertTitle className="font-semibold text-accent">Important Disclaimer</AlertTitle>
              <AlertDescription>
                AI-generated explanations are for informational purposes only and do not constitute legal advice. Always consult with a qualified legal professional for advice specific to your situation.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4 sm:p-6 bg-muted/50">
        <Button onClick={handleSubmit} disabled={isLoading || !clauseText.trim()} className="w-full sm:w-auto text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground button-hover-effect shadow-md hover:shadow-lg">
          {isLoading && loadingText ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {loadingText}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
             Decode Clause
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
