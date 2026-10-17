import Link from "next/link";
import { navegacao, site, enderecoLinha, whatsappLink } from "@/lib/site";
import { servicos, produtos } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  const wa = whatsappLink("Olá! Vim pelo site da ARM-CORT.");
  return (
    <footer className="escuro relative">
      <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo variante="branca" className="w-[190px]" />
          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-aco">
            Indústria e comércio de aço para a construção civil. Corte, dobra e montagem de armações em Confins, MG.
          </p>
          <Link href="/orcamento" className="btn mt-8">
            Solicitar orçamento <span aria-hidden>↗</span>
          </Link>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 text-[15px] md:col-span-5 md:grid-cols-3">
          <div>
            <p className="mb-3 font-semibold text-white">Navegação</p>
            <ul className="grid gap-1.5 text-aco">
              {navegacao.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line hover:text-white">
                    {n.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Soluções</p>
            <ul className="grid gap-1.5 text-aco">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solucoes/${s.slug}`} className="link-line hover:text-white">
                    {s.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Produtos</p>
            <ul className="grid gap-1.5 text-aco">
              {produtos.map((p) => (
                <li key={p.slug}>
                  <Link href={`/produtos/${p.slug}`} className="link-line hover:text-white">
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="text-[15px] md:col-span-3">
          <p className="mb-3 font-semibold text-white">Fale com a gente</p>
          <ul className="grid gap-1.5 text-aco">
            <li>
              <a href={site.telefoneLink} className="link-line hover:text-white">
                {site.telefone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-line hover:text-white">
                {site.email}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener" className="link-line hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            <li className="pt-2">{enderecoLinha}</li>
            <li>
              <a href={site.mapa} target="_blank" rel="noopener" className="link-line text-white">
                Ver no mapa ↗
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.instagram} target="_blank" rel="noopener" className="link-line hover:text-white">
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" className="link-line hover:text-white">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-col justify-between gap-1 py-5 pb-[calc(76px+env(safe-area-inset-bottom))] text-[13px] text-aco sm:pb-5 md:flex-row">
          <p translate="no">
            © {new Date().getFullYear()} {site.razaoSocial} · CNPJ {site.cnpj}
          </p>
          <p>{site.pagamento}</p>
        </div>
      </div>
    </footer>
  );
}
