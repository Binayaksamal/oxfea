#!/usr/bin/env python3
"""Validate Oxfea's content files. Run: python3 scripts/validate.py

Checks: valid JSON, unique titles and ids, required fields,
episodes (when present) is a positive integer, category colours are hex.
Exits non-zero on any error, so contributors get a clear failure, not a silent break.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors = []


def load(rel):
    try:
        return json.loads((ROOT / rel).read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001 - report, don't crash
        errors.append(f"{rel}: {exc}")
        return {}


dramas = load("content/dramas.json").get("dramas", [])
categories = load("content/categories.json").get("categories", [])

seen_titles, seen_ids = set(), set()
for i, d in enumerate(dramas):
    where = f"dramas[{i}]"
    if not d.get("title"):
        errors.append(f"{where}: missing title")
        continue
    if d["title"] in seen_titles:
        errors.append(f"{where}: duplicate title {d['title']!r}")
    seen_titles.add(d["title"])
    if not d.get("id"):
        errors.append(f"{where} ({d['title']}): missing id")
    elif d["id"] in seen_ids:
        errors.append(f"{where}: duplicate id {d['id']!r}")
    seen_ids.add(d.get("id"))
    if "episodes" in d and (not isinstance(d["episodes"], int) or d["episodes"] <= 0):
        errors.append(f"{where}: episodes must be a positive integer")
    if "genres" in d and not isinstance(d["genres"], list):
        errors.append(f"{where}: genres must be a list")

for i, c in enumerate(categories):
    if not c.get("name") or not re.fullmatch(r"#[0-9A-Fa-f]{6}", c.get("color", "")):
        errors.append(f"categories[{i}]: name and a #RRGGBB colour are required")

if errors:
    print("INVALID:")
    print("\n".join(f" - {e}" for e in errors))
    sys.exit(1)
print(f"OK: {len(dramas)} dramas, {len(categories)} categories.")
