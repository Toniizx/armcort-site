"use client";

import { useEffect, useState, type RefObject } from "react";

// Decide se o 3D roda e em que qualidade. Sem WebGL ou com "reduzir movimento", fica o desenho técnico parado.
export function use3D() {
  const [estado, setEstado] = useState<{ pronto: boolean; pode: boolean; leve: boolean }>({ pronto: false, pode: false, leve: true });
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    const fraco = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    const leve = window.innerWidth < 768 || fraco;
    setEstado({ pronto: true, pode: webgl && !reduz, leve });
  }, []);
  return estado;
}

// Só monta a cena quando ela está perto da tela; desmonta quando fica longe.
export function usePerto(ref: RefObject<Element | null>, margem = "50% 0px") {
  const [perto, setPerto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setPerto(e.isIntersecting), { rootMargin: margem });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, margem]);
  return perto;
}
