import Link from "next/link";
import { servicos } from "@/lib/content";
import { CorteDemo, DobraDemo, MontagemDemo, SobMedidaDemo } from "./Demos";

function Titulo({ i }: { i: number }) {
  const s = servicos[i];
  return (
    <div>
      <p className="tnum font-display text-[15px] text-orange">{s.numero}</p>
      <h3 data-split className="mt-2 font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
        {s.nome}
      </h3>
    </div>
  );
}

function Detalhes({ i, claro = false }: { i: number; claro?: boolean }) {
  const s = servicos[i];
  return (
    <div data-reveal-group>
      <p data-reveal className={`font-display text-[clamp(1.45rem,2.3vw,2.25rem)] leading-[1.15] tracking-[-0.02em] ${claro ? "text-navy" : "text-white"}`}>
        {s.titulo}
      </p>
      <p data-reveal className={`mt-4 max-w-[52ch] ${claro ? "text-navy" : "text-ink"}`}>
        {s.texto}
      </p>
      <Link href={`/solucoes/${s.slug}`} data-reveal className={`btn-ghost link-line mt-4 ${claro ? "!text-navy" : ""}`}>
        Ver {s.nome.toLowerCase()} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section aria-labelledby="servicos-titulo" className="relative">
      <div className="wrap pb-16 pt-[clamp(96px,14vh,160px)]">
        <h2 id="servicos-titulo" data-split className="max-w-[16ch] font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
          Quatro jeitos de trabalhar o aço
        </h2>
        <div data-cota className="cota mt-8 text-metal/40" aria-hidden />
      </div>

      {/* 01 Corte: faixa larga, a pessoa corta a barra */}
      <article className="wrap grid gap-10 pb-[clamp(96px,14vh,180px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <Titulo i={0} />
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-10">
          <Detalhes i={0} />
        </div>
        <div className="md:col-span-12">
          <CorteDemo />
        </div>
      </article>

      {/* 02 Dobra: desenho grande à esquerda, texto à direita */}
      <article className="bg-tech">
        <div className="wrap grid items-center gap-10 py-[clamp(80px,12vh,160px)] md:grid-cols-12">
          <div className="md:col-span-7">
            <DobraDemo />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Titulo i={1} />
            <div className="mt-8">
              <Detalhes i={1} />
            </div>
          </div>
        </div>
      </article>

      {/* 03 Montagem: título preso à esquerda, armação se montando à direita */}
      <article className="wrap grid gap-10 py-[clamp(96px,14vh,180px)] md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="md:sticky md:top-[18vh]">
            <Titulo i={2} />
            <div className="mt-8">
              <Detalhes i={2} />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-white">
              {servicos[2].pecas!.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center md:col-span-5 md:col-start-8 md:min-h-[110svh] md:items-center">
          <MontagemDemo />
        </div>
      </article>

      {/* 04 Sob medida: prancha clara */}
      <article data-theme="light" className="bg-paper text-navy">
        <div className="wrap py-[clamp(80px,12vh,160px)]">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="tnum font-display text-[15px] text-[#c2410c]">{servicos[3].numero}</p>
              <h3 data-split className="mt-2 font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">
                {servicos[3].nome}
              </h3>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <Detalhes i={3} claro />
            </div>
          </div>
          <div className="mt-14 bg-navy p-[clamp(16px,3vw,48px)] text-white">
            <SobMedidaDemo />
          </div>
        </div>
      </article>
    </section>
  );
}
