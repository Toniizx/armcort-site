import { clientesLogos } from "@/lib/fotos";
import { asset } from "@/lib/asset";

// Clientes que a própria ARM-CORT mostra no site antigo (armcort.com.br). Logos em faixa contínua.
export default function Clientes() {
  const faixa = [...clientesLogos, ...clientesLogos];
  return (
    <section className="border-y border-linha bg-white py-12" aria-labelledby="clientes-titulo">
      <div className="wrap flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rotulo">Clientes</p>
          <h2 id="clientes-titulo" className="mt-3 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold text-azul">
            Empresas que constroem com a ARM-CORT
          </h2>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max animate-[faixa_40s_linear_infinite] gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {faixa.map((c, i) => (
            <li key={`${c.nome}-${i}`} className="painel flex h-[96px] w-[170px] shrink-0 items-center justify-center p-3" aria-hidden={i >= clientesLogos.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.src)} alt={c.nome} width={186} height={112} loading="lazy" className="max-h-full w-auto grayscale transition hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes faixa{to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
