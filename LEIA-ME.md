# Site da ARM-CORT

Feito em Next.js com React Three Fiber, GSAP, Lenis e Tailwind.
O plano e o briefing ficam na pasta de cima: `../PLANO-SITE.md` e `../BRIEFING.md`.

## Rodar no PC

```
npm install
npm run dev
```

O site abre em http://localhost:3010. No painel do Claude, a configuração se chama `armcort-site`.

Para conferir antes de publicar:

```
npm run typecheck
npm run build
```

## Prévia no GitHub Pages (por enquanto)

- **Código:** https://github.com/Toniizx/armcort-site (branch `main`).
- **Site no ar:** https://toniizx.github.io/armcort-site/
- **Para atualizar a prévia** depois de mudar algo, rode `npm run publicar-github`. O comando:
  - monta a versão estática;
  - envia para o branch `gh-pages`;
  - deixa o site atualizado em 1 ou 2 minutos.
- **O que não funciona no GitHub Pages**, porque ele não tem servidor:
  - o envio do orçamento: o formulário manda o pedido pelo e-mail da própria pessoa;
  - os redirecionamentos dos endereços antigos.

  Na Vercel, as duas coisas funcionam.
- O código no `main` vai com `git push` normal. A prévia só muda com `npm run publicar-github`.

No outro PC, clone com:

```
git clone https://github.com/Toniizx/armcort-site.git data/clientes/arm-cort/site
```

Depois rode `npm install` dentro da pasta.

## Publicar de vez (Vercel)

1. O repositório já existe: `Toniizx/armcort-site`. Ele fica fora do Git do Prospecta.
2. Importe o repositório na Vercel. Ela reconhece o Next.js sozinha.
3. Em **Settings → Environment Variables**, cadastre as três variáveis do envio de orçamento por e-mail:
   - `RESEND_API_KEY`: a chave da conta na resend.com;
   - `ORCAMENTO_PARA`: quem recebe os pedidos (ex.: `vendas@armcort.com.br`);
   - `ORCAMENTO_DE`: o remetente, de um domínio verificado na Resend (ex.: `Site ARM-CORT <site@armcort.com.br>`).

   Sem essas variáveis, o formulário continua funcionando: a pessoa envia o pedido pelo próprio e-mail, já escrito.
4. Aponte o domínio `armcort.com.br` para a Vercel. **Atenção:** troque só os registros do site (A/CNAME). Os registros de e-mail (MX) ficam como estão, para o vendas@ não parar.
5. Os endereços do site antigo já redirecionam para as páginas novas (`next.config.ts`).

## Onde mudar cada coisa

| O quê | Onde |
|---|---|
| Telefone, e-mail, endereço, **WhatsApp** e horário | `lib/site.ts`. WhatsApp e horário estão vazios até o cliente confirmar. Preenchidos, os botões aparecem sozinhos. |
| Textos dos serviços e produtos, bitolas, diferenciais | `lib/content.ts` |
| Mostrar os nomes dos clientes | `lib/content.ts` → `mostrarClientes` (só com autorização) |
| Obras | `content/obras/` (ver o `LEIA-ME.md` de lá) |
| Fotos e vídeos | `public/media/` |
| Comercial de 30 s da página inicial | `public/media/comercial-30s.mp4` e a capa `comercial-30s.jpg`; a seção é `components/sections/Comercial.tsx`. O vídeo sai do projeto `../video` (`npm run render -- --curta` e `npm run som -- <vídeo> --curta`). |
| Cores e tamanhos de letra | `app/globals.css` (bloco `@theme`) |
| Logo | `components/layout/Wordmark.tsx`. Por enquanto é provisório, em texto. Trocar pelo logo oficial em vetor. |

## Partes do site

- **Página inicial** (`app/page.tsx`):
  1. abertura com a estaca em 3D;
  2. a barra que vira armação (3D preso à rolagem), com o aviso "Role para baixo";
  3. o comercial de 30 s (toca sem som quando aparece; "Ouvir com som" volta ao começo com som);
  4. os 4 serviços, cada um com a sua interação;
  5. o processo na horizontal;
  6. a fábrica;
  7. os produtos com o comparador de bitolas;
  8. o fechamento em 3D.
- **3D** (`components/three/`): as peças são geradas por código. Nenhum arquivo 3D é baixado.
  - No celular, as cenas ficam mais leves.
  - Com "reduzir movimento" ligado, ou sem WebGL, aparece um desenho técnico parado no lugar.
- **Orçamento** (`components/QuoteBuilder.tsx` e `app/api/orcamento/route.ts`):
  - a pessoa monta um romaneio de materiais, escolhe os serviços e anexa o projeto (até 4 MB);
  - os botões "Pôr no orçamento" já abrem o formulário com o item escolhido.
