"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

// O comercial de 30 s (feito em 3D): toca sem som quando aparece na tela, em loop.
// "Ouvir com som" volta para o começo com o som ligado. Com "reduzir movimento", só toca se a pessoa pedir.
export default function Comercial() {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [comSom, setComSom] = useState(false);
  const pausadoPelaPessoa = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) pausadoPelaPessoa.current = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !pausadoPelaPessoa.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.4 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      pausadoPelaPessoa.current = false;
      v.play().catch(() => {});
    } else {
      pausadoPelaPessoa.current = true;
      v.pause();
    }
  };

  const som = () => {
    const v = video.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.currentTime = 0;
      pausadoPelaPessoa.current = false;
      v.play().catch(() => {});
    } else {
      v.muted = true;
    }
    setComSom(!v.muted);
  };

  return (
    <section className="relative bg-white py-[clamp(72px,12vh,140px)]" aria-labelledby="comercial-titulo">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal-group>
          <div className="lg:col-span-7">
            <p data-reveal className="rotulo">
              Do aço à obra
            </p>
            <h2 id="comercial-titulo" data-split className="titulo mt-4">
              Da bobina ao prédio pronto, em 30 segundos
            </h2>
          </div>
          <p data-reveal className="text-[1.0625rem] leading-relaxed text-texto-2 lg:col-span-4 lg:col-start-9">
            O caminho do aço na ARM-CORT: endireitado, cortado e dobrado, montado e soldado, entregue pela nossa frota e concretado na obra.
          </p>
        </div>

        <figure className="painel relative mt-12 p-2 md:p-3" data-reveal>
          <div className="relative">
            <div className="relative aspect-video overflow-hidden bg-azul-escuro">
              <video
                ref={video}
                src={asset("/media/comercial-30s.mp4")}
                poster={asset("/media/comercial-30s.jpg")}
                muted
                loop
                playsInline
                preload="none"
                onPlay={() => setTocando(true)}
                onPause={() => setTocando(false)}
                onClick={alternar}
                aria-label="Comercial da ARM-CORT: bobinas de aço, corte e dobra, montagem e solda das armaduras, entrega com caminhão munck, concretagem da estaca e o prédio pronto"
                className="absolute inset-0 h-full w-full cursor-pointer object-cover"
              />
            </div>
            {/* celular: botões embaixo do vídeo; computador: por cima, nos cantos */}
            <div className="z-10 mt-2 flex flex-wrap justify-between gap-2 md:absolute md:inset-x-3 md:bottom-3 md:mt-0">
              <button
                type="button"
                onClick={som}
                className="flex h-11 items-center gap-2 bg-azul px-4 text-[14px] font-semibold text-white transition-colors hover:bg-azul-escuro md:bg-white md:text-azul md:hover:bg-azul md:hover:text-white"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                  <path d="M3 7.5h3l4-3.5v12l-4-3.5H3z" fill="currentColor" />
                  {comSom ? (
                    <path d="M13 7a4 4 0 0 1 0 6M15.5 4.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  ) : (
                    <path d="m13 7.5 5 5m0-5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  )}
                </svg>
                {comSom ? "Tirar o som" : "Ouvir com som"}
              </button>
              <button
                type="button"
                onClick={alternar}
                className="flex h-11 items-center bg-azul-escuro/80 px-4 text-[14px] text-white transition-colors hover:bg-white hover:text-azul"
                aria-label={tocando ? "Pausar o comercial" : "Tocar o comercial"}
              >
                {tocando ? "Pausar" : "Tocar"}
              </button>
            </div>
          </div>
          <figcaption className="flex items-center justify-between gap-4 px-1 pt-3 text-[14px] text-texto-2">
            <span>Animação 3D do nosso processo</span>
            <span className="font-semibold text-azul">30 s</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
