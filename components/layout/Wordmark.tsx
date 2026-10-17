// Assinatura provisória em texto. [trocar pelo logo oficial em vetor quando a ARM-CORT enviar]
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span translate="no" className={`inline-flex items-center font-display text-[19px] font-bold uppercase leading-none tracking-[-0.02em] md:text-[22px] ${className}`}>
      ARM
      <span aria-hidden className="mx-[0.12em] inline-block h-[0.16em] w-[0.5em] -skew-x-[30deg] bg-orange" />
      <span className="sr-only">-</span>
      CORT
    </span>
  );
}
