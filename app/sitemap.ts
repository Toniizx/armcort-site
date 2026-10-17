import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicos, produtos } from "@/lib/content";
import { obrasPublicadas } from "@/lib/obras";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/a-arm-cort", "/solucoes", "/estrutura", "/obras", "/contato", "/orcamento"];
  return [
    ...paginas.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...servicos.map((s) => ({ url: `${site.url}/solucoes/${s.slug}`, priority: 0.8 })),
    ...produtos.map((p) => ({ url: `${site.url}/produtos/${p.slug}`, priority: 0.7 })),
    ...obrasPublicadas().map((o) => ({ url: `${site.url}/obras/${o.slug}`, priority: 0.6 })),
  ];
}
