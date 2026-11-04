# Contributing to Oxfea

Thanks for helping make this a catalogue people actually use.

## What to add

- A real, aired or announced K-drama, with only facts you can check (title, Korean title, network/streaming, schedule, episode count, premiere date).
- A fix to the site (`index.html`, `app.js`, `style.css`) or the CLI (`oxfea.py`) — search, filtering, watchlist, and accessibility improvements are welcome.
- No invented entries, no invented episode counts, ratings, or synopses. If you don't know a field, leave it out — the site only shows fields that exist.

## How to add a drama

1. Add one entry to `content/dramas.json`, with a kebab-case `id` (e.g. `lovely-runner`).
2. Run `python3 scripts/validate.py` — it must print OK.
3. Run the site locally (`python3 -m http.server 8000`, open http://localhost:8000) and check the new card shows and filters correctly.

## How to run it

- Site: `python3 -m http.server 8000` in the repo root, then http://localhost:8000
- CLI: `python3 oxfea.py list`, `python3 oxfea.py search runner`, `python3 oxfea.py pick --genre Romance`
- Validate: `python3 scripts/validate.py`

## Style

Light theme only — paper `#F7F4EE`, white cards, ink `#16130E`. Category colours are in `content/categories.json` and must not be changed casually, as the Webflow build uses the same values.
