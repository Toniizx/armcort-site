import Image from "next/image";
import { asset } from "@/lib/asset";

export default function Intro() {
  return (
    <section className="wrap relative grid grid-cols-12 gap-x-4 py-[clamp(96px,16vh,180px)]" aria-label="Sobre a ARM-CORT">
      <p
        data-split
        className="col-span-12 text-[clamp(1.4rem,2.3vw,2.25rem)] leading-[1.25] text-white [text-indent:3em] md:col-span-7 md:col-start-6 xl:col-span-6 xl:col-start-7"
      >
        A ARM-CORT nasceu para atender uma grande construtora de Minas Gerais e hoje fornece aço cortado, dobrado e montado para obras de pequeno,
        médio e grande porte. A nossa engenharia confere cada projeto, e a fábrica entrega cada peça identificada, no dia em que a obra precisa.
      </p>

      <div className="col-span-8 col-start-5 mt-12 md:col-span-3 md:col-start-1 md:-mt-24" data-reveal-group>
        <figure data-mask className="relative aspect-[4/5] overflow-hidden md:aspect-square">
          <Image
            src={asset("/media/patio.jpg")}
            alt="Pátio da ARM-CORT com paredes de bobinas de aço e um caminhão carregado de barras saindo do galpão"
            fill
            sizes="(min-width: 768px) 25vw, 66vw"
            className="object-cover object-[50%_62%] brightness-[0.85] contrast-[1.05]"
          />
        </figure>
      </div>
      <p data-reveal className="col-span-4 col-start-1 row-start-2 mt-12 self-end text-[14px] leading-relaxed text-metal md:col-span-2 md:col-start-1 md:row-start-auto md:mt-10">
        Fábrica em Confins, MG. Terreno de 12 mil m², 3,5 mil m² cobertos, 3 pórticos, maquinário próprio e frota própria de entrega.
      </p>
    </section>
  );
}
