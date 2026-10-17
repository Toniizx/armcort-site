// Prefixo dos arquivos de public/ quando o site roda numa subpasta (GitHub Pages: /armcort-site).
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (caminho: string) => `${base}${caminho}`;
