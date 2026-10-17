"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Obra } from "@/lib/obras";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

const rotulos: Record<string, string> = {
  fornecimento: "Fornecimento de aço",
  corte: "Corte",
  dobra: "Dobra",
  "pre-montagem": "Pré-montagem",
  montagem: "Montagem de armações",
};

// Vitrine das obras: cada obra ocupa a tela; a rolagem passa de uma para a outra na horizontal, com máscara.
// Só recebe obras publicadas (ver lib/obras.ts).
export default function ObrasShowcase({ obras }: { obras: Obra[] }) {
  const raiz = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz || obras.length < 2) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-obra]", trilho.current);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: raiz.current, start: "top top", end: () => `+=${window.innerHeight * (slides.length - 1) * 1.1}`, pin: true, scrub: 0.8 },
      });
      slides.forEach((s, i) => {
        if (i === 0) return;
        tl.fromTo(s, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, i - 1);
        tl.fromTo(s.querySelector("img"), { scale: 1.25, xPercent: 10 }, { scale: 1, xPercent: 0, ease: "none" }, i - 1);
        tl.to(slides[i - 1].querySelector("img"), { xPercent: -12, ease: "none" }, i - 1);
      });
    });
    return () => mm.revert();
  }, [obras.length]);

  return (
    <section ref={raiz} aria-labelledby="obras-titulo" className="relative bg-navy">
      <div className="wrap absolute inset-x-0 top-0 z-20 grid gap-4 pt-[calc(var(--header-h)+3vh)] md:grid-cols-12">
        <h2 id="obras-titulo" className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em] text-white md:col-span-5">
          Grandes estruturas.
          <br />
          Grandes histórias.
        </h2>
        <p className="max-w-[40ch] text-[15px] text-white md:col-span-4 md:col-start-9">
          Conheça projetos que contam com a força do aço e a precisão das soluções ARM-CORT.
        </p>
      </div>
      <div ref={trilho} className="relative md:h-[100svh]">
        {obras.map((o, i) => {
          const capa = o.fotos[0];
          return (
            <article
              key={o.slug}
              data-obra
              className={`relative h-[100svh] overflow-hidden ${i > 0 ? "md:absolute md:inset-0" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <Image src={asset(capa.arquivo)} alt={capa.alt} fill sizes="100vw" className="object-cover brightness-[0.75]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(transparent,rgb(7_26_48/0.9))]" aria-hidden />
              <div className="wrap absolute inset-x-0 bottom-0 grid gap-6 pb-[calc(56px+5vh)] md:grid-cols-12 md:pb-[6vh]">
                <p className="tnum font-display text-[15px] text-orange md:col-span-12">{String(i + 1).padStart(3, "0")}</p>
                <h3 className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white md:col-span-8">
                  {o.nome}
                </h3>
                <div className="text-[15px] text-white md:col-span-4 md:self-end">
                  <p>
                    {o.cidade}/{o.uf} · {o.cliente}
                  </p>
                  <p className="text-ink">{o.participacao.map((p) => rotulos[p]).join(", ")}</p>
                  <Link href={`/obras/${o.slug}`} className="btn mt-4">
                    Ver a obra <span aria-hidden>↗</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
