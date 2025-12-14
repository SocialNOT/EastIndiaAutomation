'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This is a client component that will listen for permission errors
// and throw them to be caught by the Next.js error overlay.
// This is only for development and should be disabled in production.
export default function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: Error) => {
      // Throwing the error here will cause it to be caught by the Next.js
      // development error overlay.
      throw error;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
