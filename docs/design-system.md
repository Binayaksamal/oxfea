# Oxfea design system

## Theme

Light theme ONLY. No dark mode anywhere.

- Page background: warm editorial off-white `#F7F4EE`
- Cards: pure white `#FFFFFF`
- Ink (text, borders, shadows): `#16130E`
- Secondary text: `#6E675C`

## Category color-coding (exact)

- Romance `#FF69B4` (pink)
- Comedy `#FFD700` (yellow)
- Thriller `#4A90E2` (blue)
- Healing `#A3C1AD` (sage green)

## Signature details

- 1.5px ink borders on cards
- 14px card radius
- Hard offset shadows (`4px 4px 0 #16130E`) on buttons and badges
- Pill-shaped buttons (999px radius)
- Slightly rotated sticker badges
- Browser-window cards with dotted title bars and playful filenames (e.g. `my-next-obsession.ox`, `calendar.ox`)
- Small mono uppercase eyebrow labels (e.g. `01 / PICK YOUR MOOD`)

## Typography

- Huge bold grotesk display headlines (Archivo Black / Clash Display style)
- Clean sans body (Inter style)
- Monospace for labels (Space Mono style)

## Layout feel

Relentless minimalism, generous whitespace, asymmetric bento grids, bold type scaling. Every pixel earns its place.

## Build notes (Webflow)

- Strict Client-First class naming (e.g. `section_hero`, `container-large`, `card_drama-item`, `padding-section-large`)
- Native Div Blocks with CSS Grid and Flexbox
- CMS Collections for Dramas, Categories, and Actors — cards and filters bind to real CMS data
- Alt text on every meaningful image
- Category filter on the drama grid must genuinely work (real filtering, not a mock)
- Community voting must be genuinely functional, not a mock
