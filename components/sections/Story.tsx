"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3D, usePerto } from "@/components/three/use3d";
import CageDrawing from "@/components/three/CageDrawing";

gsap.registerPlugin(ScrollTrigger);

const StoryScene = dynamic(() => import("@/components/three/StoryScene"), { ssr: false });

// Seção presa à rolagem: a barra é cortada, dobrada em estribo, repetida e montada em armação.
const frases = [
  { texto: "Uma barra reta.", nota: "Vergalhão CA-50, nervurado." },
  { texto: "Cortada na medida do projeto.", nota: "Projeto e formas conferidos pela engenharia." },
  { texto: "Dobrada em estribo.", nota: "Medidas e norma de dobramento respeitadas." },
  { texto: "Repetida com precisão.", nota: "Cada peça sai identificada com etiqueta." },
  { texto: "Montada em armação.", nota: "Pré-montada, pronta para a forma." },
  { texto: "Pronta para a sua obra.", nota: "Entregue conforme o cronograma." },
];
const marcos = [0, 0.16, 0.3, 0.6, 0.8, 0.95];

export default function Story() {
  const raiz = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const progresso = useRef(0);
  const [ativa, setAtiva] = useState(0);
  const { pronto, pode, leve } = use3D();
  const perto = usePerto(raiz);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) {
      progresso.current = 1;
      setAtiva(frases.length - 1);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: raiz.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progresso.current = self.progress;
        let i = 0;
        marcos.forEach((m, k) => {
          if (self.progress >= m) i = k;
        });
        setAtiva(i);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={raiz} id="solucoes" className="relative h-[420vh] bg-navy" aria-labelledby="story-titulo">
      <div ref={palco} className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="grade pointer-events-none absolute inset-0" aria-hidden />
        <div className="absolute inset-0" aria-hidden>
          {pronto && pode && perto ? (
            <StoryScene progresso={progresso} leve={leve} />
          ) : pronto && !pode ? (
            <div className="flex h-full items-center justify-center md:justify-end md:pr-[12vw]">
              <CageDrawing className="h-[58%] w-auto" />
            </div>
          ) : null}
        </div>

        <div className="wrap relative z-10 flex h-full flex-col justify-end pb-[calc(56px+5vh)] md:justify-center md:pb-0">
          <h2 id="story-titulo" className="sr-only">
            Da barra reta à armação pronta
          </h2>
          <ol className="flex flex-col gap-1 md:max-w-[36rem]">
            {frases.map((f, i) => (
              <li key={f.texto} className="relative">
                <p
                  className={`font-display text-[clamp(1.35rem,2.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em] transition-colors duration-500 ${
                    i === ativa ? "text-white" : "text-metal"
                  } ${i > ativa ? "max-md:hidden" : ""} ${i < ativa - 1 ? "max-md:hidden" : ""}`}
                >
                  <span className={`mr-3 inline-block h-[0.12em] align-middle transition-[width,background-color] duration-500 ${i === ativa ? "w-[1.2em] bg-orange" : "w-0 bg-transparent"}`} />
                  {f.texto}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 min-h-[1.6em] text-[15px] text-ink md:mt-8" aria-live="polite">
            <span className="text-orange">{String(ativa + 1).padStart(2, "0")}/06 </span>
            {frases[ativa].nota}
          </p>
          <div className="mt-6 h-[3px] w-full max-w-[36rem] bg-tech" aria-hidden>
            <div className="h-full bg-orange transition-[width] duration-300" style={{ width: `${((ativa + 1) / frases.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
