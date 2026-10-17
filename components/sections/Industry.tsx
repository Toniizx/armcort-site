import Link from "next/link";
import LoopVideo from "@/components/ui/LoopVideo";
import { numeros } from "@/lib/site";
import FotoImg from "@/components/ui/FotoImg";
import { fotos } from "@/lib/fotos";

const fmt = new Intl.NumberFormat("pt-BR");

function Legenda({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <figcaption className="flex items-baseline justify-between gap-4 border-t border-linha bg-white px-4 py-3">
      <span className="font-display text-[1.05rem] font-semibold text-azul">{titulo}</span>
      <span className="text-[13px] text-texto-2">{texto}</span>
    </figcaption>
  );
}

export default function Industry({ titulo = "Precisão em cada dobra. Força em cada estrutura." }: { titulo?: string }) {
  const numerosFabrica = [
    { valor: `${fmt.format(numeros.areaTotal)} m²`, conta: numeros.areaTotal, texto: "de terreno" },
    { valor: `${fmt.format(numeros.areaCoberta)} m²`, conta: numeros.areaCoberta, texto: "de área coberta" },
    { valor: String(numeros.porticos), conta: numeros.porticos, texto: "pórticos" },
    { valor: "Frota", texto: "própria de entrega" },
  ];
  return (
    <section aria-labelledby="industria-titulo" className="relative bg-cinza-claro py-[clamp(72px,12vh,140px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal-group>
          <div className="lg:col-span-8">
            <p data-reveal className="rotulo">
              Nossa indústria
            </p>
            <h2 id="industria-titulo" data-split className="titulo mt-4">
              {titulo}
            </h2>
          </div>
          <p data-reveal className="text-[1.0625rem] leading-relaxed text-texto-2 lg:col-span-4">
            Imagens reais da nossa fábrica em Confins, MG: a solda das armações, a máquina de estacas e as peças prontas.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12" data-reveal-group>
          <figure data-reveal className="painel overflow-hidden lg:col-span-6 lg:row-span-2">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[min(78svh,720px)]">
              <FotoImg foto={fotos.solda} sizes="(min-width:1024px) 46vw, 92vw" />
            </div>
            <Legenda titulo="Solda das armações" texto="Produção" />
          </figure>
          <figure data-reveal className="painel overflow-hidden lg:col-span-6">
            <div className="relative aspect-[16/10] bg-azul-escuro lg:aspect-auto lg:h-[calc(min(78svh,720px)/2-34px)]">
              <LoopVideo src="/media/video-1.mp4" label="Máquina da ARM-CORT soldando a espiral das armações de estaca" className="absolute inset-0 h-full w-full object-cover" inicio={6} />
            </div>
            <Legenda titulo="Estacas soldadas em máquina" texto="Galpão" />
          </figure>
          <figure data-reveal className="painel overflow-hidden lg:col-span-6">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[calc(min(78svh,720px)/2-34px)]">
              <FotoImg foto={fotos.estacasProducao} sizes="(min-width:1024px) 46vw, 92vw" />
            </div>
            <Legenda titulo="Armações de estaca prontas" texto="Estoque" />
          </figure>
        </div>

        <dl className="escuro mt-4 grid grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {numerosFabrica.map((n, i) => (
            <div key={n.texto} data-reveal className={`p-6 md:p-8 ${i > 0 ? "lg:border-l lg:border-white/10" : ""} ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}>
              <dt className="sr-only">{n.texto}</dt>
              <dd>
                <span className="tnum block font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-white">
                  {n.conta ? (
                    <>
                      <span data-count={n.conta}>{fmt.format(n.conta)}</span>
                      {n.valor.endsWith("m²") && <span className="text-[0.55em]"> m²</span>}
                    </>
                  ) : (
                    n.valor
                  )}
                </span>
                <span className="mt-2 block text-[15px] text-aco">{n.texto}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <Link href="/estrutura" className="btn btn-contorno">
            Conhecer a nossa estrutura <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
