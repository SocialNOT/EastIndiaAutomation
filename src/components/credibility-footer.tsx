"use client";

export function CredibilityFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm py-2 px-4 border-t border-primary/20">
      <div className="container mx-auto text-center">
        <p className="text-xs font-code text-primary/80 tracking-wider">
          <span className="hidden md:inline">GOVT. OF INDIA REGISTERED MSME: UDYAM-WB-18-0168489 | </span> 
          <span>ISO 27001 CERTIFIED DATA PROTOCOLS</span>
          <span className="hidden md:inline"> | GDPR COMPLIANT</span>
        </p>
      </div>
    </div>
  );
}
