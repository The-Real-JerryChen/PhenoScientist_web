# Pheno AI Scientist

A responsive research website about closed-loop phenotypic drug discovery, connecting Cell Painting, multimodal evidence, representation learning, and scientific analysis.

Built with React and Vite. The site is a static frontend; its explanatory workflows do not run experiments or connect to live laboratory systems.

## Local development

Use Node.js 22.12+ and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed in the terminal.

```sh
pnpm build
pnpm preview
```

The production build is generated in `dist/`.

## Deploy to Vercel

Import this repository and use:

- Root Directory: repository root (`./`)
- Framework Preset: Vite
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`
- Output Directory: `dist`

`vercel.json` supplies these settings and a single-page application fallback, so research pages also work when opened directly or refreshed. No environment variables are required.

## Pages

- `/` — platform overview and research foundations
- `/research/representation-learning` — cellular representation learning and AI4AI
- `/research/phenoair` — multimodal scientific reasoning
- `/research/scientific-intelligence` — PhenoBench and biological knowledge learning

The legacy `/research/phenobench` and `/research/morphknow` paths remain aliases for the scientific intelligence page.

## Repository contents

`src/` contains the React components and styles. `public/assets/` contains only images, videos, and PDFs referenced by the website. Research assets are supplied by the project owner; third-party resource marks belong to their respective owners.

Local dependencies, generated builds, visual-review screenshots, working notes, internal source records, superseded illustrations, and the excluded MorphKnow / MorphAnalysis manuscript are intentionally not tracked.
