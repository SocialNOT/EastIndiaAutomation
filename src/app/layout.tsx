import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/components/modal-provider';
import { LeadCaptureModal } from '@/components/lead-capture-modal';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

export const metadata: Metadata = {
  title: 'East India Automation',
  description: 'The Industrial Revolution of Intelligence.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <FirebaseClientProvider>
            <ModalProvider>
              {children}
              <LeadCaptureModal />
            </ModalProvider>
            <Toaster />
            <FirebaseErrorListener />
          </FirebaseClientProvider>
        </Providers>
      </body>
    </html>
  );
}
