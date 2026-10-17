import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative bg-azul-claro">
      <div className="grade pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative flex min-h-[80svh] flex-col justify-end gap-6 pb-[12vh] pt-[calc(var(--header-h)+10vh)]">
        <p className="rotulo">Erro 404</p>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-azul">
          Esta peça não está no projeto.
        </h1>
        <p className="max-w-[48ch] text-texto-2">A página que você procurou não existe ou mudou de endereço.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn">
            Voltar ao início
          </Link>
          <Link href="/orcamento" className="btn btn-contorno">
            Solicitar orçamento <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
