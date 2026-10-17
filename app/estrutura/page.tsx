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
      <PageHero titulo="Nossa estrutura" rotulo="A fábrica" texto="Uma fábrica em Confins, MG, organizada para entregar o aço pronto, no dia em que a obra precisa." />
      <section className="bg-white py-[clamp(56px,8vh,96px)]" aria-label="O que temos">
        <div className="wrap grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {itens.map((i, k) => (
            <div key={i.titulo} data-reveal className="painel p-6">
              <p className="tnum text-[13px] font-semibold text-cinza">{String(k + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-[1.3rem] font-semibold text-azul">{i.titulo}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-texto-2">{i.texto}</p>
            </div>
          ))}
        </div>
      </section>
      <Industry />
      <Process />
      <FinalCTA />
    </>
  );
}
