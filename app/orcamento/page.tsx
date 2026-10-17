import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/layout/PageHero";
import QuoteBuilder from "@/components/QuoteBuilder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solicitar orçamento de aço",
  description: "Monte o seu pedido como um romaneio: vergalhões CA-50 e CA-60, telas, arames, pregos, corte, dobra e montagem. Anexe o projeto e receba o orçamento.",
  alternates: { canonical: "/orcamento" },
};

export default function Page() {
  return (
    <>
      <PageHero titulo="Solicitar orçamento" acao={false} compacto texto="Monte o pedido como um romaneio, anexe o projeto se tiver, e a nossa equipe comercial responde.">
        <p data-reveal className="text-[15px] text-metal">
          Prefere falar? {site.telefone} · {site.email}
        </p>
      </PageHero>
      <section className="wrap pb-[clamp(96px,14vh,180px)]">
        <div className="max-w-[1100px]">
          <Suspense>
            <QuoteBuilder />
          </Suspense>
        </div>
      </section>
    </>
  );
}
