#!/usr/bin/env python3
"""Erzeugt themen.js (Themenliste für lehrkraft.html) aus QS_KACHELN in index.html.
Aufruf im Repo-Ordner: python3 werkzeuge/themen_bauen.py   (nach jeder Änderung der Quick-Start-Themen)
Ein Test prüft, dass themen.js zu index.html passt."""
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent

def themen():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    m = re.search(r"^const QS_KACHELN = (\[.*?\]);\s*$", html, re.M)
    return [{"id": k["id"], "nr": k["nr"], "titel": k["titel"], "stufe": k.get("stufe", "")} for k in json.loads(m.group(1))]

def inhalt():
    return ("/* Automatisch erzeugt aus QS_KACHELN in index.html (werkzeuge/themen_bauen.py). Nicht von Hand ändern. */\n"
            "window.BT_THEMEN = " + json.dumps(themen(), ensure_ascii=False) + ";\n")

if __name__ == "__main__":
    (ROOT / "themen.js").write_text(inhalt(), encoding="utf-8")
    print("themen.js:", len(themen()), "Themen")
