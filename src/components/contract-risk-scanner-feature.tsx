
"use client";

import type { ContractRiskScannerInput, ContractRiskScannerOutput } from '@/ai/flows/contract-risk-scanner';
import { contractRiskScanner } from '@/ai/flows/contract-risk-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, FileText, Loader2, ShieldCheck, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ContractRiskScannerFeature() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ContractRiskScannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        const contractDataUri = e.target?.result as string;
        if (!contractDataUri) {
            throw new Error("Failed to read file.");
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
        setIsLoading(false); 
      };
      reader.onerror = () => {
        throw new Error("Error reading file.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false); 
    } 
  };

  const getRiskScoreColor = (score: number) => {
    if (score > 70) return 'bg-destructive'; 
    if (score > 40) return 'bg-yellow-500'; 
    return 'bg-green-500'; 
  };
  
  const getRiskLevelText = (score: number) => {
    if (score > 70) return 'High Risk';
    if (score > 40) return 'Medium Risk';
    return 'Low Risk';
  };


  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="border-b"> 
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">Contract Risk Scanner</CardTitle>
            <CardDescription>Upload your contract to identify potential risks and get an AI-powered analysis.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contract-file" className="text-base font-medium">Upload Contract Document</Label>
          <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors bg-background">
            <UploadCloud className="w-10 h-10 text-muted-foreground sm:mb-0 mb-2" />
            <Input
              id="contract-file"
              type="file"
              onChange={handleFileChange}
              className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-primary/10 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 cursor-pointer"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          {file && <p className="text-sm text-muted-foreground mt-2">Selected file: {file.name}</p>}
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
            <h3 className="text-xl font-semibold font-headline text-primary">Analysis Results</h3>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Overall Risk Score: {analysisResult.riskScore}/100
                </CardTitle>
                <CardDescription className="font-medium">{getRiskLevelText(analysisResult.riskScore)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={analysisResult.riskScore} className={`h-3 rounded-full [&>div]:${getRiskScoreColor(analysisResult.riskScore)}`} />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Risk Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap bg-muted/50 p-4 rounded-md max-h-60 overflow-y-auto border">{analysisResult.riskReport}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Identified Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResult.riskFactors.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisResult.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-md border">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> 
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground p-3 bg-muted/50 rounded-md border">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-sm">No specific risk factors highlighted by the AI in this summary.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-6 bg-muted/50">
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto text-base py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
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
