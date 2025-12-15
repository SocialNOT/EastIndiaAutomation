import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/components/modal-provider';
import { LeadCaptureModal } from '@/components/lead-capture-modal';
import { CredibilityFooter } from '@/components/credibility-footer';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import { ScrollToTop } from '@/components/scroll-to-top';
import { ChatWidget } from '@/components/chat/chat-widget';

export const metadata: Metadata = {
  title: 'East India Automation',
  description: 'The Global Industrial Renaissance of Intelligence.',
  openGraph: {
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Cinzel+Decorative:wght@700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22hsl(47, 68%, 46%)%22></rect><path d=%22M30 75V25h40v10H40v10h30v10H40v15h30v10H30z%22 fill=%22hsl(222, 68%, 11%)%22></path><rect x=%2220%22 y=%2220%22 width=%2210%22 height=%2210%22 fill=%22hsl(222, 68%, 11%)%22></rect><rect x=%2270%22 y=%2220%22 width=%2210%22 height=%2210%22 fill=%22hsl(222, 68%, 11%)%22></rect><rect x=%2220%22 y=%2270%22 width=%2210%22 height=%2210%22 fill=%22hsl(222, 68%, 11%)%22></rect><rect x=%2270%22 y=%2270%22 width=%2210%22 height=%2210%22 fill=%22hsl(222, 68%, 11%)%22></rect></svg>" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <ModalProvider>
            {children}
            <LeadCaptureModal />
          </ModalProvider>
          <Toaster />
          <CredibilityFooter />
          <ScrollToTop />
          <ChatWidget />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
