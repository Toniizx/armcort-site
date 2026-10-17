import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ObrasShowcase from "@/components/sections/ObrasShowcase";
import Industry from "@/components/sections/Industry";
import FinalCTA from "@/components/sections/FinalCTA";
import { obrasPublicadas } from "@/lib/obras";

export const metadata: Metadata = {
  title: "Obras",
  description: "Obras e empreendimentos que contam com o aço cortado, dobrado e montado pela ARM-CORT.",
  alternates: { canonical: "/obras" },
};

export default function Page() {
  const obras = obrasPublicadas();

  if (obras.length === 0) {
    // Nenhuma obra comprovada e autorizada ainda: nada é afirmado; a fábrica ocupa o lugar.
    return (
      <>
        <PageHero
          titulo="Grandes estruturas. Grandes histórias."
          texto="Estamos reunindo as obras atendidas pela ARM-CORT, com fotos e informações confirmadas. Enquanto isso, conheça de onde sai o aço da sua obra."
        />
        <Industry titulo="Da nossa indústria para a sua obra." />
        <FinalCTA />
      </>
    );
  }

  return (
    <>
      <PageHero titulo="Grandes estruturas. Grandes histórias." texto="Conheça projetos que contam com a força do aço e a precisão das soluções ARM-CORT." acao={false} />
      <ObrasShowcase obras={obras} />
      <section className="wrap py-[clamp(96px,14vh,180px)]" aria-labelledby="lista-obras">
        <h2 id="lista-obras" className="text-[17px] text-metal">
          Todas as obras
        </h2>
        <ul className="mt-6">
          {obras.map((o, i) => (
            <li key={o.slug}>
              <Link href={`/obras/${o.slug}`} className="group grid gap-2 py-4 md:grid-cols-[6rem_1fr_auto] md:items-baseline">
                <span className="tnum font-display text-[15px] text-orange">{String(i + 1).padStart(3, "0")}</span>
                <span className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white transition-colors group-hover:text-orange">{o.nome}</span>
                <span className="text-ink">
                  {o.cidade}/{o.uf}
                  {o.ano ? ` · ${o.ano}` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCTA />
    </>
  );
}
