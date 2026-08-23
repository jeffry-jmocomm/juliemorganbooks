"use client";

import React, { useRef, useEffect, useCallback } from "react";

/**
 * EnergyFlow — Canvas-based animated energy tendrils that converge toward
 * the book cover, mimicking the glowing energy lines on the cover art.
 *
 * Renders on a full-section canvas overlay (pointer-events: none).
 */

interface Tendril {
  /** Control points for a cubic Bézier that bends toward the focal point */
  x0: number;
  y0: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  x3: number;
  y3: number;
  /** Animation phase offset */
  phase: number;
  /** Speed multiplier */
  speed: number;
  /** Base hue (teal ≈ 185, magenta ≈ 310, purple ≈ 270) */
  hue: number;
  /** Line width */
  width: number;
  /** Length of the visible "dash" (0–1 proportion of the path) */
  dashLen: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

const TENDRIL_COUNT = 14;
const PARTICLE_COUNT = 40;
const HUES = [185, 195, 270, 290, 310, 330]; // teal, cyan, purple, magenta, pink

export default function EnergyFlow({
  className = "",
  focalX = 0.5,
  focalY = 0.5,
}: {
  className?: string;
  focalX?: number;
  focalY?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tendrilsRef = useRef<Tendril[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  // Use refs for the current focal point so the animation loop can read them without recreating closures
  const focalXRef = useRef(focalX);
  const focalYRef = useRef(focalY);

  useEffect(() => {
    focalXRef.current = focalX;
    focalYRef.current = focalY;
  }, [focalX, focalY]);

  const initTendrils = useCallback((w: number, h: number) => {
    const tendrils: Tendril[] = [];
    for (let i = 0; i < TENDRIL_COUNT; i++) {
      const angle = (i / TENDRIL_COUNT) * Math.PI * 2 + Math.random() * 0.4;
      // Start from edges
      const radius = Math.max(w, h) * (0.6 + Math.random() * 0.4);
      const cx = focalXRef.current * w;
      const cy = focalYRef.current * h;
      const x0 = cx + Math.cos(angle) * radius;
      const y0 = cy + Math.sin(angle) * radius;
      // End near the focal point with some scatter
      const x3 = cx + (Math.random() - 0.5) * w * 0.12;
      const y3 = cy + (Math.random() - 0.5) * h * 0.15;
      // Control points — add organic curvature
      const midX = (x0 + x3) / 2;
      const midY = (y0 + y3) / 2;
      const perpAngle = angle + Math.PI / 2;
      const bendStrength = (0.15 + Math.random() * 0.25) * Math.min(w, h);
      const bend2 = (0.1 + Math.random() * 0.2) * Math.min(w, h);

      tendrils.push({
        x0,
        y0,
        cp1x: midX + Math.cos(perpAngle) * bendStrength,
        cp1y: midY + Math.sin(perpAngle) * bendStrength,
        cp2x: (midX + x3) / 2 - Math.cos(perpAngle) * bend2,
        cp2y: (midY + y3) / 2 - Math.sin(perpAngle) * bend2,
        x3,
        y3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.3,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        width: 1 + Math.random() * 2.5,
        dashLen: 0.15 + Math.random() * 0.2,
      });
    }
    tendrilsRef.current = tendrils;
  }, []);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    const cx = focalXRef.current * w;
    const cy = focalYRef.current * h;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * Math.max(w, h) * 0.5;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 150,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        size: 1 + Math.random() * 2.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initTendrils(w, h);
      initParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    /** Get point on cubic Bézier at t ∈ [0,1] */
    const bezierPoint = (t: Tendril, p: number) => {
      const mt = 1 - p;
      return {
        x:
          mt * mt * mt * t.x0 +
          3 * mt * mt * p * t.cp1x +
          3 * mt * p * p * t.cp2x +
          p * p * p * t.x3,
        y:
          mt * mt * mt * t.y0 +
          3 * mt * mt * p * t.cp1y +
          3 * mt * p * p * t.cp2y +
          p * p * p * t.y3,
      };
    };

    const draw = () => {
      timeRef.current += 0.012;
      const time = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      // ─── Draw tendrils ───────────────────────────────────────
      for (const t of tendrilsRef.current) {
        // The "head" of the visible dash travels along the curve
        const headT =
          ((time * t.speed + t.phase) % 1.4) - 0.2; // allow overshoot for smooth looping
        const tailT = headT - t.dashLen;
        const clampHead = Math.max(0, Math.min(1, headT));
        const clampTail = Math.max(0, Math.min(1, tailT));

        if (clampHead <= clampTail) continue; // nothing visible

        // Draw the visible portion as many small segments
        const steps = 60;
        const startStep = Math.floor(clampTail * steps);
        const endStep = Math.ceil(clampHead * steps);

        for (let s = startStep; s < endStep; s++) {
          const p1 = Math.max(clampTail, s / steps);
          const p2 = Math.min(clampHead, (s + 1) / steps);
          if (p1 >= p2) continue;

          const pt1 = bezierPoint(t, p1);
          const pt2 = bezierPoint(t, p2);

          // Opacity ramps up from tail to head
          const progress = (p1 - clampTail) / (clampHead - clampTail + 0.001);
          const alpha = progress * (0.2 + 0.15 * Math.sin(time * 2 + t.phase));

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = `hsla(${t.hue}, 80%, 65%, ${alpha})`;
          ctx.lineWidth = t.width * (0.5 + progress * 0.5);
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Glow at the head
        const headPt = bezierPoint(t, clampHead);
        const glowAlpha = 0.15 + 0.1 * Math.sin(time * 3 + t.phase);
        const grd = ctx.createRadialGradient(
          headPt.x,
          headPt.y,
          0,
          headPt.x,
          headPt.y,
          12 + t.width * 4
        );
        grd.addColorStop(0, `hsla(${t.hue}, 90%, 70%, ${glowAlpha})`);
        grd.addColorStop(1, `hsla(${t.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, 12 + t.width * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── Draw particles drifting toward focal point ──────────
      const cx = focalXRef.current * w;
      const cy = focalYRef.current * h;

      for (const p of particlesRef.current) {
        p.life++;
        if (p.life > p.maxLife) {
          // Respawn from edge
          const angle = Math.random() * Math.PI * 2;
          const dist = 120 + Math.random() * Math.max(w, h) * 0.5;
          p.x = cx + Math.cos(angle) * dist;
          p.y = cy + Math.sin(angle) * dist;
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
          p.maxLife = 150 + Math.random() * 150;
          p.hue = HUES[Math.floor(Math.random() * HUES.length)];
        }

        // Attract toward focal point
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        const force = 0.02 + 0.15 / (dist * 0.01 + 1);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        const alpha =
          lifeRatio < 0.1
            ? lifeRatio / 0.1
            : lifeRatio > 0.8
            ? (1 - lifeRatio) / 0.2
            : 1;

        const grd = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        grd.addColorStop(
          0,
          `hsla(${p.hue}, 85%, 70%, ${alpha * 0.35})`
        );
        grd.addColorStop(1, `hsla(${p.hue}, 85%, 70%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── Central convergence glow (pulsing) ──────────────────
      const pulseRadius = 60 + 30 * Math.sin(time * 1.5);
      const pulseAlpha = 0.03 + 0.02 * Math.sin(time * 2);
      const cGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseRadius);
      cGrd.addColorStop(0, `hsla(270, 80%, 65%, ${pulseAlpha})`);
      cGrd.addColorStop(0.5, `hsla(310, 70%, 55%, ${pulseAlpha * 0.5})`);
      cGrd.addColorStop(1, `hsla(185, 80%, 60%, 0)`);
      ctx.fillStyle = cGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initTendrils, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
