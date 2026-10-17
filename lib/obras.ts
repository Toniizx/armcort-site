import fs from "node:fs";
import path from "node:path";

// Portfólio de obras. Cada obra é um arquivo content/obras/<slug>.json, e as fotos ficam em public/obras/<slug>/.
// Só aparecem no site as obras com status "publicada". Veja content/obras/LEIA-ME.md.

export type StatusObra = "pesquisa" | "pendente" | "aprovada" | "publicada";
export type Participacao = "fornecimento" | "corte" | "dobra" | "pre-montagem" | "montagem";

export type FotoObra = {
  arquivo: string; // caminho a partir de /public, ex.: "/obras/minha-obra/01.jpg"
  alt: string;
  credito: string; // quem fez a foto
  origem: string; // de onde veio (enviada pela ARM-CORT, construtora, link)
  autorizada: boolean; // autorização para uso comercial
  largura: number;
  altura: number;
};

export type Obra = {
  slug: string;
  status: StatusObra;
  nome: string;
  cidade: string;
  uf: string;
  cliente: string;
  tipo: string;
  ano?: string;
  participacao: Participacao[];
  pecas: string[];
  descricao: string;
  fotos: FotoObra[];
  comprovacao: { descricao: string; link?: string }[];
  autorizacaoPublicacao: { por: string; data: string } | null;
  observacoes?: string;
};

export const rotuloParticipacao: Record<Participacao, string> = {
  fornecimento: "Fornecimento de aço",
  corte: "Corte",
  dobra: "Dobra",
  "pre-montagem": "Pré-montagem",
  montagem: "Montagem de armações",
};

const pasta = path.join(process.cwd(), "content", "obras");

function lerTodas(): Obra[] {
  if (!fs.existsSync(pasta)) return [];
  return fs
    .readdirSync(pasta)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(pasta, f), "utf8")) as Obra);
}

// Uma obra só vai ao ar com tudo comprovado: participação, fotos autorizadas e autorização de publicação.
function podePublicar(o: Obra) {
  return (
    o.status === "publicada" &&
    o.comprovacao.length > 0 &&
    o.autorizacaoPublicacao !== null &&
    o.fotos.length > 0 &&
    o.fotos.every((f) => f.autorizada)
  );
}

export function obrasPublicadas(): Obra[] {
  return lerTodas()
    .filter(podePublicar)
    .sort((a, b) => (b.ano ?? "").localeCompare(a.ano ?? ""));
}

export function obraPorSlug(slug: string): Obra | undefined {
  return obrasPublicadas().find((o) => o.slug === slug);
}
