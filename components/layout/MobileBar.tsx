import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

// No celular: orçamento e contato sempre ao alcance do polegar.
export default function MobileBar() {
  const wa = whatsappLink("Olá! Vim pelo site e quero um orçamento de aço.");
  return (
    <div className="fixed inset-x-0 bottom-0 z-[75] grid grid-cols-[1fr_auto] bg-navy pb-[env(safe-area-inset-bottom)] sm:hidden">
      <Link href="/orcamento" className="btn justify-center !min-h-[56px]">
        Solicitar orçamento <span aria-hidden>↗</span>
      </Link>
      {wa ? (
        <a href={wa} target="_blank" rel="noopener" className="flex min-h-[56px] items-center px-5 text-[15px] text-white">
          WhatsApp
        </a>
      ) : (
        <a href={site.telefoneLink} className="flex min-h-[56px] items-center px-5 text-[15px] text-white">
          Ligar
        </a>
      )}
    </div>
  );
}
