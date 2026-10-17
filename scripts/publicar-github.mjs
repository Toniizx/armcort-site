// Publica a versão estática do site no GitHub Pages (branch gh-pages deste repositório).
// Uso: npm run publicar-github
// O formulário de orçamento, sem servidor, manda o pedido pelo e-mail da própria pessoa.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const BASE = "/armcort-site";
const api = path.join(raiz, "app", "api");
const apiFora = path.join(raiz, ".api-fora");
const out = path.join(raiz, "out");
const rodar = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

const remoto = execSync("git remote get-url origin", { encoding: "utf8" }).trim();

// A rota do orçamento precisa de servidor: fica de fora só durante esta montagem.
if (fs.existsSync(api)) fs.renameSync(api, apiFora);
try {
  fs.rmSync(out, { recursive: true, force: true });
  rodar("npx next build", { env: { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: BASE } });
} finally {
  if (fs.existsSync(apiFora)) fs.renameSync(apiFora, api);
}

fs.writeFileSync(path.join(out, ".nojekyll"), "");
rodar("git init -q", { cwd: out });
rodar("git checkout -q -b gh-pages", { cwd: out });
rodar("git add -A", { cwd: out });
rodar(`git commit -q -m "Publica o site (${new Date().toISOString().slice(0, 16).replace("T", " ")})"`, { cwd: out });
rodar(`git push -f "${remoto}" gh-pages`, { cwd: out });
console.log("\nPublicado. Em 1 ou 2 minutos: https://toniizx.github.io" + BASE + "/");
