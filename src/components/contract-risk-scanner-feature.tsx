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
          className: "bg-accent text-accent-foreground"
        });
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
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score > 70) return 'bg-destructive'; // Red for high risk
    if (score > 40) return 'bg-yellow-500'; // Yellow for medium risk
    return 'bg-green-500'; // Green for low risk
  };
  
  const getRiskLevelText = (score: number) => {
    if (score > 70) return 'High Risk';
    if (score > 40) return 'Medium Risk';
    return 'Low Risk';
  };


  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/50">
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
          <div className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
            <UploadCloud className="w-10 h-10 text-muted-foreground" />
            <Input
              id="contract-file"
              type="file"
              onChange={handleFileChange}
              className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <div className="space-y-6 pt-4 border-t">
            <h3 className="text-xl font-semibold font-headline text-primary">Analysis Results</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Overall Risk Score: {analysisResult.riskScore}/100
                </CardTitle>
                <CardDescription>{getRiskLevelText(analysisResult.riskScore)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={analysisResult.riskScore} className={`h-3 [&>div]:${getRiskScoreColor(analysisResult.riskScore)}`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap bg-muted/30 p-4 rounded-md max-h-60 overflow-y-auto">{analysisResult.riskReport}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Identified Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResult.riskFactors.length > 0 ? (
                  <ul className="space-y-2">
                    {analysisResult.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded-md">
                        <AlertCircle className="w-5 h-5 text-destructive mt-1 shrink-0" /> 
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground p-2 bg-muted/30 rounded-md">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p>No specific risk factors highlighted by the AI in this summary.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-6">
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto text-base py-3 px-6 bg-accent hover:bg-accent/90 text-accent-foreground">
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
