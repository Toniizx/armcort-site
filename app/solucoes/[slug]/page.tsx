import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import { CorteDemo, DobraDemo, MontagemDemo, SobMedidaDemo } from "@/components/sections/Demos";
import { servicos } from "@/lib/content";

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
      <PageHero titulo={s.nome} numero={s.numero} texto={s.resumo} acao={false}>
        <div data-reveal>
          <Link href={`/orcamento?servico=${s.slug}`} className="btn" data-magnetic>
            Pedir orçamento de {s.nome.toLowerCase()} <span aria-hidden>↗</span>
          </Link>
        </div>
      </PageHero>

      <section className="wrap grid gap-12 py-[clamp(96px,14vh,180px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 data-split className="font-display text-[clamp(2.2rem,5vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
            {s.titulo}
          </h2>
          <p className="mt-8 max-w-[52ch] text-ink">{s.texto}</p>
        </div>
        <ul className="md:col-span-6 md:col-start-7" data-reveal-group>
          {s.inclui.map((item) => (
            <li key={item} data-reveal className="flex items-baseline gap-4 py-3 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] leading-tight text-white">
              <span aria-hidden className="block h-[3px] w-6 shrink-0 translate-y-[-0.3em] bg-orange" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-tech" aria-label="Veja como funciona">
        <div className="wrap py-[clamp(80px,12vh,160px)]">
          <Demo />
        </div>
      </section>

      {s.pecas && (
        <section className="wrap py-[clamp(96px,14vh,180px)]" aria-labelledby="pecas-titulo">
          <h2 id="pecas-titulo" className="text-[17px] text-metal">
            Peças que produzimos
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-[0.5em] font-display text-[clamp(2rem,4.6vw,4.8rem)] font-semibold uppercase leading-[1] tracking-[-0.04em] text-white">
            {s.pecas.map((p, i) => (
              <li key={p}>
                {p}
                {i < s.pecas!.length - 1 && <span className="text-orange">/</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section data-theme="light" className="bg-paper text-navy" aria-labelledby="pedido-titulo">
        <div className="wrap py-[clamp(96px,14vh,180px)]">
          <h2 id="pedido-titulo" data-split className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">
            Como funciona o pedido
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-4" data-reveal-group>
            {pedido.map((p, i) => (
              <li key={p.titulo} data-reveal>
                <p className="tnum font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-[#c2410c]">{i + 1}</p>
                <p className="mt-4 font-display text-[clamp(1.25rem,1.6vw,1.5rem)] font-medium">{p.titulo}</p>
                <p className="mt-2 text-muted-dark">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav aria-label="Outras soluções" className="wrap grid gap-2 py-16 md:grid-cols-3">
        {outros.map((o) => (
          <Link key={o.slug} href={`/solucoes/${o.slug}`} className="group flex items-baseline justify-between bg-navy-2 p-6 transition-colors hover:bg-tech">
            <span className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] text-white">
              <span className="tnum mr-2 text-orange">{o.numero}</span>
              {o.nome}
            </span>
            <span aria-hidden className="text-orange transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
      </nav>

      <FinalCTA />
    </>
  );
}
