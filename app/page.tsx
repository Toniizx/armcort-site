import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Story from "@/components/sections/Story";
import Comercial from "@/components/sections/Comercial";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Industry from "@/components/sections/Industry";
import ObrasShowcase from "@/components/sections/ObrasShowcase";
import Products from "@/components/sections/Products";
import Logistica from "@/components/sections/Logistica";
import Clientes from "@/components/sections/Clientes";
import FinalCTA from "@/components/sections/FinalCTA";
import { obrasPublicadas } from "@/lib/obras";

export default function Home() {
  const obras = obrasPublicadas();
  return (
    <>
      <Hero />
      <Intro />
      <Story />
      <Comercial />
      <Services />
      <Process />
      {obras.length > 0 ? (
        <>
          <ObrasShowcase obras={obras} />
          <Industry />
        </>
      ) : (
        // Sem obras comprovadas ainda: a fábrica no lugar da vitrine (item 8.6 do briefing).
        <Industry titulo="Da nossa indústria para a sua obra." />
      )}
      <Logistica />
      <Clientes />
      <Products />
      <FinalCTA />
    </>
  );
}
