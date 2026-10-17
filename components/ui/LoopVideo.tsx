"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

// Vídeo mudo em loop: só toca quando aparece na tela e tem botão para pausar.
// Com "reduzir movimento", fica parado no primeiro quadro. O elemento pai precisa ser position: relative.
export default function LoopVideo({ src, label, className = "", inicio = 0 }: { src: string; label: string; className?: string; inicio?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(false);
  const pausadoRef = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (inicio) v.currentTime = inicio;
    if (reduz) {
      pausadoRef.current = true;
      setPausado(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !pausadoRef.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [inicio]);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    const pausar = !pausadoRef.current;
    pausadoRef.current = pausar;
    setPausado(pausar);
    if (pausar) v.pause();
    else v.play().catch(() => {});
  };

  return (
    <>
      <video ref={ref} src={`${asset(src)}#t=${inicio || 0.1}`} muted loop playsInline preload="metadata" aria-label={label} className={className} />
      <button
        type="button"
        onClick={alternar}
        className="absolute bottom-3 right-3 z-10 flex h-11 items-center bg-navy/80 px-3 text-[13px] text-white transition-colors hover:bg-orange hover:text-navy"
        aria-label={pausado ? `Tocar o vídeo: ${label}` : `Pausar o vídeo: ${label}`}
      >
        {pausado ? "Tocar" : "Pausar"}
      </button>
    </>
  );
}
