# Colocar o site no ar (GitHub Pages)

O site já está pronto na pasta `docs/` (lê os mesmos guias, sem duplicar conteúdo). Falta só publicar. Leva uns 5 minutos, uma vez só.

## 1. Criar o repositório no GitHub

1. Entre em [github.com/new](https://github.com/new).
2. Nome sugerido: `dataprev-estudos`.
3. Deixe como **Public** — o GitHub Pages grátis só funciona em repositório público (o link não fica listado em lugar nenhum, só quem tiver a URL exata acessa).
4. **Não** marque "Add a README" nem `.gitignore` — o repositório local já tem tudo isso.
5. Clique em "Create repository".

## 2. Subir o que já está pronto no seu PC

Copie a URL que o GitHub mostrou (algo como `https://github.com/SEU-USUARIO/dataprev-estudos.git`) e rode, na pasta do projeto:

```
git remote add origin https://github.com/SEU-USUARIO/dataprev-estudos.git
git branch -M main
git add -A
git commit -m "Site de estudos + material de legislação"
git push -u origin main
```

Se pedir login, use seu usuário do GitHub e uma senha de aplicativo/token (o GitHub não aceita mais senha normal por HTTPS) — ou configure o GitHub Desktop, que resolve isso sozinho.

## 3. Ligar o GitHub Pages

1. No repositório, vá em **Settings → Pages** (menu da esquerda).
2. Em "Build and deployment" → "Source", escolha **Deploy from a branch**.
3. Em "Branch", escolha **main** e a pasta **/docs**. Salve.
4. Espere 1–2 minutos. A URL aparece no topo da mesma página, algo como:
   `https://SEU-USUARIO.github.io/dataprev-estudos/`

Guarde esse link (favoritos do celular, por exemplo) — é o seu site de estudos.

## Como o progresso é salvo

Cada card marcado como entendi/chutei/errei fica salvo só no navegador que você usou (localStorage) — não vai para o GitHub, não é compartilhado com ninguém. Se estudar no computador e no celular, o progresso **não sincroniza sozinho** entre os dois. Use o botão "exportar progresso" (rodapé do site) num aparelho e "importar progresso" no outro para levar os dados de um lado para o outro quando quiser.

## Atualizando o conteúdo depois

Se eu (ou você) editar os arquivos `material-*/01-GUIA.md` ou `02-GABARITO.md`, o `docs/data.js` precisa ser regerado a partir deles (é um arquivo gerado, não editado à mão) e reenviado com `git add -A && git commit ... && git push`. Me avise quando adicionar/editar cartões que eu regenero o `data.js` pra você.
