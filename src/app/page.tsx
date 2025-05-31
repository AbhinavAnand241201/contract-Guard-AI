"use client"; // Tabs component requires client-side interactivity

import { AppHeader } from '@/components/header';
import { ContractRiskScannerFeature } from '@/components/contract-risk-scanner-feature';
import { BasicClauseDecoderFeature } from '@/components/basic-clause-decoder-feature';
import { OneClickProtectionFeature } from '@/components/one-click-protection-feature';
import { ExportReportButton } from '@/components/export-report-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, MessageSquareText, ShieldPlus, DownloadCloud } from 'lucide-react';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
         <title>ContractGuard AI - Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Tabs defaultValue="risk-scanner" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-card border rounded-lg shadow-sm">
              <TabsTrigger value="risk-scanner" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner">
                <FileText className="mr-2 h-5 w-5" /> Risk Scanner
              </TabsTrigger>
              <TabsTrigger value="clause-decoder" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner">
                <MessageSquareText className="mr-2 h-5 w-5" /> Clause Decoder
              </TabsTrigger>
              <TabsTrigger value="one-click-protection" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner">
                <ShieldPlus className="mr-2 h-5 w-5" /> 1-Click Protection
              </TabsTrigger>
              <TabsTrigger value="export-reports" className="py-3 text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner">
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
            <TabsContent value="export-reports">
               <Card className="w-full shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-muted/50">
                    <div className="flex items-center gap-3">
                    <DownloadCloud className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Exportable Reports</CardTitle>
                        <CardDescription>Download summaries of your contract analyses to share with counterparties.</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ExportReportButton />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <footer className="text-center py-6 border-t text-sm text-muted-foreground">
          © {new Date().getFullYear()} ContractGuard AI. All rights reserved. This tool does not provide legal advice.
        </footer>
      </div>
    </>
  );
}
