import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import { CorteDemo, DobraDemo, MontagemDemo, SobMedidaDemo } from "@/components/sections/Demos";
import { Check } from "@/components/sections/Services";
import { servicos } from "@/lib/content";
import FotoImg from "@/components/ui/FotoImg";
import { fotoDoServico } from "@/lib/fotos";

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = servicos.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.nome} em Confins, MG`,
    description: `${s.resumo} ARM-CORT, Confins, MG.`,
    alternates: { canonical: `/solucoes/${s.slug}` },
  };
}

const demos = { corte: CorteDemo, dobra: DobraDemo, montagem: MontagemDemo, "sob-medida": SobMedidaDemo };

const pedido = [
  { titulo: "Você envia o projeto", texto: "Projeto, croqui ou lista de peças, com o cronograma da obra." },
  { titulo: "A engenharia confere", texto: "Conferência de projetos e formas e o melhor aproveitamento do aço." },
  { titulo: "A produção é programada", texto: "Pelo andamento da obra, para não sobrar aço no canteiro." },
  { titulo: "Entrega no dia certo", texto: "Frota própria, peças identificadas e romaneio detalhado." },
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = servicos.find((x) => x.slug === slug);
  if (!s) notFound();
  const Demo = demos[s.slug];
  const outros = servicos.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero titulo={s.nome} numero={s.numero} rotulo="Soluções" texto={s.resumo} acao={false}>
        <div data-reveal>
          <Link href={`/orcamento?servico=${s.slug}`} className="btn w-full" data-magnetic>
            Orçar {s.nome.toLowerCase()} <span aria-hidden>↗</span>
          </Link>
        </div>
      </PageHero>

      <section className="bg-white py-[clamp(72px,12vh,140px)]">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal-group>
            <p data-reveal className="rotulo">
              Como funciona
            </p>
            <h2 data-split className="titulo mt-4">
              {s.titulo}
            </h2>
            <p data-reveal className="mt-6 text-[1.0625rem] leading-relaxed text-texto-2">
              {s.texto}
            </p>
          </div>
          <div className="painel lg:col-span-7">
            <div className="flex items-center justify-between border-b border-linha px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-azul">
              <span>Experimente</span>
              <span className="tnum text-cinza">{s.numero}</span>
            </div>
            <div className="escuro p-5 md:p-6">
              <Demo />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cinza-claro py-[clamp(72px,12vh,140px)]">
        <figure className="wrap mb-5">
          <div className="painel p-2">
            <div className="relative aspect-[16/9] md:aspect-[21/8]">
              <FotoImg foto={fotoDoServico[s.slug]} sizes="100vw" />
            </div>
          </div>
        </figure>
        <div className="wrap grid gap-5 lg:grid-cols-2">
          <div className="painel p-6 md:p-8" data-reveal-group>
            <h2 data-reveal className="font-display text-[1.6rem] font-semibold text-azul">
              O que está incluído
            </h2>
            <ul className="mt-6 grid gap-3">
              {s.inclui.map((item) => (
                <li key={item} data-reveal className="flex gap-3 border-b border-linha pb-3 text-[1.0625rem] text-texto last:border-0">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {s.pecas ? (
            <div className="painel p-6 md:p-8" data-reveal-group>
              <h2 data-reveal className="font-display text-[1.6rem] font-semibold text-azul">
                Peças que produzimos
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {s.pecas.map((p) => (
                  <li key={p} data-reveal className="bg-azul-claro px-4 py-3 font-medium text-azul">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="escuro painel flex flex-col justify-between gap-6 p-6 md:p-8">
              <h2 className="font-display text-[1.6rem] font-semibold text-white">Tem o projeto em mãos?</h2>
              <p className="text-aco">Envie o projeto, o croqui ou a lista de peças. A nossa engenharia confere e a equipe comercial responde com o orçamento.</p>
              <Link href={`/orcamento?servico=${s.slug}`} className="btn self-start">
                Enviar projeto <span aria-hidden>↗</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,12vh,140px)]" aria-labelledby="pedido-titulo">
        <div className="wrap">
          <p className="rotulo">Passo a passo</p>
          <h2 id="pedido-titulo" data-split className="titulo mt-4">
            Como funciona o pedido
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {pedido.map((p, i) => (
              <li key={p.titulo} data-reveal className="painel p-6">
                <p className="tnum font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-azul">{i + 1}</p>
                <p className="mt-4 font-display text-[1.2rem] font-semibold text-texto">{p.titulo}</p>
                <p className="mt-2 text-[15px] text-texto-2">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav aria-label="Outras soluções" className="border-t border-linha bg-cinza-claro">
        <div className="wrap grid gap-3 py-12 md:grid-cols-3">
          {outros.map((o) => (
            <Link key={o.slug} href={`/solucoes/${o.slug}`} className="painel group flex items-center justify-between p-5 transition-colors hover:bg-azul-claro">
              <span className="font-display text-[1.25rem] font-semibold text-azul">
                <span className="tnum mr-2 text-cinza">{o.numero}</span>
                {o.nome}
              </span>
              <span aria-hidden className="text-azul transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <FinalCTA />
    </>
  );
}
