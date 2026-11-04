#!/usr/bin/env python3
"""Oxfea CLI — search the K-drama catalogue from the terminal.

Usage:
  python3 oxfea.py list
  python3 oxfea.py search runner
  python3 oxfea.py list --streaming Netflix
  python3 oxfea.py list --genre Romance
  python3 oxfea.py pick
  python3 oxfea.py pick --genre Comedy
"""
import argparse
import json
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "content" / "dramas.json"


def load():
    try:
        return json.loads(DATA.read_text(encoding="utf-8"))["dramas"]
    except FileNotFoundError:
        sys.exit("content/dramas.json not found. Run this script from the repo root.")
    except (json.JSONDecodeError, KeyError) as exc:
        sys.exit(f"content/dramas.json is invalid: {exc}")


def show(d):
    bits = [d["title"]]
    if d.get("korean_title"):
        bits.append(f"({d['korean_title']})")
    if d.get("episodes"):
        bits.append(f"— {d['episodes']} episodes")
    if d.get("streaming"):
        bits.append(f"· {d['streaming']}")
    if d.get("network"):
        bits.append(f"· {d['network']}")
    print(" ".join(bits))
    for key in ("tagline", "mood", "schedule", "premiere", "aka"):
        if d.get(key):
            print(f"  {key}: {d[key]}")
    if d.get("genres"):
        print(f"  genres: {', '.join(d['genres'])}")


def main():
    p = argparse.ArgumentParser(description="Oxfea K-drama catalogue")
    sub = p.add_subparsers(dest="cmd", required=True)
    for name in ("list", "pick"):
        sp = sub.add_parser(name)
        sp.add_argument("--genre")
        sp.add_argument("--streaming")
    sp = sub.add_parser("search")
    sp.add_argument("query")
    args = p.parse_args()

    dramas = load()
    if args.cmd == "search":
        q = args.query.lower()
        found = [d for d in dramas if q in " ".join(
            str(v) for v in d.values() if v).lower()]
    else:
        found = dramas
        if getattr(args, "genre", None):
            found = [d for d in found if args.genre in (d.get("genres") or [])]
        if getattr(args, "streaming", None):
            found = [d for d in found if d.get("streaming") == args.streaming]

    if not found:
        print("No matches. Try a different search, or add the drama to content/dramas.json.")
        return
    if args.cmd == "pick":
        show(random.choice(found))
        return
    for d in found:
        show(d)
        print()


if __name__ == "__main__":
    main()
