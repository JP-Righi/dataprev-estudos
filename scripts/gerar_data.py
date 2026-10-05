#!/usr/bin/env python3
"""Regera docs/data.js a partir de material-*/01-GUIA.md + 02-GABARITO.md.
Rode da raiz do repositório: python3 scripts/gerar_data.py

Além do texto de cada cartão, extrai (quando existir):
  - sourceUrl / sourceLabel / extraNote: o link da questão real oficial, tirado
    do primeiro link markdown no corpo do GUIA (e removido do texto exibido,
    pra não duplicar).
  - answerLetter: a letra correta (A-E), tirada do texto do GABARITO. Isso
    NUNCA reproduz o enunciado/alternativas da prova — só a letra, pra dar
    feedback certo/errado no site sem copiar conteúdo da banca.
  - asks / alts: explicação por alternativa, escrita à mão no GABARITO, em linhas
        - pede: correta|incorreta
        - A: por que essa alternativa é certa/errada (palavras próprias)
        - B: ...
    Essas linhas saem do texto do gabarito exibido e viram card["alts"].
"""
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SUBJECTS = [
    {"id": "portugues", "name": "Português", "dir": "material-portugues"},
    {"id": "ingles", "name": "Inglês", "dir": "material-ingles"},
    {"id": "logica", "name": "Raciocínio Lógico", "dir": "material-logica"},
    {"id": "legislacao", "name": "Legislação", "dir": "material-legislacao"},
]

EXAM_DATE = "2026-10-11"

HEADING_RE = re.compile(r'^##\s+(?:Cart[aã]o\s+)?(\d+)\s*[·—-]\s*(.+?)\s*$')
STRIP_LINE_RES = [
    re.compile(r'^<a id="[^"]*"></a>\s*$'),
    re.compile(r'^\[Voltar ao cart[aã]o\].*$'),
    re.compile(r'^\[Voltar ao guia\].*$'),
    re.compile(r'^\[Conferir depois\].*$'),
    re.compile(r'^Resposta FGV:\s*_+.*$'),
    re.compile(r'^Minha alternativa:.*Resultado:.*$'),
    re.compile(r'^---\s*$'),
]
LINK_RE = re.compile(r'\[([^\]]+)\]\((https?://[^\s)]+)\)')
ANSWER_RES = [
    re.compile(r'\*\*[^*]*?([A-E])\.\s*\*\*'),   # "**D5 — A.**" / "**D, questão 14: B.**"
    re.compile(r'\*\*[^*]*?:\s*([A-E])\*\*'),     # "**Gabarito oficial (questão 02): A**"
]


ASKS_RE = re.compile(r'^-\s*pede:\s*(correta|incorreta)\s*$', re.I)
ALT_RE = re.compile(r'^-\s*([A-E]):\s*(.+?)\s*$')


def extract_explanations(gab_body):
    """Separa as linhas '- pede:' e '- X:' do corpo do gabarito.
    Devolve (corpo_sem_elas, asks, alts_dict_ou_None)."""
    asks = None
    alts = {}
    kept = []
    for ln in gab_body.split("\n"):
        t = ln.strip()
        m = ASKS_RE.match(t)
        if m:
            asks = m.group(1).lower()
            continue
        m = ALT_RE.match(t)
        if m:
            alts[m.group(1)] = m.group(2)
            continue
        kept.append(ln)
    body = "\n".join(kept)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    return body, asks, (alts or None)


def clean_lines(lines):
    out = []
    for ln in lines:
        if any(r.match(ln.strip()) for r in STRIP_LINE_RES):
            continue
        out.append(ln)
    while out and not out[0].strip():
        out.pop(0)
    while out and not out[-1].strip():
        out.pop()
    return "\n".join(out)


def parse_cards(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")
    cards = {}
    current_num = None
    current_title = None
    buf = []

    def flush():
        nonlocal current_num, current_title, buf
        if current_num is not None:
            cards[current_num] = {"title": current_title, "body": clean_lines(buf)}
        buf = []

    for ln in lines:
        m = HEADING_RE.match(ln)
        if m:
            flush()
            current_num = int(m.group(1))
            current_title = m.group(2).strip()
        else:
            if current_num is not None:
                buf.append(ln)
    flush()
    return cards


def extract_source(guia_body):
    """Acha o paragrafo com o primeiro link markdown (a questao real oficial),
    tira o link dele pra fora, e devolve (corpo_sem_esse_paragrafo, url, label, nota_extra)."""
    paras = guia_body.split("\n\n")
    for i, p in enumerate(paras):
        m = LINK_RE.search(p)
        if not m:
            continue
        label, url = m.group(1), m.group(2)
        rest = p[:m.start()] + p[m.end():]
        # tira um prefixo em negrito tipo "**Questão real:** " ou "**Uma questão real:** "
        rest = re.sub(r'^\*\*[^*]+\*\*[:.]?\s*', '', rest).strip()
        rest = rest.lstrip(",.:;").strip()
        rest = rest.replace("**", "")
        rest = rest.strip(" .")
        remaining = paras[:i] + paras[i+1:]
        new_body = "\n\n".join(remaining).strip()
        return new_body, url, label, rest
    return guia_body, None, None, None


def extract_answer(gabarito_body):
    for rx in ANSWER_RES:
        m = rx.search(gabarito_body)
        if m:
            return m.group(1)
    return None


def main():
    data = {"subjects": [], "generatedFrom": "material-*/01-GUIA.md + 02-GABARITO.md", "examDate": EXAM_DATE}
    total = 0
    total_checkable = 0
    for s in SUBJECTS:
        guia_path = os.path.join(BASE, s["dir"], "01-GUIA.md")
        gab_path = os.path.join(BASE, s["dir"], "02-GABARITO.md")
        if not os.path.exists(guia_path):
            print(f"aviso: {guia_path} nao existe, pulando {s['name']}")
            continue
        guia_cards = parse_cards(guia_path)
        gab_cards = parse_cards(gab_path) if os.path.exists(gab_path) else {}
        nums = sorted(guia_cards.keys())
        cards_out = []
        for n in nums:
            g = guia_cards[n]
            a = gab_cards.get(n, {"title": g["title"], "body": "(gabarito nao encontrado)"})
            new_guia_body, url, label, extra = extract_source(g["body"])
            answer_letter = extract_answer(a["body"]) if url else None
            gab_text, asks, alts = extract_explanations(a["body"])
            if alts:
                if set(alts) != set("ABCDE"):
                    print(f"AVISO {s['id']}#{n}: explicacao incompleta, faltam {sorted(set('ABCDE') - set(alts))}")
                if answer_letter and answer_letter not in alts:
                    print(f"AVISO {s['id']}#{n}: sem explicacao da letra do gabarito ({answer_letter})")
                if asks is None:
                    print(f"AVISO {s['id']}#{n}: falta a linha '- pede: correta|incorreta'")
            card = {
                "n": n, "title": g["title"],
                "guia": new_guia_body,
                "gabarito": gab_text,
                "sourceUrl": url, "sourceLabel": label, "sourceNote": extra or None,
                "answerLetter": answer_letter,
                "asks": asks if alts else None,
                "alts": alts,
            }
            cards_out.append(card)
            if answer_letter:
                total_checkable += 1
        data["subjects"].append({"id": s["id"], "name": s["name"], "cards": cards_out})
        total += len(cards_out)
        com_expl = sum(1 for c in cards_out if c["alts"])
        sem_expl = [c["n"] for c in cards_out if c["answerLetter"] and not c["alts"]]
        print(f"{s['name']}: {len(cards_out)} cartoes, {sum(1 for c in cards_out if c['answerLetter'])} com gabarito checavel, {com_expl} com explicacao por alternativa" + (f" (faltam: {sem_expl})" if sem_expl else ""))

    out_path = os.path.join(BASE, "docs", "data.js")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("// Gerado automaticamente por scripts/gerar_data.py. Nao edite a mao — edite os .md e regere.\n")
        f.write("window.STUDY_DATA = ")
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    print(f"TOTAL: {total} cartoes, {total_checkable} com resposta checavel automaticamente -> {out_path}")


if __name__ == "__main__":
    main()
