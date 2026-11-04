# oxfea

A K-drama discovery catalogue you can actually use — not just data files. "Your next obsession. Filed here."

## Use it in 30 seconds

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or publish this folder on GitHub Pages — no build step, no backend, no account.

## What it does

- **Search** real titles, Korean titles, and taglines
- **Filter** by genre and by streaming service (Netflix, Disney+, TVING…)
- **Surprise me** — a random pick from whatever you filtered to
- **Watchlist** — saved in your browser (localStorage), no login
- **Drama detail** — only the fields that are actually known for that title; nothing invented
- **CLI, too:** `python3 oxfea.py list`, `python3 oxfea.py search runner`, `python3 oxfea.py pick --genre Romance`

## Contents

- `index.html`, `app.js`, `style.css` — the working site
- `oxfea.py` — the terminal version of the same catalogue
- `content/dramas.json` — drama catalogue (starter set, real titles only)
- `content/categories.json` — categories with brand colours and taglines
- `scripts/validate.py` — checks the data before it can break the site
- `docs/design-system.md` — light editorial theme and layout rules

## Add a drama

Add one entry to `content/dramas.json`, then run `python3 scripts/validate.py`. See `CONTRIBUTING.md`. Only real, aired or announced titles — no invented entries, ratings, or synopses.

## Design

Light theme only. Paper `#F7F4EE`, cards `#FFFFFF`, ink `#16130E`. Full spec in `docs/design-system.md`.

## Status

Starter catalogue of 8 titles. It becomes more useful as real titles are added — that is the honest state of the project, and the work that earns users over time.

## License

MIT — see `LICENSE`.
