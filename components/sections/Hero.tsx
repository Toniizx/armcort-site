"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { use3D, usePerto } from "@/components/three/use3d";
import Logo from "@/components/layout/Logo";
import { asset } from "@/lib/asset";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const ficha = [
  { valor: "12.000 m²", texto: "de terreno em Confins, MG" },
  { valor: "3 pórticos", texto: "e maquinário próprio" },
  { valor: "Frota própria", texto: "entrega programada pela obra" },
];

export default function Hero() {
  const { pronto, pode, leve } = use3D();
  const raiz = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(true);
  const perto = usePerto(raiz, "0px");
  const [celular, setCelular] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const ver = () => setCelular(mq.matches);
    ver();
    mq.addEventListener("change", ver);
    return () => mq.removeEventListener("change", ver);
  }, []);

  // Abertura: a logo aparece sobre o branco, uma barra azul atravessa e a página se abre.
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visto = false;
    try {
      visto = sessionStorage.getItem("armcort-intro") === "1";
      sessionStorage.setItem("armcort-intro", "1");
    } catch {}
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (!reduz && !visto) {
        tl.from("[data-intro-logo]", { y: 30, opacity: 0, duration: 0.8, ease: "expo.out" })
          .from("[data-intro-bar]", { scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "expo.inOut" }, 0.35)
          .to("[data-intro]", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, 1.25)
          .add(() => setIntro(false));
      } else {
        tl.set("[data-intro]", { autoAlpha: 0 }).add(() => setIntro(false));
      }
      if (!reduz) {
        tl.from("[data-hero-line]", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09 }, visto ? 0.1 : 1.4)
          .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.75");
      }
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={raiz} className="escuro relative overflow-hidden" aria-labelledby="hero-titulo">
      {intro && (
        <div data-intro className="fixed inset-0 z-[95] flex items-center justify-center bg-white" style={{ clipPath: "inset(0% 0% 0% 0%)" }} aria-hidden>
          <div className="flex flex-col items-center gap-6">
            <div data-intro-logo>
              <Logo className="w-[min(70vw,360px)]" />
            </div>
            <span data-intro-bar className="block h-[3px] w-[min(70vw,360px)] bg-azul" />
          </div>
        </div>
      )}

      {/* fundo: 3D no computador, a máquina real no celular */}
      <div className="absolute inset-0" aria-hidden>
        {celular ? (
          <>
            <video
              src={asset("/media/video-1.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_36_71/0.55)_0%,rgb(23_36_71/0.7)_45%,rgb(23_36_71/0.96)_78%)]" />
          </>
        ) : (
          <>
            <div className="grade-escura absolute inset-0" />
            <div className="absolute inset-y-0 right-0 w-[60%]">{pronto && pode && perto ? <HeroScene leve={leve} /> : null}</div>
          </>
        )}
      </div>

      <div className="wrap relative z-10 flex min-h-[100svh] flex-col justify-end pb-[calc(56px+5vh)] pt-[calc(var(--header-h)+6vh)] md:pb-12">
        <p data-hero-fade className="rotulo mb-6">
          Corte · Dobra · Montagem de aço
        </p>
        <h1 id="hero-titulo" className="font-display text-[clamp(2.6rem,7.2vw,8.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-white md:max-w-[62%]">
          {["Aço que dá", "forma ao", "futuro."].map((l) => (
            <span key={l} className="-mt-[0.14em] block overflow-hidden pb-[0.04em] pt-[0.14em]">
              <span data-hero-line className="block">
                {l}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-fade className="mt-6 max-w-[40ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-snug text-aco md:mt-8">
          Corte, dobra e montagem de aço com precisão para transformar projetos em estruturas reais.
        </p>
        <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/orcamento" className="btn" data-magnetic>
            Solicitar orçamento <span aria-hidden>↗</span>
          </Link>
          <a href="#solucoes" className="btn btn-contorno">
            Explorar soluções <span aria-hidden>↓</span>
          </a>
        </div>

        {/* ficha técnica com números do site */}
        <dl data-hero-fade className="mt-12 grid grid-cols-3 border-t border-white/15 md:mt-16 md:max-w-[62%]">
          {ficha.map((f, i) => (
            <div key={f.valor} className={`py-4 pr-3 ${i > 0 ? "border-l border-white/15 pl-3 md:pl-6" : ""}`}>
              <dt className="font-display text-[clamp(1rem,1.8vw,1.6rem)] font-semibold leading-tight text-white">{f.valor}</dt>
              <dd className="mt-1 text-[13px] leading-snug text-aco md:text-[14px]">{f.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
