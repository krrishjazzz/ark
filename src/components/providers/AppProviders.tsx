"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StoreProvider } from "@/lib/store";
import { CursorFollower } from "@/components/layout/CursorFollower";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StoreProvider>
      {loading && <LoadingScreen />}
      <SmoothScroll>
        <CursorFollower />
        {children}
      </SmoothScroll>
    </StoreProvider>
  );
}
