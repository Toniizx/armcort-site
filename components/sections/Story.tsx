"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3D, usePerto } from "@/components/three/use3d";
import { desenhos } from "@/components/three/StepDrawings";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const StoryScene = dynamic(() => import("@/components/three/StoryScene"), { ssr: false });

// A barra é cortada, dobrada em estribo, repetida e montada em armação.
const etapas: { titulo: string; nota: string; detalhe?: string }[] = [
  { titulo: "Uma barra reta", detalhe: "(Início de beneficiamento)", nota: "Vergalhão CA-50, nervurado, conforme a NBR 7480/25." },
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
                {e.detalhe && <p className="mt-1 text-[15px] font-semibold text-white">{e.detalhe}</p>}
                <p className="mt-1 text-[15px] text-aco">{e.nota}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Com 3D: a cena presa à rolagem, com o painel das etapas (ao lado no computador, embaixo no celular). */
function EtapasEm3D({ leve }: { leve: boolean }) {
  const raiz = useRef<HTMLElement>(null);
  const progresso = useRef(0);
  const [ativa, setAtiva] = useState(0);
  const [noFim, setNoFim] = useState(false);
  const perto = usePerto(raiz, "150% 0px");

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: raiz.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progresso.current = self.progress;
        setNoFim(self.progress > 0.9);
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

  const atual = etapas[ativa];
  return (
    <section ref={raiz} id="solucoes" className="escuro relative h-[340vh] lg:h-[400vh]" aria-labelledby="story-titulo">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
        <div className="absolute inset-0" aria-hidden>
          {perto && <StoryScene progresso={progresso} leve={leve} />}
        </div>
        {/* computador: painel à esquerda com a lista; celular: painel compacto embaixo com a etapa atual */}
        <div className="wrap relative z-10 flex h-full flex-col justify-end pb-[calc(56px+env(safe-area-inset-bottom)+16px)] pt-[var(--header-h)] sm:pb-8 lg:justify-center lg:pb-0">
          <div className="painel w-full p-5 sm:max-w-[30rem] lg:p-8">
            <p className="rotulo">Da barra à armação</p>
            <h2 id="story-titulo" className="titulo mt-4 max-lg:sr-only">
              Como o aço ganha forma
            </h2>
            <ol className="mt-8 hidden gap-1 lg:grid">
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
            <div className="mt-4 lg:hidden" aria-live="polite">
              <p className="tnum text-[13px] font-semibold uppercase tracking-[0.12em] text-aco">
                Etapa {String(ativa + 1).padStart(2, "0")} de 06
              </p>
              <p className="mt-1 font-display text-[1.45rem] font-semibold leading-tight text-white">{atual.titulo}</p>
            </div>
            <p className="mt-2 min-h-[4.5em] text-[15px] text-aco lg:mt-6" aria-live="polite">
              {atual.detalhe && <span className="block font-semibold text-white">{atual.detalhe}</span>}
              {atual.nota}
            </p>
            <div className="mt-3 grid grid-cols-6 gap-1 lg:mt-4" aria-hidden>
              {etapas.map((e, i) => (
                <span key={e.titulo} className={`h-[3px] transition-colors duration-300 ${i <= ativa ? "bg-white" : "bg-white/15"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* aviso para rolar: muita gente não percebia que a animação anda com a rolagem */}
        <div
          className={`pointer-events-none absolute inset-x-0 z-20 flex justify-center transition-opacity duration-500 max-lg:top-[calc(var(--header-h)+14px)] lg:bottom-10 lg:left-[34rem] ${noFim ? "opacity-0" : "opacity-100"}`}
          aria-hidden={noFim}
        >
          <p className="flex items-center gap-4 bg-white px-5 py-3 text-azul shadow-[0_12px_36px_rgb(0_0_0/0.4)] lg:px-7 lg:py-5">
            <span className="aviso-rolar flex h-10 w-10 shrink-0 items-center justify-center bg-azul text-white lg:h-12 lg:w-12" aria-hidden>
              <svg viewBox="0 0 16 16" className="h-5 w-5 lg:h-6 lg:w-6">
                <path d="M8 2v11M3 8.5 8 13.5l5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[1.2rem] font-semibold lg:text-[1.5rem]">Role para baixo</span>
              <span className="block text-[14px] text-texto-2 lg:text-[15px]">e veja a barra virar armação</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Com 3D (computador e celular): a cena presa à rolagem. Sem WebGL ou com "reduzir movimento": os cartões.
export default function Story() {
  const { pronto, pode, leve } = use3D();
  // carrega a cena 3D antes de a pessoa chegar na seção
  useEffect(() => {
    if (pode) import("@/components/three/StoryScene");
  }, [pode]);
  if (!pronto || !pode) return <EtapasEmCartoes />;
  return <EtapasEm3D leve={leve} />;
}
