# Conhecimentos Específicos — gabarito separado

Confira só depois de tentar. Letras das questões reais conferidas no gabarito definitivo oficial da DATAPREV 2024 (tipo 1 branca). As explicações são minhas, em palavras próprias; não reproduzem a justificativa oficial da banca. Os testes relâmpago autorais são comentados aqui mesmo.

<a id="resposta-01"></a>

## 01 · Requisito funcional × não funcional

**D54 — B.** "Em tempo real" é uma exigência de desempenho sobre uma função que já existia (consultar saldo), então o requisito é não funcional.

- pede: correta
- A: Erra a classificação. A função "consultar saldo" já existe; o que se pediu foi que ela fosse feita em tempo real, que é uma qualidade (desempenho), e não uma funcionalidade nova.
- B: Certa. O requisito descreve como a função deve se comportar (tempo real), ou seja, desempenho: é não funcional. A função em si (mostrar o saldo) seria o requisito funcional.
- C: A entrevista é uma conversa dirigida para levantar necessidades. Prototipação é construir um modelo (uma tela, um esboço) para o usuário reagir; entrevista e protótipo são técnicas diferentes.
- D: O brainstorming é uma técnica válida de elicitação, boa para gerar ideias em grupo. O "apenas entrevistas formais com usuários finais" é exagero absoluto e falso.
- E: A engenharia de requisitos acontece no começo e de forma iterativa. Esperar o software pronto para descobrir o que o usuário precisa seria tarde e caro.

[Voltar ao cartão](01-GUIA.md#microtema-01)

<a id="resposta-02"></a>

## 02 · Elicitação de requisitos: técnicas e processo

**Resposta comentada (autoral).** Gabarito: E (I e III, apenas). A I está certa: observar o trabalho real é uma técnica de elicitação e mostra o que as pessoas fazem e não pensam em dizer na entrevista. A II está errada: a engenharia de requisitos é iterativa; os requisitos são validados e mudam ao longo do projeto, então "uma única vez" e "não devem ser revistos" são falsos. A III está certa: mostrar telas desenhadas e colher correções é prototipação.

[Voltar ao cartão](01-GUIA.md#microtema-02)

<a id="resposta-03"></a>

## 03 · Blockchain: o que fica dentro de um bloco

**D56 — C.** A questão pede o que NÃO é armazenado: o saldo das carteiras não vai no bloco; ele é calculado a partir do histórico de transações.

- pede: incorreta
- A: Está no bloco. O hash do bloco anterior fica no cabeçalho e é ele que encadeia os blocos; como a questão pede o que NÃO é armazenado, esta não é a resposta.
- B: Está no bloco. Cada transação carrega a assinatura digital de quem a enviou, o que prova a autoria e permite a validação pela rede.
- C: É a que NÃO é armazenada diretamente. No Bitcoin, o saldo é deduzido do histórico de transações (saídas não gastas, UTXO); no Ethereum, o bloco guarda só hashes (raízes) do estado, e não os saldos. É a resposta.
- D: Está no bloco. O carimbo de tempo fica no cabeçalho e registra quando o bloco foi criado, ajudando a ordenar a cadeia.
- E: Está no bloco. Os dados das transações compõem o corpo do bloco, que é justamente a informação que a cadeia existe para registrar.

[Voltar ao cartão](01-GUIA.md#microtema-03)

<a id="resposta-04"></a>

## 04 · Blockchain: consenso, imutabilidade e contratos inteligentes

**Resposta comentada (autoral).** Gabarito: D (I e II, apenas). A I está certa: na prova de trabalho os mineradores competem para achar um nonce válido, e quem consegue primeiro propõe o bloco. A II está certa: contratos inteligentes são programas gravados na blockchain que executam sozinhos quando as condições programadas se cumprem. A III está errada: cada bloco guarda o hash do anterior; ao alterar uma transação antiga, o hash daquele bloco muda e os blocos seguintes deixam de "fechar", ou seja, ficam inválidos. É assim que a cadeia detecta adulteração.

[Voltar ao cartão](01-GUIA.md#microtema-04)

<a id="resposta-05"></a>

## 05 · Arquitetura hexagonal, microsserviços e monolito

**D57 — E.** I e III estão certas; a II é falsa porque microsserviços buscam baixo acoplamento e, em regra, cada serviço tem o seu banco.

- pede: correta
- A: A I está certa (hexagonal separa o negócio das interfaces externas), mas a III, sobre monólito × microsserviços, também está certa e ficou de fora.
- B: É a pior escolha: só a II, justamente a falsa. Microsserviços não compartilham o mesmo banco para ganhar acoplamento; fazem o contrário, para manter os serviços independentes.
- C: A III está certa (monólito é implantado como um conjunto; microsserviços, de forma independente), mas a I, sobre a arquitetura hexagonal, também está certa.
- D: Inclui a II, que é falsa (banco compartilhado e "maior acoplamento" contradizem a ideia de microsserviços), e deixa de fora a III, que é verdadeira.
- E: I e III estão certas. A I descreve a arquitetura hexagonal (portas e adaptadores separando o negócio das interfaces externas); a III contrasta o monólito, implantado em conjunto, com os microsserviços, de implantação independente.

[Voltar ao cartão](01-GUIA.md#microtema-05)

<a id="resposta-06"></a>

## 06 · Design × arquitetura de software

**D43 — D.** Arquitetura trata das decisões amplas e estruturais; design trata das decisões detalhadas e específicas dentro dos componentes.

- pede: correta
- A: Reduz o design a "codificação" e diz que ele não envolve abstrações ou estruturas maiores. Design de software lida com abstrações, estruturas e interfaces; programar é outra atividade.
- B: Troca os níveis. Definir a estrutura geral do sistema, com módulos e sua interação, é arquitetura (alto nível), não design de baixo nível.
- C: Também troca os níveis. Decidir funções e métodos dentro dos componentes é o design detalhado (baixo nível); o alto nível trata da estrutura geral.
- D: Certa. A arquitetura define a estrutura ampla (componentes, comunicação, qualidades do sistema); o design detalha o interior de cada componente (classes, métodos, algoritmos).
- E: Falsa por "apenas" e "irrelevante": todo sistema tem arquitetura, inclusive o pequeno. O que muda com o porte é o quanto se formaliza.

[Voltar ao cartão](01-GUIA.md#microtema-06)

<a id="resposta-07"></a>

## 07 · Microsserviços na prática: banco por serviço, containers e transações distribuídas

**Resposta comentada (autoral).** Gabarito: C (III, apenas). A I está errada: compartilhar um único banco amarra os serviços entre si e contradiz a independência dos microsserviços; o normal é cada serviço ter seus dados e aceitar consistência eventual. A II está errada: o container compartilha o kernel do sistema operacional do host e empacota só a aplicação e suas dependências, por isso é bem mais leve que a máquina virtual, que carrega um sistema operacional completo. A III está certa: no padrão Saga, cada passo é uma transação local e, se um passo falha, ações de compensação desfazem os passos já concluídos (por exemplo, liberar o estoque reservado).

[Voltar ao cartão](01-GUIA.md#microtema-07)

<a id="resposta-08"></a>

## 08 · DevOps: integração, entrega e implantação contínuas

**D55 — B.** Levar rapidamente uma nova versão à produção com o mínimo de interrupções é a Entrega Contínua (CD).

- pede: correta
- A: Integração Contínua (CI) é integrar o código várias vezes ao dia, com build e testes automáticos a cada integração. Ela vem antes da entrega, mas não é a prática de levar a versão à produção.
- B: Certa. A Entrega Contínua mantém cada versão aprovada pronta para ir à produção com baixo risco e poucas interrupções para os usuários, que é o que o enunciado descreve.
- C: Gerenciamento de configuração controla versões, parâmetros e ambientes, para que eles sejam reproduzíveis. Ajuda a entrega, mas não é a prática de entregar a versão à produção.
- D: Monitoramento contínuo observa a aplicação em produção (desempenho, erros, disponibilidade). Acontece depois da entrega e não a realiza.
- E: Controle de versão guarda o histórico do código e permite trabalhar em paralelo (como o Git). É base do pipeline, mas não implanta nada.

[Voltar ao cartão](01-GUIA.md#microtema-08)

<a id="resposta-09"></a>

## 09 · Controle de acesso: DAC, MAC e RBAC

**D62 — B.** Comparar rótulos de segurança do recurso com autorizações das entidades é o controle de acesso mandatório (MAC).

- pede: correta
- A: No discricionário (DAC), é o dono do recurso quem decide quem acessa, normalmente por listas de controle de acesso. Não há comparação obrigatória de rótulos com autorizações.
- B: Certa. No mandatório (MAC), uma política central, que o usuário não altera, compara o rótulo de segurança do recurso (secreto, confidencial) com a autorização do sujeito.
- C: "Por entrada confiável" não é um dos modelos clássicos (DAC, MAC, RBAC). É um nome que soa técnico, usado como distrator.
- D: Por papéis (RBAC) liga as permissões a papéis, como gerente ou auditor, e os usuários recebem papéis. O critério é o papel, não o rótulo.
- E: Privilégio mínimo é um princípio de segurança (dar só o acesso necessário), e não um tipo de política de controle de acesso.

[Voltar ao cartão](01-GUIA.md#microtema-09)

<a id="resposta-10"></a>

## 10 · X.800: serviços e mecanismos de segurança

**D64 — C.** Preenchimento de tráfego é mecanismo específico da X.800; os outros quatro são mecanismos disseminados.

- pede: correta
- A: Detecção de evento é mecanismo disseminado: serve ao sistema todo e não é específico de uma camada ou serviço.
- B: Funcionalidade confiável é mecanismo disseminado. Os cinco disseminados são funcionalidade confiável, rótulo de segurança, detecção de eventos, trilha de auditoria e recuperação de segurança.
- C: Certa. O preenchimento de tráfego está entre os oito mecanismos específicos (cifragem, assinatura digital, controle de acesso, integridade de dados, troca de autenticação, preenchimento de tráfego, controle de roteamento e notarização).
- D: Rótulo de segurança é mecanismo disseminado, associado a um recurso para indicar seu nível de proteção; não é ligado a uma camada.
- E: Trilha de auditoria de segurança é mecanismo disseminado: registra o que acontece no sistema inteiro, sem ser específica de uma camada.

[Voltar ao cartão](01-GUIA.md#microtema-10)

<a id="resposta-11"></a>

## 11 · OWASP Top 10:2021

**D63 — A.** Em 2021, uma das categorias novas do Top 10 foi a falsificação de solicitação do lado do servidor (SSRF, A10).

- pede: correta
- A: Certa. SSRF (A10:2021) é a falha em que o atacante faz o servidor da aplicação enviar requisições a destinos que ele não alcançaria diretamente, como serviços internos.
- B: "Falhas na cadeia de suprimentos de software" como categoria própria aparece na edição 2025. Em 2021 o tema aparecia diluído em componentes vulneráveis (A06) e falhas de integridade de software e dados (A08).
- C: "Proteção do ambiente de engenharia" não é categoria de vulnerabilidade do Top 10. As categorias descrevem tipos de falha, como injeção ou controle de acesso quebrado.
- D: "Treinamento operacional" é uma prática organizacional, não uma categoria de vulnerabilidade da lista.
- E: "Uso de recursos de linguagens e frameworks" é conselho de desenvolvimento seguro, não uma categoria de vulnerabilidade do OWASP Top 10:2021.

[Voltar ao cartão](01-GUIA.md#microtema-11)

<a id="resposta-12"></a>

## 12 · HTTPS, SSL e TLS

**D46 — B.** O TLS é o sucessor do SSL e corrige as vulnerabilidades das versões anteriores, com melhorias de segurança.

- pede: correta
- A: Inverte a relação. O SSL (versões 2.0 e 3.0) foi abandonado por falhas de segurança; o TLS é o mais seguro e é o que se usa hoje.
- B: Certa. O TLS substitui o SSL, corrigindo as vulnerabilidades encontradas nas versões anteriores e trazendo melhorias. Hoje o padrão é o TLS 1.2 e o 1.3.
- C: Não são intercambiáveis: o SSL é inseguro e está obsoleto. A diferença não se limita à compatibilidade de navegadores.
- D: Falso. O HTTPS funciona com TLS; o SSL foi abandonado, e ter sido o primeiro protocolo não significa que seja o único possível.
- E: SSL e TLS não se somam com papéis divididos. São gerações do mesmo tipo de protocolo; o TLS faz sozinho a autenticação e a criptografia dos dados.

[Voltar ao cartão](01-GUIA.md#microtema-12)
