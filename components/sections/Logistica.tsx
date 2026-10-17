import Link from "next/link";
import FotoImg from "@/components/ui/FotoImg";
import { fotos } from "@/lib/fotos";

const pontos = [
  { titulo: "Frota própria", texto: "Caminhões com guindaste da própria ARM-CORT levam as peças até a obra." },
  { titulo: "Just in time", texto: "Entregas no ritmo do cronograma, para não acumular aço no canteiro." },
  { titulo: "Romaneio em cada entrega", texto: "Peças identificadas e lista detalhada para conferir no recebimento." },
];

export default function Logistica() {
  return (
    <section className="escuro relative overflow-hidden py-[clamp(72px,12vh,140px)]" aria-labelledby="logistica-titulo">
      <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" data-reveal-group>
          <p data-reveal className="rotulo">
            Entrega programada
          </p>
          <h2 id="logistica-titulo" data-split className="titulo mt-4">
            Entregue no dia em que a obra precisa
          </h2>
          <ul className="mt-8 grid gap-3">
            {pontos.map((p, i) => (
              <li key={p.titulo} data-reveal className="painel flex gap-4 p-5">
                <span className="tnum font-display text-[1.6rem] font-semibold leading-none text-aco">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[1.2rem] font-semibold text-white">{p.titulo}</span>
                  <span className="mt-1 block text-[15px] text-aco">{p.texto}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/orcamento" data-reveal className="btn mt-8">
            Programar uma entrega <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-7" data-reveal-group>
          <figure data-reveal className="painel col-span-2 overflow-hidden p-2">
            <div className="relative aspect-[16/10]">
              <FotoImg foto={fotos.munckEquipe} sizes="(min-width:1024px) 54vw, 92vw" />
            </div>
          </figure>
          <figure data-reveal className="painel overflow-hidden p-2">
            <div className="relative aspect-[5/4]">
              <FotoImg foto={fotos.carregamento} sizes="(min-width:1024px) 27vw, 46vw" />
            </div>
          </figure>
          <figure data-reveal className="painel overflow-hidden p-2">
            <div className="relative aspect-[5/4]">
              <FotoImg foto={fotos.munckArmacoes} sizes="(min-width:1024px) 27vw, 46vw" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
