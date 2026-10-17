import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Industry from "@/components/sections/Industry";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Nossa estrutura: fábrica de corte, dobra e montagem de aço",
  description: "Terreno de 12 mil m², 3,5 mil m² cobertos, 3 pórticos, maquinário próprio, sala de engenharia e frota própria de entrega em Confins, MG.",
  alternates: { canonical: "/estrutura" },
};

const itens = [
  { titulo: "Maquinário próprio", texto: "Máquinas de corte e dobra e produção de estacas soldadas em máquina." },
  { titulo: "Sala de engenharia", texto: "Engenheiros, técnicos em edificações e arquitetos analisam cada projeto." },
  { titulo: "Frota própria", texto: "Entregas programadas pelo cronograma da obra, no modelo just in time." },
  { titulo: "Segurança", texto: "Departamento de segurança, treinamentos e práticas seguras em campo." },
];

export default function Page() {
  return (
    <>
      <PageHero titulo="Nossa estrutura" texto="Uma fábrica em Confins, MG, organizada para entregar o aço pronto, no dia em que a obra precisa." />
      <section className="wrap grid gap-x-10 gap-y-12 pb-[clamp(56px,8vh,96px)] md:grid-cols-4" data-reveal-group aria-label="O que temos">
        {itens.map((i) => (
          <div key={i.titulo} data-reveal>
            <p className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium text-white">{i.titulo}</p>
            <p className="mt-2 text-ink">{i.texto}</p>
          </div>
        ))}
      </section>
      <Industry />
      <Process />
      <FinalCTA />
    </>
  );
}
