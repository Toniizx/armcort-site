import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Services from "@/components/sections/Services";
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
      <PageHero titulo="Soluções em aço" texto="Do vergalhão reto à armação pronta: escolha o quanto do trabalho a ARM-CORT faz por você.">
        <ul data-reveal className="flex flex-col text-[17px]">
          {servicos.map((s) => (
            <li key={s.slug}>
              <Link href={`/solucoes/${s.slug}`} className="link-line text-white">
                <span className="tnum mr-2 text-orange">{s.numero}</span>
                {s.nome}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>
      <Services />
      <Products />
      <FinalCTA />
    </>
  );
}
