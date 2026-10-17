"use client";

import { useEffect, useRef } from "react";

// Barra de progresso da navegação, laranja, no topo da tela.
export default function ScrollProgress() {
  const barra = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const atualizar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barra.current) barra.current.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    atualizar();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[85] h-[3px]">
      <div ref={barra} className="h-full origin-left scale-x-0 bg-azul" />
    </div>
  );
}
