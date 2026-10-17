"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processo } from "@/lib/content";
import LoopVideo from "@/components/ui/LoopVideo";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

function DesenhoCorte() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full bg-tech" role="img" aria-label="Desenho: barras de aço com a linha de corte">
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x="30" y={90 + i * 56} width={190 + (i % 3) * 20} height="14" fill="#8a96a2" />
          <rect x={232 + (i % 3) * 20} y={90 + i * 56} width={140 - (i % 3) * 20} height="14" fill="#55606c" />
        </g>
      ))}
      <line x1={226} y1="60" x2={226} y2="440" stroke="#ff6b16" strokeWidth="3" />
    </svg>
  );
}

function DesenhoDobra() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full bg-tech" role="img" aria-label="Desenho: vergalhões dobrados em estribos">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${90 + i * 22} ${150 + i * 70} l200 0 l0 120 l-200 0 z m0 0 l26 -26`}
          fill="none"
          stroke={i === 2 ? "#ff6b16" : "#c9d1d9"}
          strokeWidth="9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

const midias = [
  <Image key="aco" src={asset("/media/patio.jpg")} alt="Bobinas de aço empilhadas no pátio da ARM-CORT" fill sizes="(min-width:768px) 30vw, 72vw" className="object-cover object-[50%_35%] brightness-[0.85]" />,
  <DesenhoCorte key="corte" />,
  <DesenhoDobra key="dobra" />,
  <LoopVideo key="montagem" src="/media/video-1.mp4" label="Máquina laranja da ARM-CORT soldando a espiral de uma armação de estaca" className="h-full w-full object-cover" />,
  <LoopVideo key="obra" src="/media/video-2.mp4" label="Armações de estaca prontas no galpão da ARM-CORT" className="h-full w-full object-cover" />,
];
const espacos = [24, 120, 56, 160, 88];

export default function Process() {
  const raiz = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (reduz) return;
      const t = trilho.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (s) => barra.current && (barra.current.style.transform = `scaleX(${s.progress})`),
        },
      });
      return () => tween.kill();
    });
    // no celular, a barra acompanha a rolagem lateral
    const t = trilho.current!;
    const onScroll = () => {
      if (window.innerWidth >= 768 && !reduz) return;
      const max = t.scrollWidth - t.clientWidth;
      if (barra.current) barra.current.style.transform = `scaleX(${max > 0 ? t.scrollLeft / max : 0})`;
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mm.revert();
      t.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={raiz} aria-labelledby="processo-titulo" className="relative overflow-hidden bg-navy md:h-[100svh]">
      <div className="wrap flex flex-col gap-6 pt-[clamp(80px,12vh,140px)] md:pt-[calc(var(--header-h)+5vh)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="processo-titulo" className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
            Da matéria-prima à obra
          </h2>
          <p className="tnum font-display text-[15px] text-metal" aria-hidden>
            Aço → Corte → Dobra → Montagem → Obra
          </p>
        </div>
        <div className="h-[6px] w-full bg-tech" aria-hidden>
          <div ref={barra} className="h-full origin-left scale-x-0 bg-orange" />
        </div>
      </div>

      <div
        ref={trilho}
        tabIndex={0}
        role="region"
        aria-label="Etapas do processo, da matéria-prima à obra"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-16 pt-8 md:w-max md:snap-none md:gap-8 md:overflow-visible md:pb-0"
      >
        {processo.map((p, i) => (
          <article key={p.etapa} className="flex w-[72vw] shrink-0 snap-start flex-col md:w-[clamp(260px,23vw,360px)]">
            <h3 className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-white">
              <span className="tnum mr-2 text-orange">{String(i + 1).padStart(2, "0")}</span>
              {p.etapa}
            </h3>
            <p className="mt-3 text-[17px] font-medium text-white">{p.titulo}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink">{p.texto}</p>
            <div className="shrink-0" style={{ height: `clamp(16px, ${espacos[i] / 18}vh, ${espacos[i]}px)` }} aria-hidden />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-tech md:aspect-auto md:h-[44svh]">{midias[i]}</div>
          </article>
        ))}
        <div className="w-[8vw] shrink-0" aria-hidden />
      </div>
    </section>
  );
}
