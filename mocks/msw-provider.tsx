"use client";

import { useEffect, useState } from "react";

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMockReady, setMockReady] = useState(false);

  const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

  useEffect(() => {
    const f = async () => {
      if (isMockingEnabled) {
        try {
          console.info("Starting browser mock service with MSW...");
          const { worker } = await import("@/mocks/browser");
          await worker.start();
          setMockReady(true);
          console.info("Browser mock service with MSW is ready");
        } catch (error) {
          console.error("Error starting browser mock service with MSW", {
            error,
          });
          setMockReady(false);
        }
      }
    };

    f();
  }, [isMockingEnabled]);

  if (isMockingEnabled && !isMockReady) {
    console.info("Waiting for browser mock service with MSW to be ready...");
    return null;
  }

  if (isMockingEnabled) {
    console.info("Browser mock service with MSW is ready");
  }

  return <>{children}</>;
}