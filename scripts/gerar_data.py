#!/usr/bin/env python3
"""Regera docs/data.js a partir de material-*/01-GUIA.md + 02-GABARITO.md.
Rode da raiz do repositório: python3 scripts/gerar_data.py
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
    re.compile(r'^Resposta FGV:\s*_+.*$'),
    re.compile(r'^---\s*$'),
]


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


def main():
    data = {"subjects": [], "generatedFrom": "material-*/01-GUIA.md + 02-GABARITO.md", "examDate": EXAM_DATE}
    total = 0
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
            cards_out.append({"n": n, "title": g["title"], "guia": g["body"], "gabarito": a["body"]})
        data["subjects"].append({"id": s["id"], "name": s["name"], "cards": cards_out})
        total += len(cards_out)
        print(f"{s['name']}: {len(cards_out)} cartoes")

    out_path = os.path.join(BASE, "docs", "data.js")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("// Gerado automaticamente por scripts/gerar_data.py. Nao edite a mao — edite os .md e regere.\n")
        f.write("window.STUDY_DATA = ")
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    print(f"TOTAL: {total} cartoes -> {out_path}")


if __name__ == "__main__":
    main()
