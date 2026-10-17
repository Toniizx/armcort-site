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
      <PageHero titulo={p.nome} rotulo="Produtos" texto={p.descricao} acao={false}>
        <div data-reveal>
          <Link href={`/orcamento?produto=${p.slug}`} className="btn w-full" data-magnetic>
            Pôr no orçamento <span aria-hidden>↗</span>
          </Link>
        </div>
      </PageHero>

      <section className="bg-white py-[clamp(72px,12vh,140px)]" aria-labelledby="medidas-titulo">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <div className="painel p-6 lg:col-span-4">
            <h2 id="medidas-titulo" className="font-display text-[1.6rem] font-semibold text-azul">
              Medidas disponíveis
            </h2>
            <dl className="mt-6 grid gap-3 text-[15px]">
              <div className="flex justify-between border-b border-linha pb-3">
                <dt className="text-texto-2">Venda por</dt>
                <dd className="font-semibold text-texto">{p.unidade}</dd>
              </div>
              {p.norma && (
                <div className="border-b border-linha pb-3">
                  <dt className="text-texto-2">Norma</dt>
                  <dd className="mt-1 text-texto">{p.norma}</dd>
                </div>
              )}
            </dl>
            <p className="mt-6 text-[15px] text-texto-2">Precisa de outra medida ou da tabela técnica completa? Fale com a nossa equipe comercial.</p>
          </div>
          <ul className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4" data-reveal-group>
            {p.medidas.map((m) => (
              <li key={m} data-reveal>
                <Link
                  href={`/orcamento?produto=${p.slug}&medida=${encodeURIComponent(m)}`}
                  className="painel group flex min-h-[110px] flex-col justify-between p-4 transition-colors hover:bg-azul hover:text-white"
                >
                  <span className="tnum font-display text-[2rem] font-semibold leading-none text-azul group-hover:text-white">
                    {m}
                    {p.diametros ? <span className="ml-1 text-[0.5em]">mm</span> : null}
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-cinza group-hover:text-white">Pôr no orçamento ↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Products titulo={false} />
    </>
  );
}
