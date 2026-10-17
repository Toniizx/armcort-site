// Desenhos técnicos das etapas "da barra à obra", usados no celular e quando o 3D não roda.
const aco = "#b9c2d3";
const destaque = "#ffffff";

function Barra({ y, x1 = 30, x2 = 370, cor = aco }: { y: number; x1?: number; x2?: number; cor?: string }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={cor} strokeWidth="10" strokeLinecap="round" />
      {Array.from({ length: Math.floor((x2 - x1) / 14) }, (_, i) => (
        <line key={i} x1={x1 + 8 + i * 14} y1={y - 6} x2={x1 + 14 + i * 14} y2={y + 6} stroke="#172447" strokeWidth="1.6" opacity="0.45" />
      ))}
    </g>
  );
}

function Estribo({ x, y, s = 1, cor = aco }: { x: number; y: number; s?: number; cor?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={cor} strokeWidth={7 / s} strokeLinecap="round" strokeLinejoin="round">
      <rect x="0" y="0" width="120" height="90" rx="6" />
      <path d="M0 0 l26 26 M12 0 l26 26" />
    </g>
  );
}

export const desenhos = [
  // 1. barra reta
  <svg key="1" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="Uma barra de vergalhão reta">
    <Barra y={100} />
    <g stroke={aco} strokeWidth="1.5">
      <line x1="30" y1="140" x2="370" y2="140" />
      <line x1="30" y1="132" x2="30" y2="148" />
      <line x1="370" y1="132" x2="370" y2="148" />
    </g>
    <text x="200" y="168" textAnchor="middle" fill={aco} fontSize="15" fontFamily="var(--font-inter)">
      barra de 12 m
    </text>
  </svg>,
  // 2. cortada
  <svg key="2" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="A barra cortada na medida do projeto">
    <Barra y={100} x1={30} x2={240} cor={destaque} />
    <Barra y={100} x1={262} x2={370} />
    <line x1="251" y1="50" x2="251" y2="150" stroke={destaque} strokeWidth="2.5" strokeDasharray="6 5" />
    <g stroke={destaque} strokeWidth="1.5">
      <line x1="30" y1="140" x2="240" y2="140" />
      <line x1="30" y1="132" x2="30" y2="148" />
      <line x1="240" y1="132" x2="240" y2="148" />
    </g>
    <text x="135" y="168" textAnchor="middle" fill={destaque} fontSize="15" fontFamily="var(--font-inter)">
      medida do projeto
    </text>
  </svg>,
  // 3. dobrada
  <svg key="3" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="A barra dobrada em estribo">
    <Estribo x={120} y={50} cor={destaque} />
    <path d="M128 58 A 18 18 0 0 1 146 50" fill="none" stroke={aco} strokeWidth="1.5" />
    <text x="265" y="62" fill={aco} fontSize="15" fontFamily="var(--font-inter)">
      90°
    </text>
  </svg>,
  // 4. repetida
  <svg key="4" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="Vários estribos iguais">
    {[0, 1, 2, 3, 4].map((i) => (
      <Estribo key={i} x={70 + i * 38} y={40 + i * 14} s={0.9} cor={i === 4 ? destaque : aco} />
    ))}
  </svg>,
  // 5. montada
  <svg key="5" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="Estribos e barras montados em armação">
    {[52, 78, 104, 130, 156].map((y) => (
      <line key={y} x1="40" y1={y} x2="360" y2={y} stroke={y === 52 || y === 156 ? destaque : aco} strokeWidth="8" strokeLinecap="round" />
    ))}
    {Array.from({ length: 11 }, (_, i) => (
      <rect key={i} x={52 + i * 28} y="42" width="10" height="124" rx="3" fill="none" stroke={aco} strokeWidth="4" />
    ))}
  </svg>,
  // 6. entregue
  <svg key="6" viewBox="0 0 400 200" className="h-full w-full" role="img" aria-label="Caminhão levando a armação pronta para a obra">
    <g fill="none" stroke={aco} strokeWidth="4" strokeLinejoin="round">
      <rect x="40" y="96" width="230" height="44" />
      <path d="M270 110 h50 l26 22 v8 h-76 z" />
      <path d="M296 112 v18 h40" />
    </g>
    {[86, 230, 318].map((x) => (
      <circle key={x} cx={x} cy="148" r="15" fill="#172447" stroke={destaque} strokeWidth="4" />
    ))}
    {[64, 74, 84].map((y) => (
      <line key={y} x1="52" y1={y} x2="258" y2={y} stroke={destaque} strokeWidth="6" strokeLinecap="round" />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={60 + i * 23} y="58" width="6" height="32" fill="none" stroke={aco} strokeWidth="2.5" />
    ))}
  </svg>,
];
