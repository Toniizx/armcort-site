"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { use3D, usePerto } from "@/components/three/use3d";
import CageDrawing from "@/components/three/CageDrawing";
import Wordmark from "@/components/layout/Wordmark";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  const { pronto, pode, leve } = use3D();
  const raiz = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(true);
  const perto = usePerto(raiz, "0px");

  // Abertura: a assinatura aparece, o corte laranja atravessa e a página se abre.
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visto = false;
    try {
      visto = sessionStorage.getItem("armcort-intro") === "1";
      sessionStorage.setItem("armcort-intro", "1");
    } catch {}
    const el = raiz.current!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (!reduz && !visto) {
        tl.from("[data-intro-mark]", { yPercent: 120, duration: 0.9, ease: "expo.out" })
          .from("[data-intro-cut]", { scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "expo.inOut" }, 0.3)
          .to("[data-intro]", { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, 1.2)
          .add(() => setIntro(false));
      } else {
        tl.set("[data-intro]", { autoAlpha: 0 }).add(() => setIntro(false));
      }
      if (!reduz) {
        tl.from("[data-hero-line]", { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.1 }, visto ? 0.1 : 1.45)
          .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, "-=0.8")
          .from("[data-hero-cota]", { scaleX: 0, duration: 1.3, ease: "expo.inOut", stagger: 0.1 }, "-=1");
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={raiz} className="relative min-h-[100svh] overflow-hidden bg-navy" aria-labelledby="hero-titulo">
      {/* abertura */}
      {intro && (
        <div data-intro className="fixed inset-0 z-[95] flex items-center justify-center bg-navy" style={{ clipPath: "inset(0% 0% 0% 0%)" }} aria-hidden>
          <div className="overflow-hidden">
            <div data-intro-mark className="relative">
              <Wordmark className="!text-[clamp(2rem,6vw,4.5rem)] text-white" />
              <span data-intro-cut className="absolute -bottom-4 left-0 h-[3px] w-full bg-orange" />
            </div>
          </div>
        </div>
      )}

      <div className="grade pointer-events-none absolute inset-0" aria-hidden />

      {/* o aço, como peça exposta */}
      <div className="absolute inset-x-0 top-[calc(var(--header-h)-8px)] h-[52svh] md:inset-x-auto md:inset-y-0 md:right-0 md:top-0 md:h-auto md:w-[62%]" aria-hidden>
        {pronto && pode ? (
          perto && <HeroScene leve={leve} />
        ) : (
          <div className="flex h-full items-center justify-center pt-16">
            <CageDrawing className="h-[62%] w-auto opacity-90" />
          </div>
        )}
      </div>

      {/* marcações técnicas */}
      <div className="pointer-events-none absolute right-[var(--gutter)] top-[calc(var(--header-h)+3vh)] hidden w-[18rem] text-[13px] text-metal md:block" aria-hidden>
        <div data-hero-cota className="cota mb-2 text-metal/60" />
        <div className="flex justify-between tnum">
          <span>Estaca soldada</span>
          <span>Armação em espiral</span>
        </div>
      </div>

      <div className="wrap relative z-10 flex min-h-[100svh] flex-col justify-end pb-[calc(56px+6vh)] pt-[calc(var(--header-h)+8vh)] sm:pb-[8vh]">
        <h1 id="hero-titulo" className="font-display text-[clamp(2.9rem,8.4vw,10.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.045em] text-white">
          <span className="-mt-[0.14em] block overflow-hidden pb-[0.04em] pt-[0.14em]">
            <span data-hero-line className="block">
              Aço que dá
            </span>
          </span>
          <span className="-mt-[0.14em] block overflow-hidden pb-[0.04em] pt-[0.14em]">
            <span data-hero-line className="block">
              forma ao
            </span>
          </span>
          <span className="-mt-[0.14em] block overflow-hidden pb-[0.04em] pt-[0.14em]">
            <span data-hero-line className="block">
              futuro<span className="text-orange">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="max-w-[34ch] text-[clamp(1.05rem,1.35vw,1.3rem)] leading-snug text-ink md:col-span-5">
            Corte, dobra e montagem de aço com precisão para transformar projetos em estruturas reais.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-x-6 gap-y-2 md:col-span-7 md:justify-end">
            <Link href="/orcamento" className="btn" data-magnetic>
              Solicitar orçamento <span aria-hidden>↗</span>
            </Link>
            <a href="#solucoes" className="btn-ghost link-line">
              Explorar soluções <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <div data-hero-fade className="mt-10 hidden items-center gap-4 text-[13px] text-metal md:flex" aria-hidden>
          <span className="relative block h-10 w-px overflow-hidden bg-metal/30">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[desce_1.8s_ease-in-out_infinite] bg-orange" />
          </span>
          Role para ver o aço ganhar forma
        </div>
      </div>
      <style>{`@keyframes desce{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
