# Conhecimentos Específicos — guia de microtemas

[Como usar](00-COMECE-AQUI.md) · [Gabarito — abrir depois](02-GABARITO.md)

D = FGV/DATAPREV 2024, ATI — Desenvolvimento de Software, tipo 1 branca (Conhecimentos Específicos, questões 41 a 70).

Este primeiro bloco cobre os temas das cinco questões que você errou na prova D (54, 56, 57, 62 e 64) e os temas vizinhos, com outras questões reais da mesma prova. Os cartões 02, 04 e 07 trazem um teste relâmpago autoral no formato da FGV, nunca apresentado como questão da banca. As páginas indicadas são as posições no PDF, contando a capa como 1.

<a id="microtema-01"></a>

## 01 · Requisito funcional × não funcional

**Resumo:** Requisito funcional diz o que o sistema faz: funções, regras, comportamentos ("consultar saldo", "emitir extrato"). Requisito não funcional diz como ele deve fazer ou sob quais restrições: desempenho, segurança, usabilidade, disponibilidade, confiabilidade, portabilidade. Um mesmo recurso costuma gerar os dois: "consultar saldo" é funcional; "o saldo deve aparecer em tempo real" é uma exigência de qualidade sobre essa função, ou seja, não funcional.

**Exemplo autoral:** "O sistema deve permitir transferir dinheiro entre contas" é funcional. "A transferência deve terminar em até 2 segundos, mesmo com 10 mil usuários ao mesmo tempo" é não funcional (desempenho e escala).

**Como atacar:** Pergunte ao enunciado: o que foi pedido é uma função nova ou uma qualidade (rapidez, segurança, facilidade, disponibilidade) de uma função que já existe? "Em tempo real", "em até", "sempre disponível" e "criptografado" apontam para não funcional.

**Questão real:** [D · questão 54 · página 12](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=12)

---

<a id="microtema-02"></a>

## 02 · Elicitação de requisitos: técnicas e processo

**Resumo:** Elicitar é descobrir o que os interessados precisam. Técnicas comuns: entrevista (conversa dirigida), questionário (muitas pessoas, respostas padronizadas), brainstorming (ideias em grupo, sem crítica no início), observação (ver o trabalho acontecer), workshop ou JAD (reunião estruturada), análise de documentos, cenários e casos de uso, e prototipação (um modelo para o usuário reagir e validar). O processo passa por elicitação, análise, especificação, validação e gestão de mudanças; acontece no começo e de forma iterativa, não "depois da implementação".

**Exemplo autoral:** Para entender o trabalho de um caixa de agência, observá-lo mostra passos que uma entrevista não revelaria. Mostrar uma tela desenhada e pedir correções é prototipação.

**Como atacar:** Palavras absolutas ("apenas", "somente", "geralmente depois do código") tendem a ser falsas. Ligue a técnica ao verbo: perguntar é entrevista, ver é observação, desenhar um modelo é protótipo, gerar ideias em grupo é brainstorming.

**Teste relâmpago (autoral, não é questão FGV):** Uma equipe levanta os requisitos de um sistema de atendimento ao cidadão.
Julgue os itens:
I. Observar os atendentes no balcão é uma técnica de elicitação e pode revelar necessidades que não aparecem em entrevistas.
II. A engenharia de requisitos ocorre uma única vez, antes de qualquer outra atividade, e os requisitos não devem ser revistos depois.
III. Mostrar telas desenhadas aos usuários e colher correções é uma forma de prototipação.
Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) I e III, apenas.

---

<a id="microtema-03"></a>

## 03 · Blockchain: o que fica dentro de um bloco

**Resumo:** Um bloco tem cabeçalho e corpo. No cabeçalho ficam o hash do bloco anterior (é ele que forma a "corrente"), o carimbo de tempo (timestamp), o nonce e a raiz de Merkle das transações. No corpo ficam as transações, cada uma com sua assinatura digital. O saldo das carteiras não é gravado no bloco: no Bitcoin ele é deduzido do histórico de transações (saídas não gastas, UTXO); no Ethereum, o bloco guarda apenas hashes (raízes) do estado, não os saldos.

**Exemplo autoral:** Se Ana paga 1 moeda a Beto, o bloco registra a transação assinada por Ana. A informação "Ana agora tem 4" não está escrita no bloco: é uma conta feita a partir do histórico.

**Como atacar:** Em "o que NÃO é armazenado", procure a opção que é resultado de cálculo (saldo, total, estado atual). Hash anterior, timestamp, transações e assinaturas são dados que entram no bloco.

**Questão real:** [D · questão 56 · página 12](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=12)

---

<a id="microtema-04"></a>

## 04 · Blockchain: consenso, imutabilidade e contratos inteligentes

**Resumo:** A rede é distribuída: cada nó guarda uma cópia do livro-razão e um mecanismo de consenso decide qual bloco entra. Na prova de trabalho (PoW, Bitcoin), mineradores gastam poder computacional para achar um nonce válido; na prova de participação (PoS, Ethereum desde 2022), validadores colocam moedas em garantia. A imutabilidade vem do encadeamento: alterar um bloco muda seu hash e quebra os seguintes, e refazer a cadeia mais rápido que a rede honesta exige poder enorme (ataque de 51%). Contratos inteligentes são programas gravados na blockchain e executados automaticamente.

**Exemplo autoral:** Mudar o valor de uma transação antiga muda o hash daquele bloco; o bloco seguinte guardava o hash antigo, então a cadeia deixa de "fechar".

**Como atacar:** Cuidado com "impossível alterar" (é impraticável, não impossível) e com "uma autoridade central valida os blocos" (o consenso distribuído substitui a autoridade). PoW é gasto de poder computacional; PoS é valor em garantia.

**Teste relâmpago (autoral, não é questão FGV):** Um órgão público avalia usar blockchain para registrar certificados.
Julgue os itens:
I. Na prova de trabalho, mineradores competem para achar um nonce válido, e o primeiro que consegue propõe o bloco.
II. Contratos inteligentes são programas armazenados na blockchain que executam automaticamente quando as condições programadas são cumpridas.
III. Alterar uma transação em um bloco antigo afeta apenas aquele bloco, sem invalidar os seguintes.
Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) I e III, apenas.

---

<a id="microtema-05"></a>

## 05 · Arquitetura hexagonal, microsserviços e monolito

**Resumo:** Hexagonal (Portas e Adaptadores, de Alistair Cockburn): o núcleo de negócio fica isolado; as portas são as interfaces que ele oferece ou exige, e os adaptadores ligam as portas ao mundo externo (web, banco, filas, testes). Trocar o banco ou a API não mexe na regra de negócio. Monólito: tudo é implantado como uma unidade só, ainda que dividido em módulos. Microsserviços: serviços pequenos, cada um com sua responsabilidade, implantação independente e, em regra, seu próprio banco, com baixo acoplamento.

**Exemplo autoral:** Num sistema de pedidos hexagonal, o cálculo do frete não sabe se o pedido veio por REST ou por fila: um adaptador converte. Em microsserviços, "pedidos" e "pagamentos" são implantados e escalados separadamente.

**Como atacar:** Em microsserviços, desconfie de "compartilham o mesmo banco" e "maior acoplamento": a ideia é banco por serviço e baixo acoplamento. Hexagonal separa negócio de infraestrutura; monólito é implantação conjunta.

**Questão real:** [D · questão 57 · página 13](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=13)

---

<a id="microtema-06"></a>

## 06 · Design × arquitetura de software

**Resumo:** Arquitetura trata das decisões amplas e estruturais: como o sistema se divide em componentes (camadas, módulos, serviços), como eles se comunicam e quais qualidades (desempenho, segurança, escalabilidade) a estrutura precisa garantir. Design detalha as decisões dentro desses componentes: classes, métodos, interfaces, algoritmos. Alto nível é a planta da casa (arquitetura); baixo nível é o detalhe de cada cômodo (design detalhado). Todo sistema tem arquitetura, inclusive o pequeno.

**Exemplo autoral:** Dividir o sistema em API, serviço de pagamentos e banco é arquitetura. Decidir quais classes e métodos o serviço de pagamentos terá é design.

**Como atacar:** Desconfie de definições que trocam alto e baixo nível, que reduzem design a "codificação" e de "só para grandes projetos".

**Questão real:** [D · questão 43 · página 10](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=10)

---

<a id="microtema-07"></a>

## 07 · Microsserviços na prática: banco por serviço, containers e transações distribuídas

**Resumo:** Em microsserviços cada serviço é dono dos seus dados (banco por serviço) e os outros o acessam por API ou mensagem, não direto no banco. Containers (Docker) empacotam o serviço com suas dependências e rodam igual em qualquer ambiente, compartilhando o kernel do host (por isso são mais leves que máquinas virtuais); um orquestrador (Kubernetes) cuida de escala e reinício. Sem uma transação ACID única entre vários bancos, usa-se o padrão Saga: uma sequência de transações locais, cada uma com uma ação de compensação caso algo falhe adiante. O commit em duas fases (2PC) existe, mas é pesado. O resultado típico é consistência eventual.

**Exemplo autoral:** Um pedido reserva estoque e depois cobra o cartão. Se o pagamento falha, a Saga executa a compensação "liberar o estoque".

**Como atacar:** "Transação ACID global entre todos os serviços" e "todos compartilham um único banco" descrevem monólito. Container não carrega um sistema operacional completo, como faz a máquina virtual.

**Teste relâmpago (autoral, não é questão FGV):** Uma plataforma de pedidos foi dividida em microsserviços.
Julgue os itens:
I. Para garantir consistência imediata, todos os serviços devem compartilhar um único banco de dados.
II. Cada container carrega um sistema operacional completo, como uma máquina virtual, e por isso é tão pesado quanto ela.
III. No padrão Saga, quando um passo falha, ações de compensação desfazem os passos já concluídos.
Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) I e III, apenas.

---

<a id="microtema-08"></a>

## 08 · DevOps: integração, entrega e implantação contínuas

**Resumo:** DevOps junta desenvolvimento e operações para entregar software mais rápido e com segurança. Integração Contínua (CI): o código é integrado várias vezes ao dia e cada integração dispara build e testes automáticos. Entrega Contínua (CD, continuous delivery): o pipeline deixa cada versão aprovada pronta para ir à produção a qualquer momento, com baixo risco e poucas interrupções (a liberação final pode depender de decisão humana). Implantação Contínua (continuous deployment): vai à produção automaticamente, sem aprovação manual. Gestão de configuração controla versões e ambientes; monitoramento contínuo observa a aplicação em produção.

**Exemplo autoral:** Cada push roda build e testes (CI). Se passam, o pipeline gera a versão pronta, e a empresa libera com um clique (entrega contínua) ou sem clique algum (implantação contínua).

**Como atacar:** "Integrar e testar a cada alteração" é CI. "Levar rapidamente uma nova versão à produção com poucas interrupções" é entrega ou implantação contínua. "Histórico do código" é controle de versão. "Observar a aplicação rodando" é monitoramento.

**Questão real:** [D · questão 55 · página 12](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=12)

---

<a id="microtema-09"></a>

## 09 · Controle de acesso: DAC, MAC e RBAC

**Resumo:** DAC (discricionário): o dono do recurso decide quem acessa, normalmente por listas de controle de acesso (ACL); é o modelo das permissões de arquivos comuns. MAC (mandatório): uma política central, que o usuário não pode alterar, compara o rótulo de segurança do recurso (ex.: secreto, confidencial) com a autorização do sujeito; é o modelo de ambientes militares e governamentais. RBAC (por papéis): as permissões pertencem a papéis (gerente, caixa) e os usuários recebem papéis. Privilégio mínimo é um princípio (dar só o necessário), não um tipo de política.

**Exemplo autoral:** Um documento "secreto" só pode ser lido por quem tem autorização "secreto" ou superior, mesmo que o dono queira compartilhar: MAC. O dono compartilhando uma planilha com um colega é DAC. O perfil "auditor" que libera certos relatórios é RBAC.

**Como atacar:** Procure a pista: dono decide é discricionário; rótulos comparados com autorizações é mandatório; papéis é RBAC. "Por privilégio mínimo" é princípio, não política.

**Questão real:** [D · questão 62 · página 13](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=13)

---

<a id="microtema-10"></a>

## 10 · X.800: serviços e mecanismos de segurança

**Resumo:** A X.800 (arquitetura de segurança do modelo OSI) define cinco serviços: autenticação, controle de acesso, confidencialidade dos dados, integridade dos dados e irretratabilidade (não repúdio). Para entregá-los, define oito mecanismos específicos, ligados a uma camada ou serviço: cifragem, assinatura digital, controle de acesso, integridade de dados, troca de autenticação, preenchimento de tráfego, controle de roteamento e notarização. E cinco mecanismos disseminados, que não são específicos de camada: funcionalidade confiável, rótulo de segurança, detecção de eventos, trilha de auditoria de segurança e recuperação de segurança.

**Exemplo autoral:** Preencher o tráfego com dados falsos para esconder o volume real de comunicação protege uma conexão em particular: é mecanismo específico. A trilha de auditoria registra o que acontece no sistema todo: é disseminado.

**Como atacar:** Decore os cinco disseminados (confiável, rótulo, evento, auditoria, recuperação). O que sobrar nas alternativas é específico. Preenchimento de tráfego é específico.

**Questão real:** [D · questão 64 · página 14](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=14)

---

<a id="microtema-11"></a>

## 11 · OWASP Top 10:2021

**Resumo:** O OWASP Top 10 lista as categorias de risco mais críticas em aplicações web. Edição 2021: A01 controle de acesso quebrado, A02 falhas criptográficas, A03 injeção, A04 design inseguro, A05 configuração incorreta de segurança, A06 componentes vulneráveis e desatualizados, A07 falhas de identificação e autenticação, A08 falhas de integridade de software e dados, A09 falhas de log e monitoramento, A10 falsificação de solicitação do lado do servidor (SSRF). Atenção à versão: a edição 2025 mudou (SSRF foi incorporada ao controle de acesso quebrado e entrou "falhas na cadeia de suprimentos de software").

**Exemplo autoral:** Na SSRF, o atacante faz o servidor da aplicação buscar uma URL interna (como um serviço de metadados) que ele não alcançaria de fora.

**Como atacar:** A pergunta cita o ano. Em 2021, as categorias novas eram design inseguro, integridade de software e dados e SSRF. "Cadeia de suprimentos" como categoria própria só aparece em 2025.

**Questão real:** [D · questão 63 · página 14](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=14) A lista de 2025 está em [owasp.org](https://owasp.org/Top10/).

---

<a id="microtema-12"></a>

## 12 · HTTPS, SSL e TLS

**Resumo:** HTTPS é o HTTP dentro de um canal protegido por TLS (antes chamado SSL). O canal dá confidencialidade (criptografia dos dados), integridade (detecta alteração) e autenticação do servidor por certificado digital. Na abertura da conexão acontece o handshake: negocia versão e algoritmos, autentica o servidor e combina as chaves. Depois, os dados trafegam cifrados com chave simétrica (rápida), e a criptografia assimétrica serve à troca de chaves e à autenticação. SSL é o protocolo antigo (versões 2.0 e 3.0, abandonadas por vulnerabilidades); TLS é o sucessor padronizado, e hoje se usam o TLS 1.2 e o 1.3.

**Exemplo autoral:** O cadeado no navegador indica que a conexão usa TLS e que o certificado do site foi validado por uma autoridade certificadora.

**Como atacar:** Em "SSL × TLS", a resposta certa quase sempre diz que o TLS é o sucessor, com correções de segurança. Desconfie de "SSL mais seguro", "intercambiáveis" e "papéis divididos entre os dois".

**Questão real:** [D · questão 46 · página 11](https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf#page=11)
