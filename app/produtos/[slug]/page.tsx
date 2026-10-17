import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Products from "@/components/sections/Products";
import { produtos } from "@/lib/content";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = produtos.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.nome} em Confins e região de BH`,
    description: `${p.descricao} Medidas: ${p.medidas.join(", ")}. Vendido por ${p.unidade}.`,
    alternates: { canonical: `/produtos/${p.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = produtos.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <PageHero titulo={p.nome} texto={p.descricao} acao={false}>
        <div data-reveal>
          <Link href={`/orcamento?produto=${p.slug}`} className="btn" data-magnetic>
            Pôr no orçamento <span aria-hidden>↗</span>
          </Link>
        </div>
      </PageHero>

      <section className="wrap grid gap-10 py-[clamp(96px,14vh,180px)] md:grid-cols-12" aria-labelledby="medidas-titulo">
        <div className="md:col-span-4">
          <h2 id="medidas-titulo" className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">
            Medidas disponíveis
          </h2>
          <p className="mt-3 text-ink">Vendido por {p.unidade}.</p>
          {p.norma && <p className="mt-3 text-ink">{p.norma}</p>}
          <p className="mt-6 text-[15px] text-metal">Precisa de outra medida ou da tabela técnica completa? Fale com a nossa equipe comercial.</p>
        </div>
        <ul className="flex flex-wrap content-start gap-2 md:col-span-7 md:col-start-6" data-reveal-group>
          {p.medidas.map((m) => (
            <li key={m} data-reveal>
              <Link
                href={`/orcamento?produto=${p.slug}&medida=${encodeURIComponent(m)}`}
                className="tnum flex min-h-[72px] min-w-[112px] items-center justify-center bg-navy-2 px-5 font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white transition-colors hover:bg-orange hover:text-navy"
              >
                {m}
                {p.diametros ? <span className="ml-1 text-[0.5em]">mm</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Products titulo={false} />
    </>
  );
}
