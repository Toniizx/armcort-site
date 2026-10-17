"use client";

import Link from "next/link";
import { useState } from "react";
import { produtos } from "@/lib/content";

// Tabela de produtos com as medidas reais. Ao escolher uma bitola, o corte da barra aparece em escala.
export default function Products({ titulo = true }: { titulo?: boolean }) {
  const [sel, setSel] = useState<{ produto: string; medida: string; d?: number }>({ produto: "vergalhao-ca-50", medida: "12,5", d: 12.5 });
  const maxD = 32;
  const escolhido = produtos.find((p) => p.slug === sel.produto)!;

  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="relative bg-white py-[clamp(72px,12vh,140px)]">
      <div className="wrap">
        {titulo ? (
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal-group>
            <div className="lg:col-span-7">
              <p data-reveal className="rotulo">
                Produtos
              </p>
              <h2 id="produtos-titulo" data-split className="titulo mt-4">
                O aço que vendemos
              </h2>
            </div>
            <p data-reveal className="text-[1.0625rem] leading-relaxed text-texto-2 lg:col-span-4 lg:col-start-9">
              Escolha uma medida para ver o vergalhão em escala e levar direto para o orçamento.
            </p>
          </div>
        ) : (
          <h2 id="produtos-titulo" className="sr-only">
            Produtos
          </h2>
        )}

        <div className={`grid gap-5 lg:grid-cols-12 ${titulo ? "mt-12" : ""}`}>
          <div className="painel lg:col-span-8">
            <table className="w-full border-collapse text-left max-md:block">
              <thead className="max-md:hidden">
                <tr className="bg-azul-claro text-[13px] font-semibold uppercase tracking-[0.1em] text-azul">
                  <th scope="col" className="px-5 py-3">
                    Produto
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Medidas disponíveis
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Venda por
                  </th>
                </tr>
              </thead>
              <tbody className="max-md:block">
                {produtos.map((p) => (
                  <tr key={p.slug} className="border-t border-linha align-top max-md:block max-md:py-3">
                    <th scope="row" className="px-5 py-4 font-normal max-md:block max-md:py-1">
                      <Link href={`/produtos/${p.slug}`} className="link-line font-display text-[1.15rem] font-semibold text-azul">
                        {p.nome}
                      </Link>
                    </th>
                    <td className="px-5 py-4 max-md:block max-md:py-1">
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
                              className={`tnum min-h-[40px] min-w-[52px] border px-2.5 text-[15px] font-medium transition-colors ${
                                ativo ? "border-azul bg-azul text-white" : "border-linha bg-white text-texto hover:border-azul hover:text-azul"
                              }`}
                            >
                              {m}
                              {p.diametros ? <span className="sr-only"> milímetros</span> : null}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[15px] text-texto-2 max-md:block max-md:py-1"><span className="md:hidden">Venda por </span>{p.unidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-linha px-5 py-4 text-[14px] text-texto-2">Vergalhões em milímetros. {produtos[0].norma}</p>
          </div>

          {/* a peça escolhida, em escala */}
          <aside className="escuro painel flex flex-col gap-6 p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-4 lg:self-start" aria-live="polite">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-aco">Você escolheu</p>
              <p className="mt-2 font-display text-[1.5rem] font-semibold leading-tight text-white">
                {escolhido.nome} · <span className="tnum">{sel.medida}</span>
                {sel.d ? " mm" : ""}
              </p>
            </div>
            <div className="flex h-[220px] items-center justify-center">
              {sel.d ? (
                <svg viewBox="-60 -60 120 120" className="h-full w-full" role="img" aria-label={`Corte de um vergalhão de ${sel.medida} mm, em escala com o de 32 mm`}>
                  <circle r={(32 / maxD) * 50} fill="none" stroke="#b9c2d3" strokeWidth="0.6" strokeDasharray="1.5 2" />
                  <circle r={(sel.d / maxD) * 50} fill="#e9edf5" style={{ transition: "r .5s cubic-bezier(.22,1,.36,1)" }} />
                </svg>
              ) : (
                <p className="tnum font-display text-[clamp(3rem,6vw,5rem)] font-semibold tracking-[-0.04em] text-white">{sel.medida}</p>
              )}
            </div>
            {sel.d ? <p className="text-[14px] text-aco">O círculo pontilhado é o vergalhão de 32 mm, a maior bitola da tabela.</p> : null}
            <Link href={`/orcamento?produto=${encodeURIComponent(escolhido.slug)}&medida=${encodeURIComponent(sel.medida)}`} className="btn w-full" data-magnetic>
              Pôr no orçamento <span aria-hidden>↗</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
