"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Camada de movimento por atributos, aplicada a cada página:
// data-split  → título surge por linhas, com máscara
// data-reveal → sobe 28px com opacidade; irmãos no mesmo data-reveal-group entram em sequência
// data-cota   → linha de cota se desenha
// data-count  → número conta até o valor
// data-mask   → imagem revelada por máscara de baixo para cima
// data-parallax="0.15" → desloca com a rolagem
// data-magnetic → botão puxa o mouse de leve
export default function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const limpar: (() => void)[] = [];

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "linha",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: el.dataset.split === "now" ? undefined : { trigger: el, start: "top 88%", once: true },
            }),
        });
        limpar.push(() => split.revert());
      });

      const grupos = new Map<Element, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const g = el.closest("[data-reveal-group]") ?? el;
        if (!grupos.has(g)) grupos.set(g, []);
        grupos.get(g)!.push(el);
      });
      grupos.forEach((els, g) => {
        gsap.from(els, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.075,
          scrollTrigger: { trigger: g, start: "top 86%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-cota]").forEach((el) => {
        gsap.from(el, { scaleX: 0, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const alvo = Number(el.dataset.count);
        const o = { v: 0 };
        const fmt = new Intl.NumberFormat("pt-BR");
        gsap.to(o, {
          v: alvo,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => (el.textContent = fmt.format(Math.round(o.v))),
        });
      });

      document.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
        );
        const img = el.querySelector("img, video");
        if (img) gsap.from(img, { scale: 1.25, duration: 2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const f = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -f * 50 },
          { yPercent: f * 50, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });

    if (fino) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
        const mover = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const sair = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", mover);
        el.addEventListener("pointerleave", sair);
        limpar.push(() => {
          el.removeEventListener("pointermove", mover);
          el.removeEventListener("pointerleave", sair);
        });
      });
    }

    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      limpar.forEach((f) => f());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
