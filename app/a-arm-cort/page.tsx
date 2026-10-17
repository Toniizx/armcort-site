import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import FotoImg from "@/components/ui/FotoImg";
import { fotos } from "@/lib/fotos";
import { diferenciais } from "@/lib/content";

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
        rotulo="Quem somos"
        texto="Indústria, comércio e serviços de armação de aço para a construção civil, em Confins, MG."
      />

      <section className="bg-white py-[clamp(72px,12vh,140px)]">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="painel p-2 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <FotoImg foto={fotos.munckEquipe} sizes="(min-width:1024px) 38vw, 92vw" className="object-[70%_50%]" />
            </div>
          </figure>
          <div className="lg:col-span-7" data-reveal-group>
            <p data-reveal className="rotulo">
              Nossa história
            </p>
            <h2 data-split className="titulo mt-4">
              Nascemos dentro da obra.
            </h2>
            <p data-reveal className="mt-6 max-w-[58ch] text-[1.125rem] leading-relaxed text-texto-2">
              A ARM-CORT foi criada para atender a demanda de uma grande construtora de Minas Gerais. Com agilidade e atendimento próximo, ganhou
              identidade própria e hoje atende grandes empresas da construção civil, com equipe comercial especializada e equipe técnica no pós-venda.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div data-reveal className="painel p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Missão</p>
                <p className="mt-2 text-[1.0625rem] text-texto">Gerar valor para clientes, equipes e sociedade com produtos e serviços para a construção civil.</p>
              </div>
              <div data-reveal className="painel p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Visão</p>
                <p className="mt-2 text-[1.0625rem] text-texto">Ser referência em fornecimento de aço e em soluções de projetos para a construção civil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="escuro relative py-[clamp(72px,12vh,140px)]" aria-labelledby="valores-titulo">
        <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
        <div className="wrap relative">
          <p className="rotulo">Valores</p>
          <h2 id="valores-titulo" data-split className="titulo mt-4">
            O que nos guia
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
            {valores.map((v, i) => (
              <li key={v.nome} data-reveal className="painel p-5">
                <p className="tnum text-[13px] font-semibold text-aco">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-[1.25rem] font-semibold leading-tight text-white">{v.nome}</p>
                {v.texto && <p className="mt-2 text-[15px] text-aco">{v.texto}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cinza-claro py-[clamp(72px,12vh,140px)]" aria-labelledby="dif-titulo">
        <div className="wrap">
          <p className="rotulo">Diferenciais</p>
          <h2 id="dif-titulo" data-split className="titulo mt-4">
            Como trabalhamos
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {diferenciais.map((d) => (
              <div key={d.titulo} data-reveal className="painel p-6">
                <p className="font-display text-[1.3rem] font-semibold text-azul">{d.titulo}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-texto-2">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[60svh] overflow-hidden" aria-label="O pátio da ARM-CORT">
        <FotoImg foto={fotos.galpao} sizes="100vw" />
      </section>

      <FinalCTA />
    </>
  );
}
