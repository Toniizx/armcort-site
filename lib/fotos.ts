// Fotos reais da ARM-CORT: as do site antigo (armcort.com.br) e as enviadas para este projeto.
// Cada uma aparece uma vez por página. Fotos maiores do site antigo estão no servidor dele, se precisar de mais resolução.

export type Foto = { src: string; alt: string; w: number; h: number };

export const fotos = {
  galpao: { src: "/media/fotos/galpao-porticos.jpg", alt: "Galpão da ARM-CORT com pórticos amarelos e vergalhões no chão", w: 710, h: 575 },
  solda: { src: "/media/fotos/solda-faiscas.jpg", alt: "Soldadores da ARM-CORT trabalhando numa armação, com faíscas", w: 710, h: 575 },
  munckEquipe: { src: "/media/fotos/munck-armacoes-equipe.jpg", alt: "Caminhão com guindaste da ARM-CORT levantando armações, com a equipe acompanhando", w: 710, h: 575 },
  carregamento: { src: "/media/fotos/carregamento-armacoes.jpg", alt: "Funcionário preparando armações para o içamento no caminhão", w: 495, h: 400 },
  etiqueta: { src: "/media/fotos/armacao-etiqueta.jpg", alt: "Armação de aço com a etiqueta de identificação da peça", w: 495, h: 400 },
  munckArmacoes: { src: "/media/fotos/munck-sobre-armacoes.jpg", alt: "Braço do guindaste sobre armações prontas no pátio", w: 495, h: 400 },
  entrega: { src: "/media/fotos/entrega-munck.jpg", alt: "Funcionário operando o guindaste do caminhão carregado de armações", w: 495, h: 400 },
  estacasSolda: { src: "/media/fotos/estacas-solda.jpg", alt: "Equipe soldando armações de estaca no galpão", w: 495, h: 400 },
  estacasProducao: { src: "/media/fotos/estacas-producao.jpg", alt: "Funcionário entre armações de estaca prontas no galpão", w: 495, h: 400 },
  montagem: { src: "/media/fotos/montagem-equipe.jpg", alt: "Três funcionários montando uma armação de pilar", w: 495, h: 400 },
  vergalhoes: { src: "/media/fotos/vergalhoes-close.jpg", alt: "Vergalhões nervurados de perto", w: 495, h: 400 },
  patio: { src: "/media/patio.jpg", alt: "Pátio da ARM-CORT com bobinas de aço e caminhão carregado saindo do galpão", w: 1441, h: 1921 },
} satisfies Record<string, Foto>;

export const fotoDoServico: Record<string, Foto> = {
  corte: fotos.vergalhoes,
  dobra: fotos.etiqueta,
  montagem: fotos.montagem,
  "sob-medida": fotos.estacasSolda,
};

export const clientesLogos = [
  { nome: "Via Sul", src: "/media/clientes/viasul.jpg" },
  { nome: "Inpar", src: "/media/clientes/impar.jpg" },
  { nome: "Votorantim", src: "/media/clientes/votorantim.jpg" },
  { nome: "Patrimar", src: "/media/clientes/patrimar.jpg" },
  { nome: "M.Roscoe", src: "/media/clientes/mroscoe.jpg" },
  { nome: "Marco XX", src: "/media/clientes/marcoxx.jpg" },
  { nome: "CSN", src: "/media/clientes/csn.jpg" },
  { nome: "Planar Equipamentos", src: "/media/clientes/planar.jpg" },
];
