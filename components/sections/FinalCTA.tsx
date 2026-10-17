"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { use3D, usePerto } from "@/components/three/use3d";
import CageDrawing from "@/components/three/CageDrawing";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { pronto, pode, leve } = use3D();
  const perto = usePerto(ref, "20% 0px");
  return (
    <section ref={ref} aria-labelledby="final-titulo" className="relative overflow-hidden bg-navy">
      <div className="grade pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative grid min-h-[100svh] md:grid-cols-2">
        <div data-final-canvas className="relative h-[60svh] md:h-auto" aria-hidden>
          {pronto && pode && perto ? (
            <HeroScene leve={leve} variante="final" />
          ) : pronto && !pode ? (
            <div className="flex h-full items-center justify-center">
              <CageDrawing className="h-[70%] w-auto" />
            </div>
          ) : null}
        </div>
        <div className="wrap relative flex flex-col justify-end pb-[calc(56px+8vh)] md:pb-[12vh]" data-reveal-group>
          <h2 id="final-titulo" data-split className="font-display text-[clamp(2.2rem,5vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
            Seu projeto começa com uma estrutura forte.
          </h2>
          <p data-reveal className="mt-8 max-w-[40ch] text-[17px] text-ink">
            Conte com a ARM-CORT para o corte, a dobra e a montagem de aço para sua obra.
          </p>
          <div data-reveal className="mt-10">
            <Link href="/orcamento" className="btn !min-h-[64px] !px-8 !text-[1.05rem]" data-magnetic>
              Solicitar orçamento <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
