import Link from "next/link";

// Abertura das páginas internas: caminho, rótulo, título grande e, ao lado, a frase e a ação.
export default function PageHero({
  titulo,
  texto,
  numero,
  rotulo,
  acao = true,
  compacto = false,
  children,
}: {
  titulo: string;
  texto?: string;
  numero?: string;
  rotulo?: string;
  acao?: boolean;
  compacto?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-linha bg-azul-claro">
      <div className="grade pointer-events-none absolute inset-0" aria-hidden />
      <div
        className={`wrap relative grid content-end gap-8 pb-[clamp(48px,8vh,96px)] pt-[calc(var(--header-h)+clamp(48px,10vh,120px))] lg:grid-cols-12 ${
          compacto ? "lg:min-h-[44svh]" : "lg:min-h-[60svh]"
        }`}
      >
        <div className="lg:col-span-8">
          <nav aria-label="Você está em" className="mb-6 text-[14px] text-texto-2">
            <Link href="/" className="link-line hover:text-azul">
              Início
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-azul">{titulo}</span>
          </nav>
          <p className="rotulo">
            {numero ? `${numero} · ` : ""}
            {rotulo ?? "ARM-CORT"}
          </p>
          <h1 data-split="now" className="mt-4 font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-azul">
            {titulo}
          </h1>
        </div>
        <div className="painel flex flex-col gap-5 p-6 lg:col-span-4 lg:self-end" data-reveal-group>
          {texto && (
            <p data-reveal className="text-[1.0625rem] leading-relaxed text-texto">
              {texto}
            </p>
          )}
          {children}
          {acao && (
            <div data-reveal>
              <Link href="/orcamento" className="btn w-full" data-magnetic>
                Solicitar orçamento <span aria-hidden>↗</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
