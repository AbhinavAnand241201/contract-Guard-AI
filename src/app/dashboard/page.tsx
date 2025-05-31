
"use client"; 

import { ContractRiskScannerFeature } from '@/components/contract-risk-scanner-feature';
import { BasicClauseDecoderFeature } from '@/components/basic-clause-decoder-feature';
import { OneClickProtectionFeature } from '@/components/one-click-protection-feature';
import { NegotiationSimulatorFeature } from '@/components/negotiation-simulator-feature'; 
import { ExportReportButton } from '@/components/export-report-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, MessageSquareText, ShieldPlus, DownloadCloud, Brain } from 'lucide-react';


export default function DashboardPage() {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-headline text-foreground">ContractGuard AI Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">Your intelligent tools for smarter contract management and negotiation.</p>
        </div>
        <Tabs defaultValue="risk-scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-10 bg-card border rounded-lg shadow-sm p-2">
            <TabsTrigger value="risk-scanner" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner rounded-md">
              <FileText className="mr-2 h-5 w-5" /> Risk Scanner
            </TabsTrigger>
            <TabsTrigger value="clause-decoder" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner rounded-md">
              <MessageSquareText className="mr-2 h-5 w-5" /> Clause Decoder
            </TabsTrigger>
            <TabsTrigger value="one-click-protection" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner rounded-md">
              <ShieldPlus className="mr-2 h-5 w-5" /> 1-Click Protection
            </TabsTrigger>
            <TabsTrigger value="negotiation-simulator" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner rounded-md">
              <Brain className="mr-2 h-5 w-5" /> AI Simulator
            </TabsTrigger>
            <TabsTrigger value="export-reports" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner rounded-md">
              <DownloadCloud className="mr-2 h-5 w-5" /> Export Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="risk-scanner">
            <ContractRiskScannerFeature />
          </TabsContent>
          <TabsContent value="clause-decoder">
            <BasicClauseDecoderFeature />
          </TabsContent>
          <TabsContent value="one-click-protection">
            <OneClickProtectionFeature />
          </TabsContent>
          <TabsContent value="negotiation-simulator">
            <NegotiationSimulatorFeature />
          </TabsContent>
          <TabsContent value="export-reports">
             <Card className="w-full shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                  <DownloadCloud className="w-8 h-8 text-primary" />
                  <div>
                      <CardTitle className="text-2xl font-headline">Exportable Reports</CardTitle>
                      <CardDescription>Download summaries of your contract analyses to share with counterparties.</CardDescription>
                  </div>
                  </div>
              </CardHeader>
              <CardContent className="pt-6"> 
                  <ExportReportButton />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
