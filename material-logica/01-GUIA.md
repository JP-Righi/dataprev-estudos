# Raciocínio Lógico — guia de microtemas

[Como usar](00-COMECE-AQUI.md) · [Gabarito — abrir depois](02-GABARITO.md)

D = FGV/DATAPREV 2024, ATI — Desenvolvimento de Software, tipo 1 branca.
R = FGV/TJRS, concurso do edital 2025, Técnico do Poder Judiciário — Área Administrativo-Judiciária, tipo 2 verde. O gabarito definitivo desse concurso é de 2026.

As páginas indicadas são as posições no PDF, contando a capa como 1. Se o navegador ignorar o salto automático, use o número da página e da questão.

## 01 — Aumentos sucessivos e taxa média

**Regra em 30 segundos:** Aumento de p% multiplica por 1+p/100; desconto multiplica por 1−p/100. Em períodos sucessivos, multiplique os fatores. Para a taxa constante equivalente de dois períodos, use i = √(fator total)−1.

**Exemplo autoral:** Aumentos de 25% e 80%: 1,25×1,80=2,25. Total: 125%. Taxa constante por período: √2,25−1=50%.

**Cuidado:** A média aritmética das taxas não preserva o crescimento composto.

**Uma questão real:** [D, questão 30, página 7](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=7).

**Teste relâmpago autoral:** Dois aumentos de 10% acumulam 20% ou 21%?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 02 — O que é uma proposição

**Regra em 30 segundos:** Na lógica clássica, uma proposição declara algo a que se pode atribuir verdadeiro ou falso. Perguntas e ordens não são proposições. Uma frase falsa continua sendo proposição; não precisamos saber seu valor para classificá-la.

**Exemplo autoral:** “9 é par” é proposição falsa. “Envie o arquivo!” é ordem. “x>4”, sem definir x ou quantificar, é sentença aberta.

**Cuidado:** Interrogação e imperativo não afirmam algo verdadeiro/falso.

**Uma questão real:** [R, questão 31, página 8](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=8).

**Teste relâmpago autoral:** “A Lua é feita de ferro” deixa de ser proposição por ser falsa?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 03 — Divisão proporcional

**Regra em 30 segundos:** Se uma divisão é diretamente proporcional aos pesos, a parte de alguém = total × seu peso ÷ soma dos pesos. Os pesos podem ser aportes, horas ou cotas, conforme o enunciado.

**Exemplo autoral:** Dividir 900 na proporção 2:3: primeira parte=900×2/5=360; segunda=540.

**Cuidado:** Use a soma dos pesos no denominador, não o peso do outro participante.

**Uma questão real:** [D, questão 25, página 6](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=6).

**Teste relâmpago autoral:** Divida 800 na proporção 1:3. Quanto recebe a menor parte?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 04 — Média ponderada

**Regra em 30 segundos:** Multiplique cada valor por seu peso, some e divida pela soma dos pesos. Para atingir média mínima M, exija soma ponderada ≥ M×soma dos pesos. Se a ordem varia, teste onde a menor nota ainda pode caber.

**Exemplo autoral:** Notas 5 e 9 com pesos 1 e 3: (5+27)/4=8. Com pesos trocados: (15+9)/4=6.

**Cuidado:** Dividir pela quantidade de notas só funciona se os pesos forem iguais.

**Uma questão real:** [D, questão 26, página 6](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=6).

**Teste relâmpago autoral:** Notas 6 e 10, pesos 2 e 3: qual a média?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 05 — Condicional e contrapositiva

**Regra em 30 segundos:** P→Q significa: se P, então Q. Equivale a ¬Q→¬P: negue as duas partes e inverta a ordem. Não equivale à recíproca Q→P nem à inversa ¬P→¬Q.

**Exemplo autoral:** Se o arquivo foi criptografado, requer chave. Logo, se não requer chave, não foi criptografado — sob essa premissa.

**Cuidado:** Uma regra suficiente não vira automaticamente uma condição necessária.

**Uma questão real:** [D, questão 28, página 7](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=7).

**Teste relâmpago autoral:** Se chove, a rua molha. Qual contrapositiva?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 06 — Quando uma condicional é falsa

**Regra em 30 segundos:** P→Q só é falsa quando P é verdadeira e Q é falsa. Se Q é uma disjunção R∨S, Q só será falsa com R e S falsas. Resolva de fora para dentro.

**Exemplo autoral:** “Se houve erro, o alarme tocou ou o painel acendeu” é falsa com erro, sem alarme e sem painel aceso.

**Cuidado:** Antecedente falso torna a condicional verdadeira na lógica material; não significa causalidade real.

**Uma questão real:** [R, questão 38, página 9](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=9).

**Teste relâmpago autoral:** P→(Q∨R) é falsa. Quais os valores de P, Q e R?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 07 — Bicondicional

**Regra em 30 segundos:** P↔Q é “P se e somente se Q”: exige as duas direções. É verdadeira quando P e Q têm valores iguais: VV ou FF. É falsa em VF e FV.

**Exemplo autoral:** Um indicador acende se e somente se o sistema está ativo: nessa regra, aceso implica ativo e ativo implica aceso.

**Cuidado:** A palavra “se” sozinha não significa “se e somente se”.

**Uma questão real:** [R, questão 33, página 8](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=8).

**Teste relâmpago autoral:** P é falsa e Q é falsa. P↔Q é verdadeira?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 08 — Quantificadores e negação

**Regra em 30 segundos:** ∀ significa todos; ∃ significa pelo menos um. Negar “todo A é B” produz “existe A que não é B”. Negar “algum A é B” produz “nenhum A é B”. A universal, sozinha, não afirma que existam elementos A.

**Exemplo autoral:** “Todo backup foi validado” é refutada por um único backup não validado.

**Cuidado:** O contrário de “todos” não é necessariamente “nenhum”.

**Uma questão real:** [R, questão 30, página 8](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=8).

**Teste relâmpago autoral:** Negue: todos os relatórios estão completos.

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 09 — Soma e diferença com quadrados

**Regra em 30 segundos:** (x+y)²=x²+2xy+y². Logo, (x−y)²=2(x²+y²)−(x+y)². Conhecendo a soma e a soma dos quadrados, ache a distância |x−y| sem resolver x e y separadamente.

**Exemplo autoral:** Se x+y=3 e x²+y²=29, a distância é √(58−9)=7.

**Cuidado:** x²+y² não é (x+y)². Falta o termo 2xy.

**Uma questão real:** [D, questão 27, página 6](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=6).

**Teste relâmpago autoral:** Se x+y=2 e x²+y²=10, qual |x−y|?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 10 — Contar pares sem duplicar

**Regra em 30 segundos:** Entre n elementos, pares distintos sem ordem somam n(n−1)/2. Se entram k novos, conte k×n pares novo-antigo e k(k−1)/2 pares entre os novos.

**Exemplo autoral:** Ao acrescentar 3 pessoas a um grupo de 4, surgem 3×4+3×2/2=15 pares.

**Cuidado:** A–B e B–A são o mesmo par quando a ordem não importa.

**Uma questão real:** [D, questão 29, página 7](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=7).

**Teste relâmpago autoral:** Dois novos computadores ligam-se a cada um de 5 antigos e entre si. Quantas ligações novas?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 11 — Probabilidade em casos separados

**Regra em 30 segundos:** Em escolhas independentes, multiplique probabilidades dentro de cada caminho. Some caminhos mutuamente exclusivos que atendam ao pedido. Antes da conta, liste quais resultados servem.

**Exemplo autoral:** Urna A: 1 azul,1 vermelha. B: 2 azuis,1 vermelha. Uma de cada: cores diferentes = (1/2)(1/3)+(1/2)(2/3)=1/2.

**Cuidado:** Não multiplique eventos como se fossem independentes quando uma retirada altera a próxima.

**Uma questão real:** [R, questão 29, página 8](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=8).

**Teste relâmpago autoral:** Duas moedas justas e independentes: probabilidade de exatamente uma cara?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 12 — Analogia por relação

**Regra em 30 segundos:** Analogia compara relações, não apenas semelhanças de palavras. Identifique o papel: agente, lugar de origem, caminho, resultado, objeto alterado. Procure o mesmo papel no segundo contexto.

**Exemplo autoral:** “O calor altera a textura; a prática altera a habilidade.” Textura e habilidade ocupam o papel de característica modificada.

**Cuidado:** A posição na lista pode mudar: compare funções.

**Uma questão real:** [R, questão 34, página 8](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=8).

**Teste relâmpago autoral:** “A água percorre tubos; os dados percorrem cabos.” O análogo de tubos é água, dados ou cabos?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 13 — Falsa causa

**Regra em 30 segundos:** Um evento acontecer depois de outro não prova que o primeiro causou o segundo. Procure outras explicações e evidências de mecanismo. “Única causa” exige ainda mais justificativa.

**Exemplo autoral:** Depois de trocar o ícone, o aplicativo ganhou usuários. Isso sozinho não prova que o ícone causou o crescimento.

**Cuidado:** Sequência temporal e correlação não bastam para estabelecer causalidade.

**Uma questão real:** [R, questão 36, página 9](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=9).

**Teste relâmpago autoral:** “Usei uma caneta nova e passei; logo, a caneta causou minha aprovação.” Qual o problema?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 14 — Dedução válida: modus tollens

**Regra em 30 segundos:** De P→Q e ¬Q, conclua ¬P. Isso é modus tollens. Validade diz que a conclusão decorre das premissas; não prova, sozinha, que as premissas descrevam o mundo real.

**Exemplo autoral:** Todo arquivo deste lote é assinado. Este arquivo não é assinado. Logo, não pertence a este lote.

**Cuidado:** De P→Q e Q não se conclui P: seria afirmar o consequente.

**Uma questão real:** [R, questão 37, página 9](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=9).

**Teste relâmpago autoral:** Se o serviço está ativo, responde ao teste. Não responde. Sob essas premissas, está ativo?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 15 — Equivalência usando disjunção

**Regra em 30 segundos:** P→Q equivale a ¬P∨Q. Para P→(Q∨R), obtenha ¬P∨Q∨R. Reescreva cada alternativa na mesma forma; a ordem dos termos do “ou” não muda seu valor.

**Exemplo autoral:** ¬Q→(¬P∨R) vira Q∨¬P∨R, a mesma disjunção. Logo, é equivalente a P→(Q∨R).

**Cuidado:** Antes de distribuir negações, respeite os parênteses: ¬(P∨Q)=¬P∧¬Q.

**Uma questão real:** [R, questão 39, página 9](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=9).

**Teste relâmpago autoral:** P→Q e ¬P∨Q podem ter valores diferentes?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.

---

## 16 — Ordenação e cruzamento de pistas

**Regra em 30 segundos:** Transforme “mais velho que” em ordem e marque impossibilidades. Combine cadeias antes de tentar adivinhar. Se só há três pessoas distintas, identificar menor e intermediário determina o maior.

**Exemplo autoral:** Se Lia é mais velha que Rui, Rui mais velho que Bia, então Bia<Rui<Lia. Use uma tabela pequena para cruzar outras características.

**Cuidado:** “Não é o mais velho” não significa “é o mais novo”.

**Uma questão real:** [R, questão 40, página 9](https://conhecimento.fgv.br/sites/default/files/concursos/tecnico-do-poder-judiciario-area-administrativo-judiciaria-cns200-tipo-2.pdf#page=9).

**Teste relâmpago autoral:** Ana é mais alta que Beto; Beto é mais alto que Caio. Quem é o mais baixo?

Resposta FGV: ___ · Teste: ___ · Resultado: entendi / chutei / errei.
