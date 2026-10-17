"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { produtos, servicos } from "@/lib/content";
import { etapas, LIMITE_ANEXOS, resumoPedido, tiposObra, unidadesDe, type Linha, type Pedido } from "@/lib/orcamento";
import { site, whatsappLink } from "@/lib/site";
import { base } from "@/lib/asset";

const linhaVazia = (): Linha => ({ produto: "vergalhao-ca-50", medida: "", quantidade: "", unidade: "kg" });

const campo =
  "w-full min-h-[52px] bg-navy-2 px-4 text-[17px] text-white placeholder:text-metal outline-none transition-colors focus-visible:bg-tech focus-visible:outline-2 focus-visible:outline-orange";
const rotulo = "mb-2 block text-[15px] text-ink";

type Estado = { tipo: "parado" } | { tipo: "enviando" } | { tipo: "ok"; resumo: string } | { tipo: "alternativa"; resumo: string } | { tipo: "erro"; msg: string };

export default function QuoteBuilder() {
  const busca = useSearchParams();
  const [linhas, setLinhas] = useState<Linha[]>([linhaVazia()]);
  const [servs, setServs] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });
  const form = useRef<HTMLFormElement>(null);
  const topo = useRef<HTMLDivElement>(null);

  // Vem preenchido quando a pessoa clica em "Pôr no orçamento" num produto ou serviço
  useEffect(() => {
    const prod = busca.get("produto");
    const med = busca.get("medida");
    const serv = busca.get("servico");
    if (prod && produtos.some((p) => p.slug === prod)) {
      setLinhas([{ produto: prod, medida: med ?? "", quantidade: "", unidade: unidadesDe(prod)[0] }]);
    }
    if (serv && servicos.some((s) => s.slug === serv)) setServs([serv]);
  }, [busca]);

  const tamanho = useMemo(() => arquivos.reduce((a, f) => a + f.size, 0), [arquivos]);

  const mudar = (i: number, d: Partial<Linha>) =>
    setLinhas((ls) =>
      ls.map((l, k) => {
        if (k !== i) return l;
        const nova = { ...l, ...d };
        if (d.produto) {
          nova.medida = "";
          nova.unidade = unidadesDe(d.produto)[0];
        }
        return nova;
      }),
    );

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const temMaterial = linhas.some((l) => l.medida && l.quantidade);
    if (!temMaterial && servs.length === 0) {
      setEstado({ tipo: "erro", msg: "Escolha pelo menos um material com quantidade ou um serviço." });
      topo.current?.focus();
      return;
    }
    if (tamanho > LIMITE_ANEXOS) {
      setEstado({ tipo: "erro", msg: "Os arquivos passam de 4 MB. Envie o projeto depois, pelo e-mail, e mande o pedido sem anexo." });
      return;
    }
    const pedido: Pedido = {
      linhas: linhas.filter((l) => l.medida && l.quantidade),
      servicos: servs,
      tipoObra: String(fd.get("tipoObra") ?? ""),
      etapa: String(fd.get("etapa") ?? ""),
      nome: String(fd.get("nome") ?? "").trim(),
      empresa: String(fd.get("empresa") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      telefone: String(fd.get("telefone") ?? "").trim(),
      cidade: String(fd.get("cidade") ?? "").trim(),
      prazo: String(fd.get("prazo") ?? ""),
      comentarios: String(fd.get("comentarios") ?? "").trim(),
      anexos: arquivos.map((f) => f.name),
    };
    const envio = new FormData();
    envio.set("pedido", JSON.stringify(pedido));
    arquivos.forEach((f) => envio.append("anexos", f));
    setEstado({ tipo: "enviando" });
    const resumo = resumoPedido(pedido);
    try {
      const r = await fetch(`${base}/api/orcamento`, { method: "POST", body: envio });
      if (r.ok) setEstado({ tipo: "ok", resumo });
      else if ([404, 405, 501, 503].includes(r.status)) setEstado({ tipo: "alternativa", resumo });
      else setEstado({ tipo: "erro", msg: (await r.json().catch(() => null))?.erro ?? "Não foi possível enviar agora. Tente de novo ou ligue para nós." });
    } catch {
      setEstado({ tipo: "alternativa", resumo });
    }
    topo.current?.focus();
  }

  if (estado.tipo === "ok" || estado.tipo === "alternativa") {
    const wa = whatsappLink(estado.resumo);
    const mail = `mailto:${site.email}?subject=${encodeURIComponent("Pedido de orçamento pelo site")}&body=${encodeURIComponent(estado.resumo)}`;
    return (
      <div ref={topo} tabIndex={-1} className="outline-none" aria-live="polite">
        <p className="font-display text-[clamp(2.2rem,5vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white">
          {estado.tipo === "ok" ? "Pedido enviado." : "Falta um passo."}
        </p>
        <p className="mt-6 max-w-[56ch] text-[17px] text-ink">
          {estado.tipo === "ok"
            ? "Recebemos o seu pedido. A nossa equipe comercial responde pelo e-mail ou telefone que você informou."
            : "Envie o pedido abaixo pelo seu e-mail. Ele já vai escrito; se tiver o projeto, anexe antes de enviar."}
        </p>
        <pre className="mt-8 max-h-[40svh] overflow-auto whitespace-pre-wrap bg-navy-2 p-6 font-sans text-[15px] text-ink">{estado.resumo}</pre>
        <div className="mt-8 flex flex-wrap gap-4">
          {estado.tipo === "alternativa" && (
            <a href={mail} className="btn">
              Enviar por e-mail <span aria-hidden>↗</span>
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener" className={estado.tipo === "ok" ? "btn" : "btn-ghost link-line"}>
              Mandar também no WhatsApp <span aria-hidden>↗</span>
            </a>
          )}
          <a href={site.telefoneLink} className="btn-ghost link-line">
            Ligar {site.telefone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={enviar} noValidate={false} className="grid gap-16" aria-describedby="orc-status">
      <div ref={topo} tabIndex={-1} id="orc-status" aria-live="polite" className="outline-none">
        {estado.tipo === "erro" && <p className="bg-orange px-5 py-4 text-[17px] text-navy">{estado.msg}</p>}
      </div>

      {/* 1. Materiais, em forma de romaneio */}
      <fieldset>
        <legend className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">
          <span className="tnum mr-3 text-orange">1</span>Materiais
        </legend>
        <p className="mt-2 text-[15px] text-ink">Monte a lista como um romaneio. Deixe em branco se só precisa de serviço.</p>
        <div className="mt-6 grid gap-3">
          {linhas.map((l, i) => {
            const prod = produtos.find((p) => p.slug === l.produto)!;
            return (
              <div key={i} className="grid grid-cols-2 gap-3 md:grid-cols-[2fr_1.2fr_1fr_1fr_auto]">
                <label className="col-span-2 md:col-span-1">
                  <span className="sr-only">Material da linha {i + 1}</span>
                  <select className={campo} value={l.produto} onChange={(e) => mudar(i, { produto: e.target.value })}>
                    {produtos.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Medida da linha {i + 1}</span>
                  <select className={campo} value={l.medida} onChange={(e) => mudar(i, { medida: e.target.value })}>
                    <option value="">{prod.diametros ? "Bitola (mm)" : "Medida"}</option>
                    {prod.medidas.map((m) => (
                      <option key={m} value={m}>
                        {m}
                        {prod.diametros ? " mm" : ""}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Quantidade da linha {i + 1}</span>
                  <input
                    className={`${campo} tnum`}
                    inputMode="decimal"
                    placeholder="Quantidade…"
                    value={l.quantidade}
                    onChange={(e) => mudar(i, { quantidade: e.target.value.replace(/[^\d.,]/g, "") })}
                    autoComplete="off"
                  />
                </label>
                <label>
                  <span className="sr-only">Unidade da linha {i + 1}</span>
                  <select className={campo} value={l.unidade} onChange={(e) => mudar(i, { unidade: e.target.value })}>
                    {unidadesDe(l.produto).map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setLinhas((ls) => (ls.length > 1 ? ls.filter((_, k) => k !== i) : [linhaVazia()]))}
                  className="min-h-[52px] px-4 text-[15px] text-metal transition-colors hover:text-white"
                  aria-label={`Remover a linha ${i + 1}`}
                >
                  Remover
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={() => setLinhas((ls) => [...ls, linhaVazia()])} className="btn-ghost link-line mt-4">
          + Adicionar outro material
        </button>
      </fieldset>

      {/* 2. Serviços e obra */}
      <fieldset>
        <legend className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">
          <span className="tnum mr-3 text-orange">2</span>Serviços e obra
        </legend>
        <div className="mt-6 flex flex-wrap gap-2">
          {servicos.map((s) => {
            const on = servs.includes(s.slug);
            return (
              <label
                key={s.slug}
                className={`flex min-h-[52px] cursor-pointer items-center gap-3 px-5 text-[17px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-orange ${
                  on ? "bg-orange text-navy" : "bg-navy-2 text-white hover:bg-tech"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setServs((v) => (on ? v.filter((x) => x !== s.slug) : [...v, s.slug]))}
                />
                {s.nome}
              </label>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label>
            <span className={rotulo}>Tipo de obra</span>
            <select name="tipoObra" className={campo} defaultValue="">
              <option value="">Escolha…</option>
              {tiposObra.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            <span className={rotulo}>Etapa</span>
            <select name="etapa" className={campo} defaultValue="">
              <option value="">Escolha…</option>
              {etapas.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            <span className={rotulo}>Prazo desejado</span>
            <input type="date" name="prazo" className={campo} />
          </label>
          <label className="md:col-span-3">
            <span className={rotulo}>Projeto, croqui ou lista de peças (PDF, DWG ou imagem, até 4 MB no total)</span>
            <input
              type="file"
              multiple
              accept=".pdf,.dwg,.dxf,image/*"
              onChange={(e) => setArquivos(Array.from(e.target.files ?? []))}
              className="block w-full bg-navy-2 p-4 text-[15px] text-ink file:mr-4 file:min-h-[44px] file:border-0 file:bg-tech file:px-4 file:text-white"
            />
            {tamanho > LIMITE_ANEXOS && <span className="mt-2 block text-[15px] text-orange">Os arquivos passam de 4 MB. Envie o projeto depois, por e-mail.</span>}
          </label>
        </div>
      </fieldset>

      {/* 3. Contato */}
      <fieldset>
        <legend className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] text-white">
          <span className="tnum mr-3 text-orange">3</span>Seus dados
        </legend>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label>
            <span className={rotulo}>Nome *</span>
            <input name="nome" required autoComplete="name" className={campo} placeholder="Seu nome…" />
          </label>
          <label>
            <span className={rotulo}>Empresa *</span>
            <input name="empresa" required autoComplete="organization" className={campo} placeholder="Construtora ou empresa…" />
          </label>
          <label>
            <span className={rotulo}>E-mail *</span>
            <input name="email" type="email" required autoComplete="email" spellCheck={false} className={campo} placeholder="voce@empresa.com.br…" />
          </label>
          <label>
            <span className={rotulo}>Telefone ou WhatsApp</span>
            <input name="telefone" type="tel" autoComplete="tel" inputMode="tel" className={campo} placeholder="(31) 9…" />
          </label>
          <label className="md:col-span-2">
            <span className={rotulo}>Cidade da obra</span>
            <input name="cidade" autoComplete="address-level2" className={campo} placeholder="Ex.: Belo Horizonte, MG…" />
          </label>
          <label className="md:col-span-2">
            <span className={rotulo}>Comentários</span>
            <textarea name="comentarios" rows={4} className={`${campo} py-3`} placeholder="Algo que a nossa engenharia precisa saber…" />
          </label>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn !min-h-[64px] !px-8" disabled={estado.tipo === "enviando"} data-magnetic>
          {estado.tipo === "enviando" ? "Enviando…" : "Enviar pedido de orçamento"} <span aria-hidden>↗</span>
        </button>
        <p className="text-[15px] text-ink">* Campos obrigatórios. Usamos os seus dados só para responder ao pedido.</p>
      </div>
    </form>
  );
}
