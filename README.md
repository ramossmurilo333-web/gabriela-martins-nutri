# Landing page — Gabriela Martins, Nutricionista

Site estático em HTML, CSS e JavaScript puros (sem build). Funciona direto no Vercel:
é só subir a pasta no GitHub e importar o repositório.

## Estrutura

```
index.html         todas as seções e textos
css/style.css      estilos (cores, fontes, layout e versão celular)
js/config.js       ← WhatsApp, Instagram, CRN e fotos (troque aqui)
js/main.js         menu, botões de WhatsApp, fotos, seção interativa e animações
assets/fotos/      fotos da Gabriela (tiradas do Instagram dela)
assets/img/        monograma GM (monograma-gm.svg) e ícone da aba (favicon.svg)
```

## O que trocar antes de publicar (passo a passo)

1. **WhatsApp** — já configurado em `js/config.js` com o número do WhatsApp Business da
   Gabriela (5521969706219, o mesmo do link curto `api.whatsapp.com/message/O7PHA347C6RAJ1`).
   Os botões usam `wa.me/5521969706219?text=...`, então cada um já abre com a mensagem escrita:
   - geral: "Olá, Gabriela! Vim pelo seu site e gostaria de saber mais sobre o acompanhamento
     nutricional. Podemos conversar? 🌿"
   - seção de objetivos: a mesma ideia, citando saúde, performance ou estética.
   Para mudar o texto geral, edite `whatsapp.message`; os dos objetivos ficam no `index.html`
   (atributo `data-wa-message`). Se o número mudar, troque `whatsapp.number`.
2. **Instagram** — já configurado (`https://www.instagram.com/nutrigabifl/`). Aparece no rodapé,
   no menu do celular e na chamada final (@nutrigabifl). Vazio = os links somem.
3. **CRN, endereço e e-mail** — em `professional`. Só aparecem no rodapé se forem preenchidos.
   Confirme o CRN com a Gabriela; não use número inventado.
4. **Fotos** — já estão em `assets/fotos/` (vieram dos 2 posts do Instagram):
   - `gabriela-hero.jpg` → topo do site
   - `gabriela-sobre.jpg` + `gabriela-sorriso.jpg` (círculo) → seção Sobre
   - `gabriela-autocuidado.jpg` → frase "Você não precisa esperar a segunda-feira…"
   - `gabriela-contato.jpg` → chamada final do WhatsApp
   Para trocar, substitua o arquivo **mantendo o mesmo nome** (JPG, até ~300 KB).
   Se o rosto ficar cortado, ajuste `position` em `js/config.js` (ex.: `"50% 15%"` mostra mais o topo).
   As áreas Saúde/Performance/Estética usam ilustrações; se quiser fotos nelas, preencha
   `saude`, `performance` e `estetica` em `photos` (Unsplash/Pexels têm licença comercial).
5. **Monograma GM** — redesenhado em SVG igual ao do Instagram. Ele fica dentro do
   `index.html` (bloco `<symbol id="gm">`) para poder mudar de cor; existe também a cópia
   `assets/img/monograma-gm.svg` para usar em outros lugares (cartão, Instagram, etc.).
6. **Compartilhamento** — depois de publicar, preencha `og:url` e `og:image` no `<head>` do `index.html`.

## Seção interativa "Qual é o seu objetivo?"

Fica logo depois das Áreas de atendimento. A pessoa escolhe Saúde, Performance ou Estética
e vê uma ilustração animada, os pontos de atenção e como funcionam a conversa, o plano e o
acompanhamento para aquele objetivo. Cada botão abre o WhatsApp com uma mensagem própria
(ex.: "…tenho interesse no acompanhamento com foco em performance").
Quando a seção aparece na tela, os objetivos trocam sozinhos a cada 7 segundos até a pessoa
clicar em algum. Quem ativou "reduzir movimento" no celular/computador vê tudo parado.
Os textos ficam no `index.html` (procure por `SEÇÃO INTERATIVA`).

## ⚠️ Revisar com a Gabriela

- **Respostas do FAQ** (seção 9 do `index.html`): foram escritas de forma neutra e genérica,
  sem prometer resultados. A Gabriela deve revisar e ajustar (modalidade presencial/online,
  duração da consulta etc.).
- **Textos da seção interativa** (objetivos): também genéricos, sem promessas.
- **Texto do "Sobre"**: apresentação curta e genérica, sem formação ou dados inventados.
- Não há depoimentos no site de propósito: só incluir se forem reais e autorizados.

## Testar no computador

Abra o `index.html` no navegador, ou rode na pasta:

```
python -m http.server 8080
```

e acesse http://localhost:8080.
