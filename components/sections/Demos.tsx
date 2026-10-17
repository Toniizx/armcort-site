"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fmt = new Intl.NumberFormat("pt-BR");

/* 01 — Corte: a pessoa escolhe onde a lâmina corta a barra de 12 m. */
export function CorteDemo() {
  const [pos, setPos] = useState(0.38);
  const id = useId();
  const area = useRef<HTMLDivElement>(null);
  const arrastando = useRef(false);
  const mm = Math.round((pos * 12000) / 5) * 5;

  const deX = (x: number) => {
    const r = area.current!.getBoundingClientRect();
    setPos(Math.min(0.92, Math.max(0.08, (x - r.left) / r.width)));
  };

  return (
    <div className="select-none">
      <div
        ref={area}
        className="relative h-[clamp(150px,16vw,220px)] touch-pan-y"
        onPointerDown={(e) => {
          arrastando.current = true;
          deX(e.clientX);
        }}
        onPointerMove={(e) => (arrastando.current || e.pointerType === "mouse") && deX(e.clientX)}
        onPointerUp={() => (arrastando.current = false)}
        onPointerLeave={() => (arrastando.current = false)}
        data-cursor
        aria-hidden
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="absolute inset-x-0 flex items-center" style={{ top: `${8 + i * 13}%`, height: `${4 + (i % 3)}%` }}>
            <div className="h-full bg-[#c9d0dc] transition-[width] duration-300 ease-out" style={{ width: `calc(${pos * 100}% - 4px)` }} />
            <div className="h-full flex-1 translate-x-[10px] bg-[#3a4a75] transition-transform duration-300" />
          </div>
        ))}
        <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white transition-[left] duration-300 ease-out" style={{ left: `${pos * 100}%` }}>
          <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <p className="text-[15px] text-aco">
          Barra de 12 m · corte em{" "}
          <output htmlFor={id} className="tnum font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">
            {fmt.format(mm)} mm
          </output>
        </p>
        <label className="flex w-full items-center gap-3 text-[15px] text-aco md:w-[22rem]">
          <span className="shrink-0">Arraste a lâmina</span>
          <input
            id={id}
            type="range"
            min={0.08}
            max={0.92}
            step={0.005}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="w-full accent-white"
          />
        </label>
      </div>
    </div>
  );
}

/* 02 — Dobra: o vergalhão reto vira peça dobrada no ângulo escolhido. */
export function DobraDemo() {
  const [ang, setAng] = useState(90);
  const id = useId();
  const L1 = 240;
  const L2 = 200;
  const rad = (ang * Math.PI) / 180;
  const x0 = 60;
  const x1 = x0 + L1;
  const y0 = 300;
  // o segundo trecho gira em volta do pino de dobra
  const xf = x1 + Math.cos(rad) * L2;
  const yf = y0 - Math.sin(rad) * L2;
  const arco = `M ${x1 + 60} ${y0} A 60 60 0 0 0 ${x1 + Math.cos(rad) * 60} ${y0 - Math.sin(rad) * 60}`;
  return (
    <div>
      <svg viewBox="0 0 520 360" className="mx-auto max-h-[240px] w-full" role="img" aria-label={`Vergalhão dobrado a ${ang} graus`}>
        <circle cx={x1} cy={y0} r="14" fill="#1f3060" stroke="#b9c2d3" strokeWidth="2" />
        <path d={arco} fill="none" stroke="#ffffff" strokeWidth="2" />
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="#c9d1d9" strokeWidth="12" strokeLinecap="round" />
        <line
          x1={x1}
          y1={y0}
          x2={xf}
          y2={yf}
          stroke="#c9d1d9"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <text x={x1 + 72} y={y0 - 20} fill="#ffffff" fontSize="22" fontFamily="var(--font-space)" className="tnum">
          {ang}°
        </text>
      </svg>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {[45, 90, 135].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAng(a)}
            aria-pressed={ang === a}
            className={`tnum min-h-[44px] min-w-[64px] px-3 font-display text-[15px] transition-colors ${
              ang === a ? "bg-white text-azul" : "bg-azul-2 text-white hover:bg-azul"
            }`}
          >
            {a}°
          </button>
        ))}
        <label className="ml-auto flex w-full items-center gap-3 text-[15px] text-aco sm:w-60">
          <span className="sr-only">Ângulo da dobra</span>
          <input id={id} type="range" min={0} max={135} step={5} value={ang} onChange={(e) => setAng(Number(e.target.value))} className="w-full accent-white" />
        </label>
      </div>
    </div>
  );
}

/* 03 — Montagem: os estribos entram na armação conforme a rolagem. */
export function MontagemDemo() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-estribo]", {
        x: (i) => (i % 2 ? 140 : -140),
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      });
      gsap.from("[data-longa]", {
        scaleY: 0,
        transformOrigin: "50% 100%",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 45%", scrub: 0.6 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  const ys = Array.from({ length: 12 }, (_, i) => 40 + i * 42);
  return (
    <svg ref={ref} viewBox="0 0 360 560" className="mx-auto h-[280px] w-full" role="img" aria-label="Armação de pilar sendo montada com estribos e barras longitudinais">
      {[120, 150, 210, 240].map((x) => (
        <line key={x} data-longa x1={x} y1="20" x2={x} y2="540" stroke="#b9c2d3" strokeWidth="7" strokeLinecap="round" />
      ))}
      {ys.map((y) => (
        <g key={y} data-estribo>
          <rect x="108" y={y - 5} width="144" height="10" fill="none" stroke="#e3e8ed" strokeWidth="4" />
          <path d={`M108 ${y - 5} l16 -14`} stroke="#e3e8ed" strokeWidth="4" fill="none" />
        </g>
      ))}
      <g stroke="#ffffff" strokeWidth="1.5">
        <line x1="290" y1="40" x2="290" y2="82" />
        <line x1="282" y1="40" x2="298" y2="40" />
        <line x1="282" y1="82" x2="298" y2="82" />
      </g>
      <text x="304" y="66" fill="#ffffff" fontSize="15" fontFamily="var(--font-inter)">
        espaçamento
      </text>
    </svg>
  );
}

/* 04 — Sob medida: uma prancha com as peças, uma por vez. */
const pecas = [
  {
    nome: "Estribo",
    texto: "Dobrado conforme o projeto, com ganchos e medidas da sua estrutura.",
    svg: (
      <g fill="none" stroke="#e3e8ed" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 90 L370 90 L370 290 L150 290 Z" />
        <path d="M150 90 l40 40 M150 90 l-6 46" />
      </g>
    ),
  },
  {
    nome: "Pilar",
    texto: "Barras longitudinais e estribos pré-montados, prontos para a forma.",
    svg: (
      <g fill="none" strokeLinecap="round">
        {[200, 230, 290, 320].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="340" stroke="#b9c2d3" strokeWidth="8" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="188" y={58 + i * 36} width="144" height="8" stroke="#e3e8ed" strokeWidth="4" />
        ))}
      </g>
    ),
  },
  {
    nome: "Estaca",
    texto: "Armação circular com espiral soldada, produzida em máquina.",
    svg: (
      <g fill="none" strokeLinecap="round">
        {[190, 220, 260, 300, 330].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="340" stroke="#b9c2d3" strokeWidth="7" />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M180 ${50 + i * 21} Q260 ${62 + i * 21} 340 ${50 + i * 21}`} stroke="#e3e8ed" strokeWidth="3.5" />
        ))}
      </g>
    ),
  },
  {
    nome: "Tela",
    texto: "Telas eletrosoldadas nas malhas Q-92 e Q-138.",
    svg: (
      <g stroke="#e3e8ed" strokeWidth="4">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={140 + i * 30} y1="70" x2={140 + i * 30} y2="310" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="125" y1={80 + i * 28} x2="395" y2={80 + i * 28} />
        ))}
      </g>
    ),
  },
];

export function SobMedidaDemo() {
  const [i, setI] = useState(0);
  const desenho = useRef<SVGGElement>(null);
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz || !desenho.current) return;
    gsap.fromTo(desenho.current, { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" });
  }, [i]);
  return (
    <div className="grid gap-5">
      <div role="tablist" aria-label="Peças sob medida" className="flex flex-wrap gap-2">
        {pecas.map((p, k) => (
          <button
            key={p.nome}
            role="tab"
            id={`peca-${k}`}
            aria-selected={i === k}
            aria-controls="peca-painel"
            onClick={() => setI(k)}
            onMouseEnter={() => setI(k)}
            tabIndex={i === k ? 0 : -1}
            onKeyDown={(e) => {
              const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
              if (!d) return;
              e.preventDefault();
              const n = (k + d + pecas.length) % pecas.length;
              setI(n);
              document.getElementById(`peca-${n}`)?.focus();
            }}
            className={`min-h-[44px] px-4 font-display text-[16px] font-semibold uppercase tracking-[0.02em] transition-colors ${i === k ? "bg-white text-azul" : "bg-azul-2 text-white hover:bg-azul"}`}
          >
            {p.nome}
          </button>
        ))}
      </div>
      <div id="peca-painel" role="tabpanel" aria-labelledby={`peca-${i}`}>
        <svg viewBox="0 0 520 380" className="mx-auto max-h-[240px] w-full" role="img" aria-label={`Desenho técnico: ${pecas[i].nome}`}>
          <g ref={desenho}>{pecas[i].svg}</g>
        </svg>
        <p className="mt-3 text-[15px] text-aco">{pecas[i].texto}</p>
      </div>
    </div>
  );
}
