"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navegacao, site, whatsappLink, enderecoLinha } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [rolou, setRolou] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const wa = whatsappLink("Olá! Vim pelo site e quero um orçamento de aço.");

  useEffect(() => setAberto(false), [pathname]);

  // Some ao descer e volta ao subir
  useEffect(() => {
    let ultimo = window.scrollY;
    const checar = () => {
      const y = window.scrollY;
      if (y > 300 && y > ultimo + 4) setEscondido(true);
      else if (y < ultimo - 4 || y < 300) setEscondido(false);
      setRolou(y > 10);
      ultimo = y;
    };
    checar();
    window.addEventListener("scroll", checar, { passive: true });
    return () => window.removeEventListener("scroll", checar);
  }, [pathname]);

  // Menu em tela cheia: abre como uma chapa descendo, itens por linha
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = aberto ? "hidden" : "";
    if (aberto) window.__lenis?.stop();
    else window.__lenis?.start();
    if (reduz) {
      gsap.set(el, { autoAlpha: aberto ? 1 : 0, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }
    if (aberto) {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.25 });
      gsap.fromTo(el.querySelectorAll("[data-info]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.5 });
    } else {
      gsap.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "expo.inOut", onComplete: () => gsap.set(el, { autoAlpha: 0 }) });
    }
  }, [aberto]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const ativo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#conteudo" className="btn fixed left-3 top-3 z-[90] -translate-y-24 focus:translate-y-0">
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[80] h-[var(--header-h)] bg-white transition-[transform,box-shadow] duration-500 ${
          rolou ? "shadow-[0_1px_0_#d9dee7]" : ""
        } ${escondido && !aberto ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="ARM-CORT, página inicial" className="shrink-0">
            <Logo className="w-[132px] md:w-[150px]" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {navegacao.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={ativo(n.href) ? "page" : undefined}
                className={`relative py-2 text-[15px] font-medium transition-colors ${ativo(n.href) ? "text-azul" : "text-texto-2 hover:text-azul"}`}
              >
                {n.rotulo}
                <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-azul transition-transform duration-300 ${ativo(n.href) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {wa && (
              <a href={wa} target="_blank" rel="noopener" className="link-line hidden text-[15px] font-medium text-azul md:inline">
                WhatsApp
              </a>
            )}
            <Link href="/orcamento" className="btn hidden !min-h-[44px] sm:inline-flex" data-magnetic>
              Solicitar orçamento <span aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-tela-cheia"
              className="flex h-11 items-center gap-3 px-1 text-[15px] font-medium text-azul lg:hidden"
            >
              <span>{aberto ? "Fechar" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform duration-500 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform duration-500 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-tela-cheia"
        ref={menu}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="escuro invisible fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[70] flex flex-col overflow-y-auto overscroll-contain opacity-0"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="grade-escura pointer-events-none absolute inset-0" aria-hidden />
        <nav aria-label="Menu completo" className="wrap relative flex-1 pt-8">
          <ul className="flex flex-col">
            {navegacao.map((n, i) => (
              <li key={n.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={n.href}
                  data-item
                  tabIndex={aberto ? 0 : -1}
                  className="flex items-baseline gap-4 py-3 font-display text-[clamp(2rem,7vw,4.5rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-white transition-colors hover:text-aco"
                >
                  <span className="tnum w-8 text-[14px] font-medium tracking-normal text-aco">{String(i + 1).padStart(2, "0")}</span>
                  {n.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap relative grid gap-6 py-8 text-[15px] text-aco sm:grid-cols-2 md:grid-cols-4">
          <p data-info>
            <span className="block font-semibold text-white">Telefone</span>
            <a href={site.telefoneLink} tabIndex={aberto ? 0 : -1} className="link-line">
              {site.telefone}
            </a>
          </p>
          <p data-info>
            <span className="block font-semibold text-white">E-mail</span>
            <a href={`mailto:${site.email}`} tabIndex={aberto ? 0 : -1} className="link-line">
              {site.email}
            </a>
          </p>
          <p data-info>
            <span className="block font-semibold text-white">Endereço</span>
            {enderecoLinha}
          </p>
          <p data-info>
            <Link href="/orcamento" tabIndex={aberto ? 0 : -1} className="btn">
              Solicitar orçamento <span aria-hidden>↗</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
