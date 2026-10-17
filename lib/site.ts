// Dados da empresa. Só o que está confirmado no site antigo (armcort.com.br) ou nos cadastros públicos.
// O que ainda falta confirmar com a ARM-CORT fica como null e não aparece na tela.

export const site = {
  nome: "ARM-CORT",
  razaoSocial: "Arm-Cort Indústria e Comércio de Armação Ltda",
  cnpj: "15.230.087/0001-60",
  url: "https://armcort.com.br",
  descricao:
    "Corte, dobra e montagem de aço para construção civil em Confins, MG. Vergalhões CA-50 e CA-60, telas, arames e pregos, com entrega programada conforme o cronograma da obra.",
  telefone: "(31) 3686-6058",
  telefoneLink: "tel:+553136866058",
  email: "vendas@armcort.com.br",
  // [confirmar com o cliente] número do WhatsApp comercial, só dígitos com DDI. Ex.: "5531999999999".
  whatsapp: null as string | null,
  // [confirmar com o cliente] horário de atendimento.
  horario: null as string | null,
  endereco: {
    rua: "R. Vila Otília, 270",
    bairro: "Tavares",
    cidade: "Confins",
    uf: "MG",
    cep: "33500-000",
  },
  mapa: "https://www.google.com/maps/search/?api=1&query=R.+Vila+Ot%C3%ADlia%2C+270%2C+Tavares%2C+Confins+-+MG%2C+33500-000",
  facebook:
    "https://www.facebook.com/Armcort-Ind%C3%BAstria-Com%C3%A9rcio-De-Arma%C3%A7%C3%A3o-Ltda-1031466153539094/",
  instagram: "https://www.instagram.com/armcortarmacao/",
  instagramUser: "@armcortarmacao",
  pagamento: "Aceitamos cartões de crédito e débito.",
} as const;

export const enderecoLinha = `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade}/${site.endereco.uf}, ${site.endereco.cep}`;

export function whatsappLink(texto: string) {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}

// Números da estrutura, todos do site antigo.
export const numeros = {
  areaTotal: 12000,
  areaCoberta: 3500,
  porticos: 3,
};

export const navegacao = [
  { href: "/", rotulo: "Início" },
  { href: "/a-arm-cort", rotulo: "A ARM-CORT" },
  { href: "/solucoes", rotulo: "Soluções" },
  { href: "/estrutura", rotulo: "Nossa Estrutura" },
  { href: "/obras", rotulo: "Obras" },
  { href: "/contato", rotulo: "Contato" },
] as const;
