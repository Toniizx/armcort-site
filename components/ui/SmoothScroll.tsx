"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Rolagem suave (Lenis) ligada ao relógio do GSAP, para as cenas presas à rolagem andarem juntas.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), touchMultiplier: 1.2 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Links de âncora pela rolagem suave
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      lenis.scrollTo(alvo as HTMLElement, { offset: -60 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Ao trocar de página, volta ao topo e recalcula as cenas.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
