import { asset } from "@/lib/asset";

// Logo oficial da ARM-CORT (arquivo enviado pelo cliente). "branca" é a versão para fundos azuis.
export default function Logo({ variante = "cor", className = "" }: { variante?: "cor" | "branca"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(variante === "cor" ? "/marca/logo-armcort.png" : "/marca/logo-armcort-branca.png")}
      alt="ARM-CORT"
      width={539}
      height={174}
      translate="no"
      className={`h-auto ${className}`}
    />
  );
}
