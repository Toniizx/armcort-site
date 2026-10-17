import { produtos, servicos } from "./content";

export type Linha = { produto: string; medida: string; quantidade: string; unidade: string };

export type Pedido = {
  linhas: Linha[];
  servicos: string[];
  tipoObra: string;
  etapa: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  cidade: string;
  prazo: string;
  comentarios: string;
  anexos?: string[];
};

export const tiposObra = ["Residencial", "Comercial", "Industrial", "Infraestrutura", "Outro"];
export const etapas = ["Fundação", "Estrutura", "Fundação e estrutura", "Outra"];

export function unidadesDe(slug: string) {
  const p = produtos.find((x) => x.slug === slug);
  if (!p) return ["kg"];
  if (p.unidade === "kg ou barra") return ["kg", "barra"];
  return [p.unidade];
}

/** Texto do pedido, usado no e-mail e no WhatsApp. */
export function resumoPedido(p: Pedido) {
  const linhas = p.linhas
    .filter((l) => l.produto && l.quantidade)
    .map((l) => {
      const prod = produtos.find((x) => x.slug === l.produto);
      return `- ${prod?.nome ?? l.produto} ${l.medida}${prod?.diametros ? " mm" : ""}: ${l.quantidade} ${l.unidade}`;
    });
  const serv = p.servicos.map((s) => servicos.find((x) => x.slug === s)?.nome ?? s);
  const partes = [
    "Pedido de orçamento pelo site",
    "",
    linhas.length ? `Materiais:\n${linhas.join("\n")}` : "",
    serv.length ? `Serviços: ${serv.join(", ")}` : "",
    p.tipoObra ? `Tipo de obra: ${p.tipoObra}` : "",
    p.etapa ? `Etapa: ${p.etapa}` : "",
    p.cidade ? `Cidade da obra: ${p.cidade}` : "",
    p.prazo ? `Prazo desejado: ${new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${p.prazo}T00:00:00Z`))}` : "",
    p.anexos?.length ? `Projeto anexado: ${p.anexos.join(", ")}` : "",
    "",
    `Nome: ${p.nome}`,
    `Empresa: ${p.empresa}`,
    `E-mail: ${p.email}`,
    p.telefone ? `Telefone: ${p.telefone}` : "",
    p.comentarios ? `\nComentários: ${p.comentarios}` : "",
  ];
  return partes.filter((x, i, a) => x !== "" || (a[i - 1] ?? "") !== "").join("\n").trim();
}

export const LIMITE_ANEXOS = 4 * 1024 * 1024; // a Vercel aceita até 4,5 MB por envio
