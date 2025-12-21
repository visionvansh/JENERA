// src/components/Providers.tsx
"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // strict mode is optional, but features={domAnimation} is MANDATORY for 'm' to work
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}