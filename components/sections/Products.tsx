"use client";

import Link from "next/link";
import { useState } from "react";
import { produtos } from "@/lib/content";

// Tabela de produtos numa só medida de letra. Ao escolher uma bitola, o corte da barra aparece em escala real relativa.
export default function Products({ titulo = true }: { titulo?: boolean }) {
  const [sel, setSel] = useState<{ produto: string; medida: string; d?: number }>({ produto: "vergalhao-ca-50", medida: "12,5", d: 12.5 });
  const maxD = 32;
  const escolhido = produtos.find((p) => p.slug === sel.produto)!;

  return (
    <section id="produtos" data-theme="light" aria-labelledby="produtos-titulo" className="relative bg-paper text-navy">
      <div className="wrap grid gap-12 py-[clamp(96px,14vh,180px)] lg:grid-cols-12">
        <div className="lg:col-span-8">
          {titulo ? (
            <h2 id="produtos-titulo" data-split className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">
              O aço que vendemos
            </h2>
          ) : (
            <h2 id="produtos-titulo" className="sr-only">
              Produtos
            </h2>
          )}
          <div className="mt-12">
            {produtos.map((p) => (
              <div key={p.slug} className="grid gap-2 py-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] md:gap-6">
                <Link href={`/produtos/${p.slug}`} className="link-line self-start font-display text-[clamp(1.25rem,2.1vw,1.9rem)] font-medium tracking-[-0.02em]">
                  {p.nome}
                </Link>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Medidas de ${p.nome}`}>
                  {p.medidas.map((m, i) => {
                    const ativo = sel.produto === p.slug && sel.medida === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => setSel({ produto: p.slug, medida: m, d: p.diametros?.[i] })}
                        onMouseEnter={() => setSel({ produto: p.slug, medida: m, d: p.diametros?.[i] })}
                        className={`tnum min-h-[44px] min-w-[56px] px-3 text-[clamp(1rem,1.3vw,1.2rem)] transition-colors ${
                          ativo ? "bg-navy text-white" : "bg-paper-2 text-navy hover:bg-navy hover:text-white"
                        }`}
                      >
                        {m}
                        {p.diametros ? <span className="sr-only"> milímetros</span> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[60ch] text-[15px] text-muted-dark">
            Vergalhões em milímetros, vendidos por quilo ou por barra. Telas por unidade; arames e pregos por quilo. {produtos[0].norma}
          </p>
        </div>

        {/* a peça escolhida, em escala */}
        <aside className="flex flex-col justify-between gap-8 bg-navy p-8 text-white lg:sticky lg:top-[14vh] lg:col-span-4 lg:h-[72svh]" aria-live="polite">
          <div>
            <p className="text-[15px] text-metal">Você escolheu</p>
            <p className="mt-1 font-display text-[clamp(1.45rem,2.3vw,2.25rem)] leading-tight">
              {escolhido.nome} · <span className="tnum">{sel.medida}</span>
              {sel.d ? " mm" : ""}
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            {sel.d ? (
              <svg viewBox="-60 -60 120 120" className="h-full max-h-[34svh] w-full" role="img" aria-label={`Corte de um vergalhão de ${sel.medida} mm, em escala com o de 32 mm`}>
                <circle r={(32 / maxD) * 50} fill="none" stroke="#9aa6b2" strokeWidth="0.6" strokeDasharray="1.5 2" />
                <circle r={(sel.d / maxD) * 50} fill="#9aa6b2" style={{ transition: "r .5s cubic-bezier(.22,1,.36,1)" }} />
                <line x1={-(sel.d / maxD) * 50} y1={(sel.d / maxD) * 50 + 8} x2={(sel.d / maxD) * 50} y2={(sel.d / maxD) * 50 + 8} stroke="#ff6b16" strokeWidth="0.8" />
              </svg>
            ) : (
              <p className="tnum font-display text-[clamp(3rem,7vw,6rem)] font-semibold tracking-[-0.04em]">{sel.medida}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {sel.d ? <p className="text-[15px] text-ink">O círculo pontilhado é o vergalhão de 32 mm, a maior bitola da tabela.</p> : null}
            <Link
              href={`/orcamento?produto=${encodeURIComponent(escolhido.slug)}&medida=${encodeURIComponent(sel.medida)}`}
              className="btn self-start"
              data-magnetic
            >
              Pôr no orçamento <span aria-hidden>↗</span>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
