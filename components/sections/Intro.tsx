import Link from "next/link";
import FotoImg from "@/components/ui/FotoImg";
import { fotos } from "@/lib/fotos";
import { numeros } from "@/lib/site";

const fatos = [
  { valor: numeros.areaTotal, unidade: "m²", texto: "de terreno" },
  { valor: numeros.areaCoberta, unidade: "m²", texto: "cobertos" },
  { valor: numeros.porticos, unidade: "", texto: "pórticos" },
];

export default function Intro() {
  return (
    <section className="relative bg-white py-[clamp(72px,12vh,140px)]" aria-labelledby="sobre-titulo">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <figure className="painel relative p-3 lg:col-span-5" data-reveal-group>
          <div data-mask className="relative aspect-[4/5] overflow-hidden">
            <FotoImg foto={fotos.galpao} sizes="(min-width: 1024px) 38vw, 92vw" />
          </div>
          <figcaption className="flex items-center justify-between gap-4 px-1 pt-3 text-[14px] text-texto-2">
            <span>Galpão com pórticos</span>
            <span className="font-semibold text-azul">Confins, MG</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-7" data-reveal-group>
          <p data-reveal className="rotulo">
            A ARM-CORT
          </p>
          <h2 id="sobre-titulo" data-split className="titulo mt-5">
            O aço da sua obra, pronto para usar.
          </h2>
          <p data-reveal className="mt-6 max-w-[58ch] text-[1.125rem] leading-relaxed text-texto-2">
            A ARM-CORT nasceu para atender uma grande construtora de Minas Gerais e hoje fornece aço cortado, dobrado e montado para obras de pequeno,
            médio e grande porte. A nossa engenharia confere cada projeto, e a fábrica entrega cada peça identificada, no dia em que a obra precisa.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {fatos.map((f) => (
              <div key={f.texto} data-reveal className="bg-azul-claro p-4 md:p-6">
                <dt className="sr-only">{f.texto}</dt>
                <dd>
                  <span className="tnum block font-display text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-azul">
                    <span data-count={f.valor}>{new Intl.NumberFormat("pt-BR").format(f.valor)}</span>
                    {f.unidade && <span className="text-[0.55em]"> {f.unidade}</span>}
                  </span>
                  <span className="mt-2 block text-[14px] text-texto-2">{f.texto}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/a-arm-cort" className="btn btn-contorno">
              Conheça a empresa <span aria-hidden>→</span>
            </Link>
            <Link href="/estrutura" className="btn btn-contorno">
              Nossa estrutura <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
