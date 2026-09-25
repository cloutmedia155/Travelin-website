"use client";

import { useEffect } from "react";

export function ReticleScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;
    const isLocalhost = host === "localhost" || host === "127.0.0.1";
    const isVercel = host.includes("vercel.app");
    const isExplicit = window.location.search.includes("reticle=1");

    if (isLocalhost || isVercel || isExplicit) {
      const script = document.createElement("script");
      script.type = "module";
      script.crossOrigin = "anonymous";
      script.textContent = `
        try {
          import('https://esm.sh/@reticlehq/browser@latest').then(({ reticle }) => {
            if (reticle && typeof reticle.connect === 'function') {
              reticle.connect({ allowNonLocalhost: true });
            }
          }).catch(() => {});
        } catch (e) {}
      `;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
