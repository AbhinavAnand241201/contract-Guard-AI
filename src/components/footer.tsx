
export function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ContractGuard AI. All rights reserved. 
        <p className="text-xs mt-1">This tool is for informational purposes and does not provide legal advice. Consult with a legal professional for advice specific to your situation.</p>
      </div>
    </footer>
  );
}
