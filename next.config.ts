import type { NextConfig } from "next";

// Endereços do site antigo que o Google já conhece: levam para as páginas novas.
const antigos: [string, string][] = [
  ["/sobrenos", "/a-arm-cort"],
  ["/produtos", "/solucoes#produtos"],
  ["/produtos/arames", "/produtos/arames"],
  ["/produtos/pregos", "/produtos/pregos"],
  ["/produtos/telas", "/produtos/telas-eletrosoldadas"],
  ["/produtos/vergalhao-ca-50", "/produtos/vergalhao-ca-50"],
  ["/produtos/vergalhao-ca-60", "/produtos/vergalhao-ca-60"],
  ["/servicos", "/solucoes"],
  ["/servicos/corteedobra", "/solucoes/corte"],
  ["/servicos/montagem", "/solucoes/montagem"],
  ["/servicos/pecassobmedida", "/solucoes/sob-medida"],
  ["/novo-orcamento", "/orcamento"],
  ["/contact", "/contato"],
  ["/trabalhe-conosco", "/contato#trabalhe-conosco"],
];

// Versão estática para o GitHub Pages (npm run publicar-github): sem servidor, sem redirecionamentos.
const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = githubPages
  ? {
      output: "export",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
      trailingSlash: true,
      images: { unoptimized: true },
      // Os tipos já são conferidos na montagem normal; aqui a rota do orçamento fica de fora e confundiria a conferência.
      typescript: { ignoreBuildErrors: true },
    }
  : {
      trailingSlash: false,
      images: { formats: ["image/avif", "image/webp"] },
      async redirects() {
        return antigos
          .filter(([de, para]) => de !== para)
          .flatMap(([de, para]) => [
            { source: de, destination: para, permanent: true },
            { source: `${de}/`, destination: para, permanent: true },
          ]);
      },
    };

export default nextConfig;
