"use client";

import { useEffect } from "react";

const RETICLE_TOKEN = "6a2c2ba5745743179b29d258f90d5b4e284edf451d454d64";

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
              reticle.connect({
                token: "${RETICLE_TOKEN}",
                allowNonLocalhost: true
              });
            }
          }).catch(() => {});
        } catch (e) {}
      `;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
