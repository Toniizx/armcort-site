import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { site, enderecoLinha, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ARM-CORT: ${site.telefone}, ${site.email}. ${enderecoLinha}.`,
  alternates: { canonical: "/contato" },
};

export default function Page() {
  const wa = whatsappLink("Olá! Vim pelo site da ARM-CORT.");
  const canais = [
    { rotulo: "Telefone", valor: site.telefone, href: site.telefoneLink, externo: false },
    { rotulo: "E-mail", valor: site.email, href: `mailto:${site.email}`, externo: false },
    ...(wa ? [{ rotulo: "WhatsApp", valor: "Conversar agora", href: wa, externo: true }] : []),
  ];
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent("R. Vila Otília, 270, Tavares, Confins - MG, 33500-000")}&output=embed`;

  return (
    <>
      <PageHero
        titulo="Fale com a ARM-CORT"
        rotulo="Contato"
        texto="Mande o seu projeto, tire dúvidas sobre bitolas e prazos ou peça a visita de um consultor."
      />

      <section className="bg-white py-[clamp(56px,10vh,120px)]" aria-label="Canais de contato">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <ul className="grid gap-3 lg:col-span-7" data-reveal-group>
            {canais.map((c) => (
              <li key={c.rotulo} data-reveal>
                <a
                  href={c.href}
                  {...(c.externo ? { target: "_blank", rel: "noopener" } : {})}
                  className="painel group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-azul-claro"
                >
                  <span>
                    <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">{c.rotulo}</span>
                    <span className="mt-1 block font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-azul">{c.valor}</span>
                  </span>
                  <span aria-hidden className="text-[1.5rem] text-azul transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
            <li data-reveal>
              <Link href="/orcamento" className="btn w-full !min-h-[64px]">
                Solicitar orçamento <span aria-hidden>↗</span>
              </Link>
            </li>
          </ul>
          <div className="painel flex flex-col gap-5 p-6 lg:col-span-5" data-reveal-group>
            <div data-reveal>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Fábrica</p>
              <p className="mt-1 text-[1.0625rem] text-texto">{enderecoLinha}</p>
              <a href={site.mapa} target="_blank" rel="noopener" className="link-line mt-2 inline-block font-semibold text-azul">
                Abrir no Google Maps ↗
              </a>
            </div>
            {site.horario && (
              <div data-reveal>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Horário</p>
                <p className="mt-1 text-[1.0625rem] text-texto">{site.horario}</p>
              </div>
            )}
            <div data-reveal>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cinza">Redes</p>
              <p className="mt-1 flex gap-5 text-[1.0625rem]">
                <a href={site.instagram} target="_blank" rel="noopener" className="link-line font-semibold text-azul">
                  Instagram
                </a>
                <a href={site.facebook} target="_blank" rel="noopener" className="link-line font-semibold text-azul">
                  Facebook
                </a>
              </p>
            </div>
            <p data-reveal className="mt-auto border-t border-linha pt-4 text-[15px] text-texto-2">
              {site.pagamento}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Mapa" className="wrap pb-[clamp(56px,10vh,120px)]">
        <div className="painel p-2">
          <iframe title="Mapa da ARM-CORT em Confins, MG" src={mapa} className="block h-[56svh] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section id="trabalhe-conosco" className="escuro relative py-[clamp(56px,10vh,120px)]" aria-labelledby="trabalhe-titulo">
        <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
        <div className="wrap relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="rotulo">Carreiras</p>
            <h2 id="trabalhe-titulo" data-split className="titulo mt-4">
              Trabalhe conosco
            </h2>
          </div>
          <div className="painel p-6 lg:col-span-5">
            <p className="text-aco">
              Plano de carreira e treinamentos em planejamento e controle, responsabilidade civil, liderança e desenvolvimento interpessoal.
            </p>
            <p className="mt-4 text-white">
              Para enviar seu currículo, fale com a nossa equipe pelo telefone{" "}
              <a href={site.telefoneLink} className="link-line font-semibold">
                {site.telefone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
