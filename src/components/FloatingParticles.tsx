"use client";

import React, { useState, useEffect } from "react";

interface FloatingParticlesProps {
  count?: number;
  type?: "embers" | "sparkles" | "mixed";
  className?: string;
}

// Deterministic pseudo-random based on seed (avoids hydration mismatch)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function FloatingParticles({
  count = 20,
  type = "mixed",
  className = "",
}: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration mismatch entirely
  if (!mounted) return null;

  const particles = Array.from({ length: count }, (_, i) => {
    const isEmber =
      type === "embers" ? true : type === "sparkles" ? false : i % 3 !== 0;
    const s1 = seededRandom(i * 7 + 1);
    const s2 = seededRandom(i * 7 + 2);
    const s3 = seededRandom(i * 7 + 3);
    const s4 = seededRandom(i * 7 + 4);
    const s5 = seededRandom(i * 7 + 5);
    const s6 = seededRandom(i * 7 + 6);
    const s7 = seededRandom(i * 7 + 7);

    return {
      id: i,
      className: isEmber ? "ember" : "sparkle",
      style: {
        left: `${s1 * 100}%`,
        bottom: `${s2 * 20}%`,
        "--duration": `${6 + s3 * 8}s`,
        "--delay": `${s4 * 6}s`,
        width: `${2 + s5 * 4}px`,
        height: `${2 + s6 * 4}px`,
        opacity: 0.4 + s7 * 0.6,
      } as React.CSSProperties,
    };
  });

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div key={p.id} className={p.className} style={p.style} />
      ))}
    </div>
  );
}
