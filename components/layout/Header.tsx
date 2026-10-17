"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navegacao, site, whatsappLink, enderecoLinha } from "@/lib/site";
import Wordmark from "./Wordmark";

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [claro, setClaro] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const wa = whatsappLink("Olá! Vim pelo site e quero um orçamento de aço.");

  // Fecha o menu ao trocar de página
  useEffect(() => setAberto(false), [pathname]);

  // Cor do topo muda sobre as seções claras; some ao descer e volta ao subir
  useEffect(() => {
    let ultimo = window.scrollY;
    const checar = () => {
      const y = window.scrollY;
      setEscondido(y > 400 && y > ultimo + 2);
      if (y < ultimo - 2 || y < 400) setEscondido(false);
      ultimo = y;
      const claras = document.querySelectorAll<HTMLElement>("[data-theme='light']");
      let sobreClara = false;
      claras.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 36 && r.bottom >= 36) sobreClara = true;
      });
      setClaro(sobreClara);
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
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.3 });
      gsap.fromTo(el.querySelectorAll("[data-info]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.55 });
    } else {
      gsap.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: () => gsap.set(el, { autoAlpha: 0 }) });
    }
  }, [aberto]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const tinta = claro && !aberto ? "text-navy" : "text-white";

  return (
    <>
      <a href="#conteudo" className="btn fixed left-3 top-3 z-[90] -translate-y-24 focus:translate-y-0">
        Pular para o conteúdo
      </a>
      <header
        className={`wrap fixed inset-x-0 top-0 z-[80] flex h-[var(--header-h)] items-center justify-between transition-[transform,color] duration-500 ${tinta} ${
          escondido && !aberto ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Link href="/" aria-label="ARM-CORT, página inicial" className="relative z-10">
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {navegacao.slice(1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname.startsWith(n.href) ? "page" : undefined}
              className={`link-line text-[15px] ${pathname.startsWith(n.href) ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
            >
              {n.rotulo}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2 md:gap-4">
          {wa && (
            <a href={wa} target="_blank" rel="noopener" className="link-line hidden text-[15px] md:inline" aria-label="Falar pelo WhatsApp">
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
            className="flex h-11 items-center gap-3 px-1 text-[15px]"
          >
            <span>{aberto ? "Fechar" : "Menu"}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-tela-cheia"
        ref={menu}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-tech text-white opacity-0"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="grade pointer-events-none absolute inset-0" aria-hidden />
        <nav aria-label="Menu completo" className="wrap relative mt-[calc(var(--header-h)+4vh)] flex-1">
          <ul className="flex flex-col">
            {navegacao.map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <Link
                  href={n.href}
                  data-item
                  tabIndex={aberto ? 0 : -1}
                  className="group flex items-baseline gap-4 py-[0.4vh] font-display text-[clamp(2.4rem,7.4vw,7rem)] uppercase leading-[0.98] tracking-[-0.04em] transition-colors hover:text-orange"
                >
                  <span className="tnum w-8 text-[15px] tracking-normal text-metal">{String(i + 1).padStart(2, "0")}</span>
                  {n.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap relative grid gap-6 pb-8 text-[15px] text-ink md:grid-cols-4">
          <p data-info>
            <span className="block text-white">Telefone</span>
            <a href={site.telefoneLink} tabIndex={aberto ? 0 : -1} className="link-line">
              {site.telefone}
            </a>
          </p>
          <p data-info>
            <span className="block text-white">E-mail</span>
            <a href={`mailto:${site.email}`} tabIndex={aberto ? 0 : -1} className="link-line">
              {site.email}
            </a>
          </p>
          <p data-info className="md:col-span-1">
            <span className="block text-white">Endereço</span>
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
