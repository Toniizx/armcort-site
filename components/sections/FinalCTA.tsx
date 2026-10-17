"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { use3D, usePerto } from "@/components/three/use3d";
import { desenhos } from "@/components/three/StepDrawings";
import Logo from "@/components/layout/Logo";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { pronto, pode, leve } = use3D();
  const perto = usePerto(ref, "20% 0px");
  const [grande, setGrande] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const ver = () => setGrande(mq.matches);
    ver();
    mq.addEventListener("change", ver);
    return () => mq.removeEventListener("change", ver);
  }, []);

  return (
    <section ref={ref} aria-labelledby="final-titulo" className="escuro relative overflow-hidden">
      <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative grid gap-10 py-[clamp(72px,12vh,140px)] lg:min-h-[90svh] lg:grid-cols-12 lg:items-center">
        <div data-final-canvas className="relative h-[32svh] lg:col-span-5 lg:h-[70svh]" aria-hidden={grande}>
          {grande && pronto && pode && perto ? (
            <HeroScene leve={leve} variante="final" />
          ) : (
            <div className="painel flex h-full items-center p-4">{desenhos[4]}</div>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal-group>
          <Logo variante="branca" className="w-[150px]" />
          <h2 id="final-titulo" data-split className="mt-8 font-display text-[clamp(2.2rem,4.8vw,4.75rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white">
            Seu projeto começa com uma estrutura forte.
          </h2>
          <p data-reveal className="mt-6 max-w-[44ch] text-[1.125rem] text-aco">
            Conte com a ARM-CORT para o corte, a dobra e a montagem de aço para sua obra.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/orcamento" className="btn !min-h-[60px] !px-8" data-magnetic>
              Solicitar orçamento <span aria-hidden>↗</span>
            </Link>
            <a href={site.telefoneLink} className="btn btn-contorno !min-h-[60px]">
              {site.telefone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
