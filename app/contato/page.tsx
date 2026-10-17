import type { Metadata } from "next";
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
    { rotulo: "Telefone", valor: site.telefone, href: site.telefoneLink },
    { rotulo: "E-mail", valor: site.email, href: `mailto:${site.email}` },
    ...(wa ? [{ rotulo: "WhatsApp", valor: "Conversar agora", href: wa }] : []),
  ];
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent("R. Vila Otília, 270, Tavares, Confins - MG, 33500-000")}&output=embed`;

  return (
    <>
      <PageHero titulo="Fale com a ARM-CORT" texto="Mande o seu projeto, tire dúvidas sobre bitolas e prazos ou peça a visita de um consultor." />

      <section className="wrap grid gap-12 pb-[clamp(96px,14vh,180px)] md:grid-cols-12" aria-label="Canais de contato">
        <ul className="md:col-span-7" data-reveal-group>
          {canais.map((c) => (
            <li key={c.rotulo} data-reveal className="py-4">
              <p className="text-[15px] text-metal">{c.rotulo}</p>
              <a href={c.href} className="link-line font-display text-[clamp(1.6rem,3.6vw,3.6rem)] leading-tight tracking-[-0.03em] text-white" {...(c.rotulo === "WhatsApp" ? { target: "_blank", rel: "noopener" } : {})}>
                {c.valor}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9" data-reveal-group>
          <div data-reveal>
            <p className="text-[15px] text-metal">Fábrica</p>
            <p className="text-[17px] text-white">{enderecoLinha}</p>
            <a href={site.mapa} target="_blank" rel="noopener" className="link-line mt-2 inline-block text-orange">
              Abrir no Google Maps ↗
            </a>
          </div>
          {site.horario && (
            <div data-reveal>
              <p className="text-[15px] text-metal">Horário</p>
              <p className="text-[17px] text-white">{site.horario}</p>
            </div>
          )}
          <div data-reveal>
            <p className="text-[15px] text-metal">Redes</p>
            <p className="flex gap-5 text-[17px]">
              <a href={site.instagram} target="_blank" rel="noopener" className="link-line text-white">
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" className="link-line text-white">
                Facebook
              </a>
            </p>
          </div>
          <p data-reveal className="text-[15px] text-ink">
            {site.pagamento}
          </p>
        </div>
      </section>

      <section aria-label="Mapa" className="relative h-[70svh] bg-tech">
        <iframe
          title="Mapa da ARM-CORT em Confins, MG"
          src={mapa}
          className="absolute inset-0 h-full w-full grayscale-[0.6] invert-[0.88] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section id="trabalhe-conosco" className="wrap grid gap-8 py-[clamp(96px,14vh,180px)] md:grid-cols-12" aria-labelledby="trabalhe-titulo">
        <h2 id="trabalhe-titulo" data-split className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white md:col-span-7">
          Trabalhe conosco
        </h2>
        <div className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="text-ink">
            Plano de carreira e treinamentos em planejamento e controle, responsabilidade civil, liderança e desenvolvimento interpessoal. Para enviar seu currículo, fale
            com a nossa equipe pelo telefone{" "}
            <a href={site.telefoneLink} className="link-line text-white">
              {site.telefone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
