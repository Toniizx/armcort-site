import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import FinalCTA from "@/components/sections/FinalCTA";
import { servicos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Soluções em aço: corte, dobra, montagem e sob medida",
  description:
    "Corte e dobra de vergalhões, montagem de armações e produção sob medida em Confins, MG. Vergalhões CA-50 e CA-60, telas eletrosoldadas, arames e pregos.",
  alternates: { canonical: "/solucoes" },
};

export default function Page() {
  return (
    <>
      <PageHero
        titulo="Soluções em aço"
        rotulo="Corte, dobra e montagem"
        texto="Do vergalhão reto à armação pronta: escolha o quanto do trabalho a ARM-CORT faz por você."
        acao={false}
      >
        <ul data-reveal className="grid gap-1 text-[16px]">
          {servicos.map((s) => (
            <li key={s.slug}>
              <Link href={`/solucoes/${s.slug}`} className="flex items-center justify-between border-b border-linha py-2 font-medium text-azul hover:text-azul-escuro">
                <span>
                  <span className="tnum mr-2 text-cinza">{s.numero}</span>
                  {s.nome}
                </span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/orcamento" className="btn w-full">
          Solicitar orçamento <span aria-hidden>↗</span>
        </Link>
      </PageHero>
      <Services />
      <Process />
      <Products />
      <FinalCTA />
    </>
  );
}
