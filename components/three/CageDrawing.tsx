// Desenho técnico de uma armação de pilar (elevação), usado quando o 3D não roda.
export default function CageDrawing({ className = "" }: { className?: string }) {
  const estribos = Array.from({ length: 13 }, (_, i) => 60 + i * 40);
  return (
    <svg viewBox="0 0 320 620" className={className} role="img" aria-label="Desenho técnico de uma armação de pilar com estribos e barras longitudinais">
      <g stroke="#9aa6b2" strokeWidth="5" fill="none" strokeLinecap="round">
        <line x1="110" y1="30" x2="110" y2="590" />
        <line x1="210" y1="30" x2="210" y2="590" />
      </g>
      <g stroke="#dfe5eb" strokeWidth="3.2" fill="none" strokeLinecap="round">
        {estribos.map((y) => (
          <g key={y}>
            <line x1="100" y1={y} x2="220" y2={y} />
            <path d={`M100 ${y} l14 -12`} />
          </g>
        ))}
      </g>
      <g stroke="#ff6b16" strokeWidth="1.5" fill="none">
        <line x1="260" y1="60" x2="260" y2="100" />
        <line x1="252" y1="60" x2="268" y2="60" />
        <line x1="252" y1="100" x2="268" y2="100" />
        <line x1="100" y1="608" x2="220" y2="608" />
        <line x1="100" y1="600" x2="100" y2="616" />
        <line x1="220" y1="600" x2="220" y2="616" />
      </g>
      <g fill="#ff6b16" fontFamily="var(--font-inter)" fontSize="15">
        <text x="274" y="86">c/ 40</text>
      </g>
    </svg>
  );
}
