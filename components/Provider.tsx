'use client';

import type { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode
}

export function Provider ({ children }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
