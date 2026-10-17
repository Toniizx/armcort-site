# Obras do portfólio

Cada obra é um arquivo `<slug>.json` nesta pasta. As fotos dela ficam em `public/obras/<slug>/`.
Para começar uma obra, copie o `_modelo.json` com outro nome. Arquivos que começam com `_` não entram no site.

## Quando uma obra aparece no site

Só com **tudo** isto preenchido:

- `status` igual a `"publicada"`;
- pelo menos uma `comprovacao` da participação da ARM-CORT;
- `autorizacaoPublicacao` preenchida (quem autorizou e quando);
- fotos reais, todas com `"autorizada": true`.

Se faltar qualquer item, a obra fica guardada e não aparece. Com nenhuma obra publicada, a página Obras mostra a seção "Da nossa indústria para a sua obra" e o início não mostra a vitrine de obras.

## Situações (`status`)

- `pesquisa`: só um indício.
- `pendente`: a ARM-CORT confirmou, mas faltam fotos ou autorização.
- `aprovada`: tudo certo, aguardando entrar no ar.
- `publicada`: no ar.

## Participação (`participacao`)

Os valores aceitos são:

- `fornecimento`
- `corte`
- `dobra`
- `pre-montagem`
- `montagem`

**Regra:** não atribua à ARM-CORT uma obra só porque a construtora é cliente ou parceira. A participação precisa estar comprovada.

A pesquisa feita até agora está em `../../OBRAS.md`.
