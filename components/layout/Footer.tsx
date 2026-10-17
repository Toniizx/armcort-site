import Link from "next/link";
import { navegacao, site, enderecoLinha, whatsappLink } from "@/lib/site";
import { servicos } from "@/lib/content";

export default function Footer() {
  const wa = whatsappLink("Olá! Vim pelo site da ARM-CORT.");
  return (
    <footer data-theme="light" className="relative grid min-h-[100svh] grid-rows-[auto_1fr_auto] bg-paper text-navy">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 pt-14 text-[15px] md:grid-cols-12 md:pt-12">
        <div className="col-span-2 md:col-span-3">
          <p className="font-medium">Fábrica</p>
          <p className="text-muted-dark">{enderecoLinha}</p>
          <a href={site.mapa} target="_blank" rel="noopener" className="link-line mt-2 inline-block font-medium">
            Ver no mapa ↗
          </a>
        </div>
        <div className="md:col-span-2 md:col-start-5">
          <p className="font-medium">Navegação</p>
          <ul className="text-muted-dark">
            {navegacao.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-line hover:text-navy">
                  {n.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-medium">Soluções</p>
          <ul className="text-muted-dark">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link href={`/solucoes/${s.slug}`} className="link-line hover:text-navy">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-3 md:col-start-10">
          <p className="font-medium">Fale com a gente</p>
          <ul className="text-muted-dark">
            <li>
              <a href={site.telefoneLink} className="link-line hover:text-navy">
                {site.telefone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-line hover:text-navy">
                {site.email}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener" className="link-line hover:text-navy">
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="link-line hover:text-navy">
                Instagram {site.instagramUser}
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener" className="link-line hover:text-navy">
                Facebook
              </a>
            </li>
          </ul>
          <Link href="/orcamento" className="btn mt-6">
            Solicitar orçamento <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      <div />

      <div translate="no" className="wrap pb-[calc(76px+env(safe-area-inset-bottom))] sm:pb-5">
        <svg viewBox="0 0 1000 152" className="block w-full" role="img" aria-label="ARM-CORT">
          <text
            x="0"
            y="138"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-navy font-display"
            style={{ fontSize: 178, fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            ARM-CORT
          </text>
        </svg>
        <div className="mt-4 flex flex-col justify-between gap-1 text-[13px] text-muted-dark md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.razaoSocial} · CNPJ {site.cnpj}
          </p>
          <p>{site.pagamento}</p>
        </div>
      </div>
    </footer>
  );
}
