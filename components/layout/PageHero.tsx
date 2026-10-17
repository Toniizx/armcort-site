import Link from "next/link";

// Abertura das páginas internas: título monumental à esquerda, uma frase e a ação à direita.
export default function PageHero({
  titulo,
  texto,
  numero,
  acao = true,
  compacto = false,
  children,
}: {
  titulo: string;
  texto?: string;
  numero?: string;
  acao?: boolean;
  compacto?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="grade pointer-events-none absolute inset-0" aria-hidden />
      <div className={`wrap relative grid ${compacto ? "min-h-[52svh]" : "min-h-[78svh]"} content-end gap-10 pb-[clamp(56px,10vh,120px)] pt-[calc(var(--header-h)+12vh)] md:grid-cols-12`}>
        <div className="md:col-span-8">
          {numero && <p className="tnum mb-4 font-display text-[15px] text-orange">{numero}</p>}
          <h1 data-split="now" className="font-display text-[clamp(2.6rem,7.4vw,8.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-white">
            {titulo}
          </h1>
        </div>
        <div className="flex flex-col gap-6 md:col-span-4 md:self-end" data-reveal-group>
          {texto && (
            <p data-reveal className="text-[clamp(1.05rem,1.35vw,1.3rem)] leading-snug text-ink">
              {texto}
            </p>
          )}
          {children}
          {acao && (
            <div data-reveal>
              <Link href="/orcamento" className="btn" data-magnetic>
                Solicitar orçamento <span aria-hidden>↗</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
