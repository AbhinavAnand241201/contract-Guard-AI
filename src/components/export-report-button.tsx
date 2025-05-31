
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

export function ExportReportButton() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Exporting reports to PDF will be available in a future update.",
      variant: "default",
      className: "bg-accent/10 text-accent-foreground" // Use accent for "coming soon"
    });
  };

  return (
    <div className="mt-2 p-6 border-t border-border bg-card rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold font-headline mb-3 text-primary">Export Report</h3>
      <p className="text-muted-foreground mb-6 text-sm">
        Download a summary of the contract analysis. This feature is currently in development and will be available soon.
      </p>
      <Button onClick={handleClick} variant="outline" className="w-full sm:w-auto text-base py-3 px-6 border-primary text-primary hover:bg-primary/5 hover:text-primary focus-visible:ring-primary">
        <Download className="mr-2 h-5 w-5" />
        Export Report (PDF)
      </Button>
    </div>
  );
}
