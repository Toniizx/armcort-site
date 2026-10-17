import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FinalCTA from "@/components/sections/FinalCTA";
import { obraPorSlug, obrasPublicadas, rotuloParticipacao } from "@/lib/obras";
import { asset } from "@/lib/asset";

export const dynamicParams = false;

export function generateStaticParams() {
  // Next exige ao menos um caminho na exportação; sem obras publicadas, a rota leva ao 404.
  const obras = obrasPublicadas();
  return obras.length ? obras.map((o) => ({ slug: o.slug })) : [{ slug: "sem-obras" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = obraPorSlug(slug);
  if (!o) return {};
  return {
    title: `${o.nome}, ${o.cidade}/${o.uf}`,
    description: o.descricao,
    alternates: { canonical: `/obras/${o.slug}` },
    openGraph: { images: [{ url: o.fotos[0].arquivo, alt: o.fotos[0].alt }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = obraPorSlug(slug);
  if (!o) notFound();
  const [capa, ...galeria] = o.fotos;
  const numero = String(obrasPublicadas().findIndex((x) => x.slug === o.slug) + 1).padStart(3, "0");

  return (
    <>
      <section className="escuro relative h-[100svh] overflow-hidden">
        <Image src={asset(capa.arquivo)} alt={capa.alt} fill priority sizes="100vw" className="object-cover brightness-[0.72]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(transparent,rgb(23_36_71/0.92))]" aria-hidden />
        <div className="wrap absolute inset-x-0 bottom-0 pb-[calc(56px+5vh)] md:pb-[8vh]">
          <p className="tnum font-display text-[15px] text-aco">{numero}</p>
          <h1 data-split="now" className="mt-3 max-w-[18ch] font-display text-[clamp(2.6rem,7vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-white">
            {o.nome}
          </h1>
        </div>
      </section>

      <section className="wrap grid gap-8 py-[clamp(72px,12vh,140px)] md:grid-cols-12">
        <dl className="painel grid gap-5 p-6 text-[16px] md:col-span-4" data-reveal-group>
          <div data-reveal>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Localização</dt>
            <dd className="text-texto">
              {o.cidade}/{o.uf}
            </dd>
          </div>
          <div data-reveal>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Cliente</dt>
            <dd className="text-texto">{o.cliente}</dd>
          </div>
          <div data-reveal>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Empreendimento</dt>
            <dd className="text-texto">
              {o.tipo}
              {o.ano ? ` · ${o.ano}` : ""}
            </dd>
          </div>
          <div data-reveal>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Participação da ARM-CORT</dt>
            <dd className="text-texto">{o.participacao.map((p) => rotuloParticipacao[p]).join(", ")}</dd>
          </div>
          {o.pecas.length > 0 && (
            <div data-reveal>
              <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Peças</dt>
              <dd className="text-texto">{o.pecas.join(", ")}</dd>
            </div>
          )}
        </dl>
        <div className="md:col-span-7 md:col-start-6">
          <p data-split className="text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.35] text-texto">
            {o.descricao}
          </p>
        </div>
      </section>

      {galeria.length > 0 && (
        <section className="wrap grid gap-4 pb-[clamp(96px,14vh,180px)] md:grid-cols-12" aria-label="Galeria de fotos">
          {galeria.map((f, i) => (
            <figure key={f.arquivo} data-mask className={`relative overflow-hidden ${i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}`}>
              <Image src={asset(f.arquivo)} alt={f.alt} width={f.largura} height={f.altura} sizes={i % 3 === 0 ? "100vw" : "50vw"} className="h-auto w-full" />
              <figcaption className="mt-2 text-[13px] text-texto-2">Foto: {f.credito}</figcaption>
            </figure>
          ))}
        </section>
      )}

      <p className="wrap pb-16 text-[13px] text-texto-2">
        Foto de capa: {capa.credito}.{" "}
        <Link href="/obras" className="link-line">
          Ver todas as obras
        </Link>
      </p>

      <FinalCTA />
    </>
  );
}
