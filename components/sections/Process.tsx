"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processo } from "@/lib/content";
import LoopVideo from "@/components/ui/LoopVideo";
import { desenhos } from "@/components/three/StepDrawings";
import { asset } from "@/lib/asset";
import FotoImg from "@/components/ui/FotoImg";
import { fotos } from "@/lib/fotos";

gsap.registerPlugin(ScrollTrigger);

const midias = [
  <Image key="aco" src={asset("/media/patio.jpg")} alt="Bobinas de aço empilhadas no pátio da ARM-CORT" fill sizes="(min-width:768px) 360px, 82vw" className="object-cover object-[50%_35%]" />,
  <div key="corte" className="escuro absolute inset-0 flex items-center p-4">
    {desenhos[1]}
  </div>,
  <div key="dobra" className="escuro absolute inset-0 flex items-center p-4">
    {desenhos[2]}
  </div>,
  <LoopVideo key="montagem" src="/media/video-2.mp4" label="Armações de estaca prontas no galpão da ARM-CORT" className="absolute inset-0 h-full w-full object-cover" />,
  <FotoImg key="obra" foto={fotos.entrega} sizes="(min-width:768px) 360px, 82vw" />,
];

export default function Process() {
  const raiz = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (reduz) return;
      const t = trilho.current!;
      const dist = () => Math.max(0, t.scrollWidth - t.clientWidth);
      if (dist() < 40) return;
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
    const t = trilho.current!;
    const onScroll = () => {
      const max = t.scrollWidth - t.clientWidth;
      if (barra.current && max > 0) barra.current.style.transform = `scaleX(${t.scrollLeft / max})`;
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mm.revert();
      t.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={raiz} aria-labelledby="processo-titulo" className="relative overflow-hidden bg-white py-[clamp(72px,12vh,140px)] lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0 lg:pt-[var(--header-h)]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="rotulo">Processo</p>
            <h2 id="processo-titulo" className="titulo mt-4">
              Da matéria-prima à obra
            </h2>
          </div>
          <ol className="flex flex-wrap items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-azul" aria-label="Etapas">
            {processo.map((p, i) => (
              <li key={p.etapa} className="flex items-center gap-2">
                <span className="bg-azul-claro px-2.5 py-1">{p.etapa}</span>
                {i < processo.length - 1 && <span aria-hidden>→</span>}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 h-[3px] w-full bg-azul-claro" aria-hidden>
          <div ref={barra} className="h-full origin-left scale-x-0 bg-azul" />
        </div>
      </div>

      <div className="wrap !pr-0 lg:!pr-[var(--gutter)]">
        <div
          ref={trilho}
          tabIndex={0}
          role="region"
          aria-label="Etapas do processo, da matéria-prima à obra"
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-[var(--gutter)] lg:snap-none lg:overflow-visible lg:pr-0"
        >
          {processo.map((p, i) => (
            <article key={p.etapa} className="painel flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col sm:w-[340px] lg:w-[360px]">
              <div className="relative m-2 mb-0 aspect-[4/3] overflow-hidden bg-azul-escuro">{midias[i]}</div>
              <div className="p-5">
                <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">
                  <span className="tnum text-azul">{String(i + 1).padStart(2, "0")}</span>
                  {p.etapa}
                </p>
                <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-tight text-azul">{p.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-texto-2">{p.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
