
"use client"; 

import { ContractRiskScannerFeature } from '@/components/contract-risk-scanner-feature';
import { BasicClauseDecoderFeature } from '@/components/basic-clause-decoder-feature';
import { ClauseGuardianFeature } from '@/components/clause-guardian-feature';
import { NegotiationSimulatorFeature } from '@/components/negotiation-simulator-feature'; 
import { ExportReportButton } from '@/components/export-report-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, MessageSquareText, ShieldAlert, DownloadCloud, Brain } from 'lucide-react';


export default function DashboardPage() {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">ContractGuard AI Dashboard</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2">Your intelligent tools for smarter contract management and negotiation.</p>
        </div>
        <Tabs defaultValue="risk-scanner" className="w-full">
          <TabsList className="flex flex-wrap justify-center sm:justify-start gap-3 mb-8 p-2 bg-muted rounded-lg shadow-sm">
            <TabsTrigger 
              value="risk-scanner" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all hover:bg-primary/5"
            >
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Risk Scanner</span>
            </TabsTrigger>
            <TabsTrigger 
              value="clause-decoder" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all hover:bg-primary/5"
            >
              <MessageSquareText className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Clause Decoder</span>
            </TabsTrigger>
            <TabsTrigger 
              value="clause-guardian" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all hover:bg-primary/5"
            >
              <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Clause Guardian</span>
            </TabsTrigger>
            <TabsTrigger 
              value="negotiation-simulator" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all hover:bg-primary/5"
            >
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>AI Simulator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="export-reports" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all hover:bg-primary/5"
            >
              <DownloadCloud className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Export Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="risk-scanner">
            <ContractRiskScannerFeature />
          </TabsContent>
          <TabsContent value="clause-decoder">
            <BasicClauseDecoderFeature />
          </TabsContent>
          <TabsContent value="clause-guardian">
            <ClauseGuardianFeature />
          </TabsContent>
          <TabsContent value="negotiation-simulator">
            <NegotiationSimulatorFeature />
          </TabsContent>
          <TabsContent value="export-reports">
             <Card className="w-full shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="border-b p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                  <DownloadCloud className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                      <CardTitle className="text-xl sm:text-2xl font-headline">Exportable Reports</CardTitle>
                      <CardDescription className="text-sm">Download summaries of your contract analyses to share with counterparties.</CardDescription>
                  </div>
                  </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-6"> 
                  <ExportReportButton />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
