import Link from "next/link";
import { servicos } from "@/lib/content";
import { CorteDemo, DobraDemo, MontagemDemo, SobMedidaDemo } from "./Demos";
import FotoImg from "@/components/ui/FotoImg";
import { fotoDoServico } from "@/lib/fotos";

const demos = [CorteDemo, DobraDemo, MontagemDemo, SobMedidaDemo];

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-azul" aria-hidden>
      <path d="M2 8.5 6 12l8-8.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  );
}

export default function Services({ id = "servicos" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="servicos-titulo" className="relative bg-cinza-claro py-[clamp(72px,12vh,140px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal-group>
          <div className="lg:col-span-7">
            <p data-reveal className="rotulo">
              Soluções
            </p>
            <h2 id="servicos-titulo" data-split className="titulo mt-4">
              Quatro jeitos de trabalhar o aço para a sua obra
            </h2>
          </div>
          <p data-reveal className="text-[1.0625rem] leading-relaxed text-texto-2 lg:col-span-4 lg:col-start-9">
            Da barra cortada na medida à armação montada e soldada. Experimente cada processo nos quadros abaixo.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2" data-reveal-group>
          {servicos.map((s, i) => {
            const Demo = demos[i];
            return (
              <article key={s.slug} data-reveal className="painel flex flex-col">
                <header className="flex items-center justify-between gap-4 border-b border-linha px-5 py-4 md:px-6">
                  <h3 className="flex items-baseline gap-3 font-display text-[clamp(1.3rem,1.8vw,1.6rem)] font-semibold leading-tight text-azul">
                    <span className="tnum text-[0.75em] text-cinza">{s.numero}</span>
                    {s.nome}
                  </h3>
                  <Link href={`/solucoes/${s.slug}`} className="link-line shrink-0 text-[14px] font-semibold text-azul">
                    Saiba mais →
                  </Link>
                </header>
                <div className="relative aspect-[16/6] overflow-hidden">
                  <FotoImg foto={fotoDoServico[s.slug]} sizes="(min-width: 1024px) 46vw, 92vw" />
                </div>
                <div className="escuro p-5 md:p-6">
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-aco">Experimente</p>
                  <Demo />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="font-display text-[1.2rem] font-semibold text-texto">{s.titulo}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-texto-2">{s.resumo}</p>
                  <ul className="mt-4 grid gap-2 text-[15px] text-texto sm:grid-cols-2">
                    {s.inclui.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link href={`/orcamento?servico=${s.slug}`} className="btn btn-contorno w-full sm:w-auto">
                      Orçar {s.nome.toLowerCase()} <span aria-hidden>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Check };
