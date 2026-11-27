[![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/muhamadyusufseptian6-lab/makefun-best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/muhamadyusufseptian6-lab/makefun-best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# Arunika in Numbers — National Statistics Site

The official statistics site of the **Republic of Arunika** (a fictional island
nation), built for the make.fun bounty
[“Make the best national statistics site”](https://make.fun/c/best-national-statistics-site-20261126-0539).

It runs entirely offline in a browser from static files — no network request,
no framework, no build step. Open `app/index.html` on a desktop or a phone
and it works.

## What the site covers

- **Overview** — six key indicators (population, GDP, GDP per capita,
  unemployment, inflation, life expectancy), the 2015–2025 population trend,
  latest releases, and how ANSO counts.
- **Population** — population by year with a working year picker, age
  structure, urban/rural split, and a population table for all five regions.
- **Economy** — GDP with a toggle between total and per capita, what the
  economy makes, top exports, inflation and unemployment charts, and a trade
  table.
- **Health & Education** — life expectancy trend plus Health / Education tabs
  and a full indicator table.
- **Environment & Energy** — renewable electricity trend, the 2025
  electricity mix, forest cover, emissions and more.
- **Data** — a searchable list of 12 datasets with a downloadable CSV.

Every figure carries its source and reference year. All charts are drawn by
the site's own SVG code in `app/charts.js` — no chart library is loaded.

## Screenshots

Four real renders of the site, in `screenshots/`:

- `1-home.jpg` — desktop overview (the cover: first by file name)
- `2-population.jpg` — desktop population page
- `3-economy.jpg` — desktop economy page
- `4-home-phone.jpg` — phone-size overview

## Layout

- `main.ts` — the entry program (Node 22, stdlib only): copies `app/` and
  `screenshots/` to the output directory and writes `dossier.json` with the
  vendored make.fun library.
- `app/` — the site as static files: `index.html`, `style.css`, `main.js`
  (router + controls), `views.js` (the six pages), `charts.js` (hand-drawn
  SVG charts), `data.js` (all statistics), `data/population-by-year.csv`.
- `vendor/makefun-frontend.ts` — the kit's dossier library, copied unchanged.
- `screenshots/` — 4 real renders of the site, including one at phone size.
- `serve.ts` — tiny local server for testing (`node serve.ts`, then
  http://localhost:8080).

## Check it locally

```sh
node serve.ts          # open http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
node tests/check.mjs   # determinism, screenshot limits, no dotfiles
```

## Referral

Made with make.fun — referral code `515temp1`.
