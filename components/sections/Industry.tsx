import Image from "next/image";
import Link from "next/link";
import LoopVideo from "@/components/ui/LoopVideo";
import { numeros } from "@/lib/site";
import { asset } from "@/lib/asset";

export default function Industry({ titulo = "Precisão em cada dobra. Força em cada estrutura." }: { titulo?: string }) {
  return (
    <section aria-labelledby="industria-titulo" className="relative bg-navy pt-[clamp(96px,14vh,180px)]">
      <div className="wrap grid gap-6 pb-14 md:grid-cols-12">
        <h2
          id="industria-titulo"
          data-split
          className="font-display text-[clamp(2.2rem,5.6vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white md:col-span-9 md:col-start-3"
        >
          {titulo}
        </h2>
      </div>

      {/* faixa de painéis desiguais; ao passar o mouse, o painel se abre */}
      <div className="group/faixa grid h-[84svh] grid-cols-[64fr_36fr] grid-rows-[1fr_1fr] md:flex md:h-[72svh]">
        <figure className="relative row-span-2 overflow-hidden transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:grow-[5] md:basis-0 md:hover:grow-[7]">
          <LoopVideo src="/media/video-1.mp4" label="Máquina laranja da ARM-CORT soldando armações de estaca" className="absolute inset-0 h-full w-full object-cover" />
          <figcaption className="absolute inset-x-0 top-0 bg-[linear-gradient(rgb(7_26_48/0.75),transparent)] p-6 font-display text-[clamp(1.45rem,2.3vw,2.25rem)] leading-[1.1] text-white">
            Estacas soldadas
            <br />
            em máquina
          </figcaption>
        </figure>
        <figure className="relative overflow-hidden transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:grow-[3] md:basis-0 md:hover:grow-[6]">
          <LoopVideo src="/media/video-2.mp4" label="Fileiras de armações prontas no galpão da ARM-CORT" className="absolute inset-0 h-full w-full object-cover" />
        </figure>
        <figure className="relative overflow-hidden transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:grow-[2] md:basis-0 md:hover:grow-[6]">
          <Image
            src={asset("/media/patio.jpg")}
            alt="Corredor entre bobinas de aço no pátio, com o galpão ao fundo"
            fill
            sizes="(min-width:768px) 25vw, 36vw"
            className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
        </figure>
      </div>
      <p className="wrap mt-4 text-[15px] text-ink">Imagens da fábrica da ARM-CORT, em Confins, MG.</p>

      {/* número sobre a borda da fotografia */}
      <div className="relative mt-[clamp(96px,14vh,180px)] h-[80svh] overflow-hidden md:h-[88svh]">
        <Image
          src={asset("/media/patio.jpg")}
          alt="Pátio da ARM-CORT visto do chão, com bobinas de aço dos dois lados e o caminhão saindo do galpão"
          fill
          sizes="100vw"
          className="object-cover object-[50%_58%] brightness-[0.8] contrast-[1.05]"
          data-parallax="0.12"
        />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(transparent,rgb(7_26_48/0.88))]" aria-hidden />
        <p className="wrap absolute left-0 top-[calc(var(--header-h)+2vh)] text-[clamp(1.1rem,1.6vw,1.5rem)] text-white">Nossa estrutura</p>
        <div className="wrap absolute inset-x-0 bottom-0 flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
          <p className="order-2 font-display text-[clamp(4.5rem,17vw,17rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-white md:order-1">
            <span data-count={numeros.areaTotal} className="tnum">
              12.000
            </span>
            <span className="text-[0.35em] tracking-[-0.02em]"> m²</span>
          </p>
          <p className="order-1 max-w-[26ch] text-[17px] text-white md:order-2 md:pb-6 md:text-right">
            de terreno em Confins, com galpão, pórticos e pátio para o aço que vai para a sua obra.
          </p>
        </div>
      </div>
      <div className="wrap grid gap-8 py-12 md:grid-cols-12" data-reveal-group>
        <p data-reveal className="flex items-baseline gap-4 md:col-span-4">
          <span className="tnum font-display text-[clamp(2.2rem,3.4vw,3.25rem)] font-semibold text-white">
            <span data-count={numeros.areaCoberta}>3.500</span> m²
          </span>
          <span className="text-ink">cobertos</span>
        </p>
        <p data-reveal className="flex items-baseline gap-4 md:col-span-3">
          <span className="tnum font-display text-[clamp(2.2rem,3.4vw,3.25rem)] font-semibold text-white">{numeros.porticos}</span>
          <span className="text-ink">pórticos</span>
        </p>
        <p data-reveal className="flex items-baseline gap-4 md:col-span-5">
          <span className="font-display text-[clamp(2.2rem,3.4vw,3.25rem)] font-semibold text-white">Frota</span>
          <span className="text-ink">própria de entrega</span>
        </p>
        <Link href="/estrutura" data-reveal className="btn-ghost link-line md:col-span-12">
          Conhecer a nossa estrutura <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
