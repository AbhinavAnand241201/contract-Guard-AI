
"use client";

import type { DecodeClauseInput, DecodeClauseOutput } from '@/ai/flows/basic-clause-decoder';
import { decodeClause } from '@/ai/flows/basic-clause-decoder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2, MessageSquareText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function BasicClauseDecoderFeature() {
  const [clauseText, setClauseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
        className: "bg-primary text-primary-foreground" // Using primary for success toast
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
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/30"> {/* Changed background */}
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">Basic Clause Decoder</CardTitle>
            <CardDescription>Understand complex legal terms. Enter a clause to get a plain-English explanation.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clause-text" className="text-base font-medium">Enter Legal Clause</Label>
          <Textarea
            id="clause-text"
            value={clauseText}
            onChange={(e) => setClauseText(e.target.value)}
            placeholder="Paste or type your legal clause here..."
            rows={6} // Increased rows
            className="resize-none text-sm p-3 focus:border-primary transition-colors bg-background"
          />
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {explanation && (
          <div className="space-y-4 pt-6 border-t mt-6">
            <h3 className="text-xl font-semibold font-headline text-primary">Explanation</h3>
            <Card className="bg-muted/50 border"> {/* Changed background and added border */}
              <CardContent className="p-4">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{explanation}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-6 bg-muted/30">
        <Button onClick={handleSubmit} disabled={isLoading || !clauseText.trim()} className="w-full sm:w-auto text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Decoding...
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
