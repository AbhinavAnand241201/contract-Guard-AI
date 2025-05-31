
"use client";

import type { ContractRiskScannerInput, ContractRiskScannerOutput } from '@/ai/flows/contract-risk-scanner';
import { contractRiskScanner } from '@/ai/flows/contract-risk-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, FileText, Loader2, ShieldAlert, UploadCloud, Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ContractRiskScannerFeature() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ContractRiskScannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setLoadingText("ContractGuard AI is thinking...");
      timer = setTimeout(() => {
        setLoadingText("ContractGuard AI is analysing...");
      }, 2500); // 2.5 seconds delay
    } else {
      setLoadingText(null);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setAnalysisResult(null); 
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a contract file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file); 

    reader.onload = async (e) => { 
      try {
        const contractDataUri = e.target?.result as string;
        if (!contractDataUri) {
            throw new Error("Failed to read file content.");
        }
        const input: ContractRiskScannerInput = { contractDataUri };
        const result = await contractRiskScanner(input); 
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: "Contract risk assessment finished successfully.",
          variant: "default",
          className: "bg-primary text-primary-foreground"
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
        setError(errorMessage);
        toast({
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false); 
      }
    };

    reader.onerror = () => {
      setError("Error reading file. Please try again or select a different file.");
      toast({
        title: "File Read Error",
        description: "Could not read the selected file.",
        variant: "destructive",
      });
      setIsLoading(false); 
    };
  };

  const getRiskLevelColorClass = (level: 'Low' | 'Medium' | 'High' | undefined) => {
    if (level === 'High') return 'text-destructive font-bold'; 
    if (level === 'Medium') return 'text-yellow-600 font-bold'; 
    if (level === 'Low') return 'text-green-600 font-bold';
    return 'text-foreground';
  };
  

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="border-b p-4 sm:p-6"> 
        <div className="flex items-center gap-3">
          <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
          <div>
            <CardTitle className="text-xl sm:text-2xl font-headline">Contract Risk Scanner</CardTitle>
            <CardDescription className="text-sm">Upload your contract (PDF, DOCX, TXT) to identify potential risks and get an AI-powered analysis.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contract-file" className="text-base font-medium">Upload Contract Document</Label>
          <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors bg-background">
            <UploadCloud className="w-10 h-10 text-muted-foreground sm:mb-0 mb-2 shrink-0" />
            <Input
              id="contract-file"
              type="file"
              onChange={handleFileChange}
              className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-primary/10 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 cursor-pointer"
              accept=".pdf,.doc,.docx,.txt"
              disabled={isLoading}
            />
          </div>
          {file && <p className="text-sm text-muted-foreground mt-2">Selected file: {file.name}</p>}
        </div>

        {isLoading && loadingText && (
          <div className="flex items-center justify-center p-4 my-4 text-sm text-primary bg-primary/10 rounded-md border border-primary/30">
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            <span>{loadingText}</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4 text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && !isLoading && (
          <div className="space-y-6 pt-6 border-t mt-6">
            <h3 className="text-xl font-semibold font-headline text-primary mb-2">Analysis Results</h3>
            
            <Card className="bg-card border rounded-lg">
              <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
                  Overall Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 pb-4 space-y-2">
                <p className={`text-2xl ${getRiskLevelColorClass(analysisResult.riskLevel)}`}>
                  {analysisResult.riskLevel}
                </p>
                {analysisResult.riskLevelReasoning && (
                  <p className="text-xs sm:text-sm text-muted-foreground italic">
                    {analysisResult.riskLevelReasoning}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border rounded-lg">
              <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
                <CardTitle className="text-lg sm:text-xl">Risk Report</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 pb-4">
                <div className="text-sm whitespace-pre-wrap bg-muted/30 p-3 sm:p-4 rounded-md max-h-96 overflow-y-auto border">
                  {analysisResult.riskReport}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border rounded-lg">
              <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
                <CardTitle className="text-lg sm:text-xl">Identified Risk Factors</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 pb-4">
                {analysisResult.riskFactors.length > 0 ? (
                  <ul className="space-y-3">
                    {analysisResult.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md border">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> 
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground p-3 bg-muted/30 rounded-md border">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm">No specific risk factors highlighted by the AI in this summary.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Alert variant="default" className="mt-6 bg-accent/10 border-accent text-accent-foreground text-xs sm:text-sm">
                <Info className="h-5 w-5 text-accent" />
                <AlertTitle className="font-semibold text-accent">Important Disclaimer</AlertTitle>
                <AlertDescription>
                    The risk analysis provided is AI-generated and for informational purposes only. It is not a substitute for professional legal advice. Always consult with a qualified legal professional for advice specific to your situation.
                </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4 sm:p-6 bg-muted/50">
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading && loadingText ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {loadingText}
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              Scan Contract
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

    