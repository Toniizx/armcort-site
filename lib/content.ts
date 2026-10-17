// Conteúdo das soluções e dos produtos. Tudo tirado do site antigo e do Instagram da ARM-CORT.
// Não acrescente números, normas ou capacidades sem confirmar com o cliente.

export type Servico = {
  slug: "corte" | "dobra" | "montagem" | "sob-medida";
  numero: string;
  nome: string;
  titulo: string;
  resumo: string;
  texto: string;
  inclui: string[];
  pecas?: string[];
  orcamento: string;
};

export const servicos: Servico[] = [
  {
    slug: "corte",
    numero: "01",
    nome: "Corte de aço",
    titulo: "Cada barra na medida do projeto",
    resumo: "Vergalhões cortados conforme o projeto, programados pelo andamento da sua obra.",
    texto:
      "A engenharia confere o projeto e as formas antes de a primeira barra entrar na máquina. O corte é programado pelo andamento da obra, e cada lote sai identificado, com planilha e romaneio para a gestão do canteiro.",
    inclui: [
      "Conferência de projetos e formas",
      "Produção programada pelo andamento da obra",
      "Planilhas e romaneios para a gestão da obra",
      "Peças identificadas, fáceis de armazenar e de executar",
      "Menos perda de aço e canteiro mais organizado",
    ],
    orcamento: "Corte de aço",
  },
  {
    slug: "dobra",
    numero: "02",
    nome: "Dobra de aço",
    titulo: "Do vergalhão reto à peça pronta",
    resumo: "Estribos e peças dobradas conforme o projeto, respeitando as medidas e a norma de dobramento.",
    texto:
      "Vergalhões retos viram estribos, ganchos e peças dobradas exatamente como estão no projeto, respeitando as medidas e a norma de dobramento. Tudo chega etiquetado, com romaneio detalhado para conferir o aço no recebimento.",
    inclui: [
      "Peças produzidas conforme o projeto",
      "Respeito às medidas e à norma de dobramento",
      "Etiqueta de identificação em cada peça",
      "Romaneio detalhado em cada entrega",
      "Assessoria técnica para adaptar a obra ao sistema",
    ],
    orcamento: "Dobra de aço",
  },
  {
    slug: "montagem",
    numero: "03",
    nome: "Montagem de armações",
    titulo: "A armação chega pronta para a forma",
    resumo: "Corte, dobra e pré-montagem das armações previstas no projeto ou no croqui.",
    texto:
      "Transformamos o aço convencional em elementos estruturais prontos para uso. As armações previstas no projeto ou no croqui saem da fábrica cortadas, dobradas e pré-montadas, etiquetadas e entregues conforme as etapas da obra.",
    inclui: [
      "Corte, dobra e pré-montagem",
      "Peças identificadas com etiquetas",
      "Entrega programada conforme as etapas do projeto",
      "Melhor aproveitamento do espaço no canteiro",
      "Acompanhamento da equipe técnica",
    ],
    pecas: ["Estacas", "Tubulões", "Sapatas", "Paredes diafragma e lamelas", "Blocos", "Vigas e cintas", "Pilares"],
    orcamento: "Montagem de armações",
  },
  {
    slug: "sob-medida",
    numero: "04",
    nome: "Produção sob medida",
    titulo: "Peças soldadas para o seu projeto",
    resumo: "Solução completa de corte, dobra e pré-montagem, com peça soldada e logística própria.",
    texto:
      "Para o que não sai de catálogo: estribos, pilares, estacas e fundações produzidos sob medida, com peças soldadas, assessoria técnica especializada e entrega pela nossa própria frota.",
    inclui: [
      "Solução completa: corte, dobra e pré-montagem",
      "Qualidade do produto soldado",
      "Agilidade na entrega, com logística própria",
      "Menos mão de obra e menos perda de aço",
      "Menos risco de acidentes na execução",
    ],
    pecas: ["Estribos", "Pilares", "Estacas soldadas", "Sapata e fuste", "Fundações armadas e soldadas", "Telas"],
    orcamento: "Produção sob medida",
  },
];

export type Produto = {
  slug: string;
  nome: string;
  curto: string;
  descricao: string;
  norma?: string;
  medidas: string[];
  unidade: string;
  // Diâmetros em mm, para o comparador de bitolas.
  diametros?: number[];
};

export const produtos: Produto[] = [
  {
    slug: "vergalhao-ca-50",
    nome: "Vergalhão CA-50",
    curto: "CA-50",
    descricao:
      "Barras de aço com superfície nervurada, que aumenta a aderência ao concreto. Produzidas por laminação a quente e usadas em armaduras para concreto armado.",
    norma: "Comercializamos apenas vergalhões produzidos em conformidade com a NBR 7480:2007.",
    medidas: ["6,3", "8,0", "10,0", "12,5", "16,0", "20,0", "22,0", "25,0", "32,0"],
    unidade: "kg ou barra",
    diametros: [6.3, 8, 10, 12.5, 16, 20, 22, 25, 32],
  },
  {
    slug: "vergalhao-ca-60",
    nome: "Vergalhão CA-60",
    curto: "CA-60",
    descricao: "Vergalhão nervurado que se destaca pela alta resistência.",
    medidas: ["4,2", "5,0"],
    unidade: "kg ou barra",
    diametros: [4.2, 5],
  },
  {
    slug: "telas-eletrosoldadas",
    nome: "Telas eletrosoldadas",
    curto: "Telas",
    descricao: "Telas de aço eletrosoldadas, produzidas com tecnologia avançada, nas malhas Q-92 e Q-138.",
    medidas: ["Q-92", "Q-138"],
    unidade: "unidade",
  },
  {
    slug: "arames",
    nome: "Arame recozido",
    curto: "Arames",
    descricao: "Arame de aço de baixo teor de carbono, produzido por trefilação do fio-máquina.",
    medidas: ["PG 7", "PG 18"],
    unidade: "kg",
  },
  {
    slug: "pregos",
    nome: "Pregos",
    curto: "Pregos",
    descricao: "Prego com cabeça, corpo liso, cabeça cônica com padrão xadrez e ponta diamante.",
    medidas: ["15x15", "17x21", "18x30"],
    unidade: "kg",
  },
];

export const processo = [
  {
    etapa: "Aço",
    titulo: "A matéria-prima chega ao pátio",
    texto: "O aço chega ao nosso pátio, num terreno de 12 mil m². A engenharia confere o seu projeto antes de qualquer corte.",
  },
  {
    etapa: "Corte",
    titulo: "A barra ganha medida",
    texto: "O corte segue o projeto conferido e é programado pelo andamento da sua obra, para não sobrar aço no canteiro.",
  },
  {
    etapa: "Dobra",
    titulo: "A barra ganha forma",
    texto: "Estribos, ganchos e peças dobradas conforme o projeto, respeitando as medidas e a norma de dobramento.",
  },
  {
    etapa: "Montagem",
    titulo: "As peças viram estrutura",
    texto: "Estacas, sapatas, blocos, vigas e pilares pré-montados, etiquetados e prontos para a forma.",
  },
  {
    etapa: "Obra",
    titulo: "Entregue no dia certo",
    texto: "Frota própria e entrega programada pelo cronograma da obra, no modelo just in time, com romaneio detalhado para conferir no recebimento.",
  },
];

export const diferenciais = [
  { titulo: "Entrega programada", texto: "Entregamos conforme o cronograma da obra, no modelo just in time, para reduzir o desperdício." },
  { titulo: "Projeto sob medida", texto: "Engenheiros, técnicos em edificações e arquitetos analisam cada projeto e buscam o melhor aproveitamento do aço." },
  { titulo: "Segurança e qualidade", texto: "Departamento de segurança, treinamentos e práticas seguras em campo, com foco em melhoria contínua." },
  { titulo: "Equipe treinada", texto: "Plano de carreira e cursos de planejamento e controle, responsabilidade civil, liderança e desenvolvimento interpessoal." },
  { titulo: "Atitude sustentável", texto: "Separação e destinação correta dos resíduos e ações internas de conscientização sobre o uso dos recursos." },
  { titulo: "Atendimento próximo", texto: "Rapidez de entrega, qualidade do serviço e pós-venda com o apoio da equipe técnica." },
];

// Clientes que aparecem no site antigo. [confirmar com o cliente] autorização para mostrar os nomes.
export const clientes = ["Via Sul", "Inpar", "Votorantim", "Patrimar", "M.Roscoe", "Marco XX", "CSN", "Planar Equipamentos"];
export const mostrarClientes = false;
