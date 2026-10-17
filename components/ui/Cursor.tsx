"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Cursor discreto: um ponto e uma mira técnica com a coordenada, só no computador.
export default function Cursor() {
  const ponto = useRef<HTMLDivElement>(null);
  const mira = useRef<HTMLDivElement>(null);
  const coord = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fino || reduz) return;
    document.documentElement.classList.add("has-cursor");
    const p = ponto.current!;
    const m = mira.current!;
    gsap.set([p, m], { xPercent: -50, yPercent: -50, opacity: 1 });
    const px = gsap.quickTo(p, "x", { duration: 0.08 });
    const py = gsap.quickTo(p, "y", { duration: 0.08 });
    const mx = gsap.quickTo(m, "x", { duration: 0.45, ease: "power3" });
    const my = gsap.quickTo(m, "y", { duration: 0.45, ease: "power3" });

    const mover = (e: PointerEvent) => {
      px(e.clientX);
      py(e.clientY);
      mx(e.clientX);
      my(e.clientY);
      if (coord.current) coord.current.textContent = `${String(e.clientX).padStart(4, "0")} · ${String(e.clientY).padStart(4, "0")}`;
    };
    const sobre = (e: PointerEvent) => {
      const alvo = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      gsap.to(m, { scale: alvo ? 1.8 : 1, duration: 0.35, ease: "power3" });
      gsap.to(p, { scale: alvo ? 0 : 1, duration: 0.2 });
    };
    const sair = () => gsap.to([p, m], { opacity: 0, duration: 0.2 });
    const entrar = () => gsap.to([p, m], { opacity: 1, duration: 0.2 });
    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerover", sobre);
    document.addEventListener("pointerleave", sair);
    document.addEventListener("pointerenter", entrar);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerover", sobre);
      document.removeEventListener("pointerleave", sair);
      document.removeEventListener("pointerenter", entrar);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ponto} className="fixed left-0 top-0 h-1.5 w-1.5 bg-white opacity-0" />
      <div ref={mira} className="fixed left-0 top-0 h-9 w-9 opacity-0">
        <span className="absolute left-1/2 top-0 h-2 w-px bg-white" />
        <span className="absolute bottom-0 left-1/2 h-2 w-px bg-white" />
        <span className="absolute left-0 top-1/2 h-px w-2 bg-white" />
        <span className="absolute right-0 top-1/2 h-px w-2 bg-white" />
        <span ref={coord} className="tnum absolute left-11 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] text-white/70" />
      </div>
    </div>
  );
}
