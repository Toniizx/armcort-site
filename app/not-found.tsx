import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-end gap-8 pb-[14vh] pt-[calc(var(--header-h)+10vh)]">
      <p className="tnum font-display text-[15px] text-orange">404</p>
      <h1 className="max-w-[14ch] font-display text-[clamp(2.6rem,7.4vw,8.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-white">
        Esta peça não está no projeto.
      </h1>
      <p className="max-w-[48ch] text-ink">A página que você procurou não existe ou mudou de endereço.</p>
      <div className="flex flex-wrap gap-6">
        <Link href="/" className="btn">
          Voltar ao início
        </Link>
        <Link href="/orcamento" className="btn-ghost link-line">
          Solicitar orçamento <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
