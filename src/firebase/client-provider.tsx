'use client';
import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
