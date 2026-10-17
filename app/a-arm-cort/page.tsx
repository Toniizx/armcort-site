import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import LoopVideo from "@/components/ui/LoopVideo";
import { diferenciais } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "A ARM-CORT: indústria e comércio de aço em Confins, MG",
  description:
    "A ARM-CORT nasceu para atender uma grande construtora de Minas Gerais e hoje fornece aço cortado, dobrado e montado para obras de pequeno, médio e grande porte.",
  alternates: { canonical: "/a-arm-cort" },
};

const valores = [
  { nome: "Preferência do cliente", texto: "" },
  { nome: "Empreendedorismo", texto: "" },
  { nome: "Sustentabilidade", texto: "Separação e destinação correta dos resíduos e uso consciente dos recursos." },
  { nome: "Respeito às pessoas", texto: "" },
  { nome: "Ética", texto: "Atuação responsável e transparente." },
];

export default function Page() {
  return (
    <>
      <PageHero
        titulo="A ARM-CORT"
        texto="Indústria, comércio e serviços de armação de aço para a construção civil, em Confins, MG."
      />

      <section className="wrap grid gap-12 py-[clamp(96px,14vh,180px)] md:grid-cols-12">
        <p data-split className="text-[clamp(1.4rem,2.3vw,2.25rem)] leading-[1.25] text-white [text-indent:3em] md:col-span-7 md:col-start-6">
          A ARM-CORT foi criada para atender a demanda de uma grande construtora de Minas Gerais. Com agilidade e atendimento próximo, ganhou
          identidade própria e hoje atende grandes empresas da construção civil, com equipe comercial especializada e equipe técnica no pós-venda.
        </p>
        <figure data-mask className="relative aspect-[9/16] overflow-hidden md:col-span-3 md:col-start-1 md:row-start-1">
          <LoopVideo src="/media/video-1.mp4" label="Máquina laranja da ARM-CORT soldando armações de estaca" className="absolute inset-0 h-full w-full object-cover" />
        </figure>
      </section>

      <section className="bg-tech" aria-labelledby="missao-titulo">
        <div className="wrap grid gap-12 py-[clamp(96px,14vh,180px)] md:grid-cols-2">
          <div data-reveal-group>
            <h2 id="missao-titulo" data-reveal className="text-[17px] text-metal">
              Missão
            </h2>
            <p data-reveal className="mt-4 font-display text-[clamp(1.45rem,2.6vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-white">
              Gerar valor para clientes, equipes e sociedade com produtos e serviços para a construção civil.
            </p>
          </div>
          <div data-reveal-group>
            <h2 data-reveal className="text-[17px] text-metal">
              Visão
            </h2>
            <p data-reveal className="mt-4 font-display text-[clamp(1.45rem,2.6vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-white">
              Ser referência em fornecimento de aço e em soluções de projetos para a construção civil.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-[clamp(96px,14vh,180px)]" aria-labelledby="valores-titulo">
        <h2 id="valores-titulo" data-split className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
          Valores
        </h2>
        <dl className="mt-12" data-reveal-group>
          {valores.map((v) => (
            <div key={v.nome} data-reveal className="grid gap-2 py-4 md:grid-cols-[1fr_1fr]">
              <dt className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">{v.nome}</dt>
              {v.texto && <dd className="self-center text-ink">{v.texto}</dd>}
            </div>
          ))}
        </dl>
      </section>

      <section data-theme="light" className="bg-paper text-navy" aria-labelledby="dif-titulo">
        <div className="wrap grid gap-12 py-[clamp(96px,14vh,180px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="dif-titulo" data-split className="font-display text-[clamp(2.2rem,5vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] md:sticky md:top-[16vh]">
              Como trabalhamos
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-12 md:col-span-7 md:col-start-6 md:grid-cols-2" data-reveal-group>
            {diferenciais.map((d) => (
              <div key={d.titulo} data-reveal>
                <p className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium">{d.titulo}</p>
                <p className="mt-2 text-muted-dark">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[80svh] overflow-hidden" aria-label="O pátio da ARM-CORT">
        <Image src={asset("/media/patio.jpg")} alt="Pátio da ARM-CORT com bobinas de aço e caminhão carregado saindo do galpão" fill sizes="100vw" className="object-cover object-[50%_60%] brightness-[0.8]" data-parallax="0.12" />
      </section>

      <FinalCTA />
    </>
  );
}
