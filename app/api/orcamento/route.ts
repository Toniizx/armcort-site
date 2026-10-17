import { NextResponse } from "next/server";
import { LIMITE_ANEXOS, resumoPedido, type Pedido } from "@/lib/orcamento";

// Recebe o pedido de orçamento e manda por e-mail pela Resend (resend.com).
// Variáveis na Vercel: RESEND_API_KEY, ORCAMENTO_PARA (ex.: vendas@armcort.com.br) e ORCAMENTO_DE
// (remetente de um domínio verificado na Resend, ex.: "Site ARM-CORT <site@armcort.com.br>").
// Sem elas, responde 503 e o site oferece mandar o pedido pelo e-mail da própria pessoa.

export const runtime = "nodejs";

const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function POST(req: Request) {
  const chave = process.env.RESEND_API_KEY;
  const para = process.env.ORCAMENTO_PARA;
  const de = process.env.ORCAMENTO_DE;
  if (!chave || !para || !de) return NextResponse.json({ erro: "Envio por e-mail ainda não configurado." }, { status: 503 });

  let pedido: Pedido;
  let anexos: File[] = [];
  try {
    const fd = await req.formData();
    pedido = JSON.parse(String(fd.get("pedido") ?? "{}"));
    anexos = fd.getAll("anexos").filter((a): a is File => a instanceof File && a.size > 0);
  } catch {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  if (!pedido.nome || !pedido.empresa || !emailValido(pedido.email ?? "")) {
    return NextResponse.json({ erro: "Preencha nome, empresa e um e-mail válido." }, { status: 400 });
  }
  if (!pedido.linhas?.length && !pedido.servicos?.length) {
    return NextResponse.json({ erro: "Escolha pelo menos um material ou um serviço." }, { status: 400 });
  }
  const total = anexos.reduce((a, f) => a + f.size, 0);
  if (total > LIMITE_ANEXOS) return NextResponse.json({ erro: "Os arquivos passam de 4 MB." }, { status: 413 });

  const attachments = await Promise.all(
    anexos.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
  );

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: de,
      to: [para],
      reply_to: pedido.email,
      subject: `Orçamento pelo site: ${pedido.empresa} (${pedido.nome})`,
      text: resumoPedido(pedido),
      attachments,
    }),
  });

  if (!r.ok) return NextResponse.json({ erro: "Não foi possível enviar agora. Tente de novo ou ligue para nós." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
