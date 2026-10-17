"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3D, usePerto } from "@/components/three/use3d";
import { desenhos } from "@/components/three/StepDrawings";

gsap.registerPlugin(ScrollTrigger);

const StoryScene = dynamic(() => import("@/components/three/StoryScene"), { ssr: false });

// A barra é cortada, dobrada em estribo, repetida e montada em armação.
const etapas = [
  { titulo: "Uma barra reta", nota: "Vergalhão CA-50, nervurado, conforme a NBR 7480." },
  { titulo: "Cortada na medida do projeto", nota: "Projeto e formas conferidos pela nossa engenharia." },
  { titulo: "Dobrada em estribo", nota: "Medidas e norma de dobramento respeitadas." },
  { titulo: "Repetida com precisão", nota: "Cada peça sai identificada com etiqueta." },
  { titulo: "Montada em armação", nota: "Pré-montada, pronta para a forma." },
  { titulo: "Pronta para a sua obra", nota: "Entregue pela frota própria, conforme o cronograma." },
];
const marcos = [0, 0.16, 0.3, 0.6, 0.8, 0.95];

function Cabecalho() {
  return (
    <>
      <p className="rotulo">Da barra à armação</p>
      <h2 id="story-titulo" className="titulo mt-4">
        Como o aço ganha forma
      </h2>
    </>
  );
}

/* Celular, ou sem 3D: as etapas em cartões, cada um com o seu desenho técnico. */
function EtapasEmCartoes() {
  return (
    <section id="solucoes" className="escuro relative py-[clamp(72px,12vh,140px)]" aria-labelledby="story-titulo">
      <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative">
        <Cabecalho />
        <p className="mt-4 text-[15px] text-aco md:hidden">Deslize para ver as 6 etapas →</p>
        <ol className="-mr-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 pr-[var(--gutter)] md:mr-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pr-0 lg:grid-cols-3" data-reveal-group aria-label="Etapas: deslize para o lado">
          {etapas.map((e, i) => (
            <li key={e.titulo} data-reveal className="painel w-[80vw] max-w-[340px] shrink-0 snap-start overflow-hidden md:w-auto md:max-w-none">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-aco">
                <span>Etapa</span>
                <span className="tnum text-white">
                  {String(i + 1).padStart(2, "0")}/06
                </span>
              </div>
              <div className="aspect-[2/1] px-4">{desenhos[i]}</div>
              <div className="px-5 pb-5">
                <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{e.titulo}</h3>
                <p className="mt-1 text-[15px] text-aco">{e.nota}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Computador com 3D: a cena presa à rolagem, com o painel das etapas ao lado. */
function EtapasEm3D({ leve }: { leve: boolean }) {
  const raiz = useRef<HTMLElement>(null);
  const progresso = useRef(0);
  const [ativa, setAtiva] = useState(0);
  const perto = usePerto(raiz);

  useEffect(() => {
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
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(r);
      st.kill();
    };
  }, []);

  return (
    <section ref={raiz} id="solucoes" className="escuro relative h-[400vh]" aria-labelledby="story-titulo">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
        <div className="absolute inset-0" aria-hidden>
          {perto && <StoryScene progresso={progresso} leve={leve} />}
        </div>
        <div className="wrap relative z-10 flex h-full items-center pt-[var(--header-h)]">
          <div className="painel w-full max-w-[30rem] p-6 lg:p-8">
            <Cabecalho />
            <ol className="mt-8 grid gap-1">
              {etapas.map((e, i) => (
                <li
                  key={e.titulo}
                  className={`flex items-center gap-4 px-3 py-2.5 transition-colors duration-300 ${i === ativa ? "bg-white text-azul" : "text-aco"}`}
                >
                  <span className={`tnum w-7 text-[14px] font-semibold ${i === ativa ? "text-azul" : "text-aco"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[1.15rem] font-medium">{e.titulo}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 min-h-[3em] text-[15px] text-aco" aria-live="polite">
              {etapas[ativa].nota}
            </p>
            <div className="mt-4 h-[3px] w-full bg-white/15" aria-hidden>
              <div className="h-full bg-white transition-[width] duration-300" style={{ width: `${((ativa + 1) / etapas.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Story() {
  const { pronto, pode, leve } = use3D();
  const [celular, setCelular] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const ver = () => setCelular(mq.matches);
    ver();
    mq.addEventListener("change", ver);
    return () => mq.removeEventListener("change", ver);
  }, []);

  if (!pronto || celular || !pode) return <EtapasEmCartoes />;
  return <EtapasEm3D leve={leve} />;
}
