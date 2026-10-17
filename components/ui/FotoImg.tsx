import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Foto } from "@/lib/fotos";

// Foto do catálogo (lib/fotos.ts), preenchendo o quadro em volta.
export default function FotoImg({ foto, sizes, className = "", prioridade = false }: { foto: Foto; sizes: string; className?: string; prioridade?: boolean }) {
  return <Image src={asset(foto.src)} alt={foto.alt} fill sizes={sizes} priority={prioridade} className={`object-cover ${className}`} />;
}
