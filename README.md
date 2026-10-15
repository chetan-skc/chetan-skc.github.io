---
title: Chetan Goyal Developer Portfolio
description: Forge-themed developer portfolio for Chetan Goyal, built with React, Tailwind CSS and Vite
author: Chetan Goyal
ms.date: 2026-10-15
ms.topic: overview
keywords:
  - portfolio
  - react
  - tailwindcss
  - vite
estimated_reading_time: 5
---

<!-- Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot] -->

## Overview

A personal portfolio for Chetan Goyal, Full Stack Developer (.NET · React · PostgreSQL). The design follows his path from a B.Tech in Metallurgical & Materials Engineering into software: *forged in metallurgy, tempered in code*.

## Highlights

* Hero with canvas embers rising from a "furnace", a typewriter tagline and a 3D-tilting periodic element card (Cg, Chetanium) that flips into a business card
* Periodic table of skills: 45 elements laid out like the real table, with family filters, heat-coded proficiency and a detail panel
* Heat-treatment career log (Annealing, Quenching, Tempering) with a molten progress rail
* Project specimen plates plus a live GitHub feed, cached for an hour to respect API limits
* Forge Wall: a shared spark counter and guestbook backed by Firebase, with a browser-local demo mode
* Command palette (Ctrl+K or ⌘K), a terminal easter egg (backtick key) and a Konami-code overheat
* Dark "forge" and light "quenched" themes with a circular reveal transition
* Accessibility built in: semantic landmarks, keyboard support, focus management and reduced-motion support

## Tech stack

| Layer     | Choice                                                                      |
|-----------|-----------------------------------------------------------------------------|
| Framework | React 19 in JavaScript (JSX), bundled by Vite 8                             |
| Styling   | Tailwind CSS v4, with theme tokens and custom utilities in `src/index.css`  |
| Animation | Motion plus a custom canvas spark engine                                    |
| Icons     | lucide-react and inline SVG brand icons                                     |
| Fonts     | Big Shoulders Display, Inter and JetBrains Mono, self-hosted via Fontsource |
| Live data | Firebase Firestore, loaded lazily only when configured                      |
| Contact   | Web3Forms with a `mailto:` fallback                                         |
| Linting   | oxlint                                                                      |

## Getting started

You need Node.js 20.19 or newer.

```powershell
# Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
npm install
npm run dev
```

Open <http://localhost:5173> in your browser.

> [!TIP]
> If PowerShell blocks `npm` with an execution-policy error, run `npm.cmd` instead, for example `npm.cmd run dev`.

## Scripts

| Command           | Purpose                                  |
|-------------------|------------------------------------------|
| `npm run dev`     | Start the dev server with hot reload     |
| `npm run build`   | Build the production bundle into `dist/` |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Lint the source with oxlint              |

## Configuration

All keys are optional. Without them the site runs in demo mode: the Forge Wall is stored in each visitor's browser and the contact form opens the visitor's email app with the message pre-filled. Copy `.env.example` to `.env.local`, fill in the values you need and restart the dev server.

### Contact form with Web3Forms

1. Request a free access key at <https://web3forms.com> with the inbox that should receive messages.
2. Set `VITE_WEB3FORMS_ACCESS_KEY` in `.env.local`.

### Forge Wall with Firebase Firestore

1. Create a project in the [Firebase console](https://console.firebase.google.com) and add a Firestore database in production mode.
2. Register a web app under Project settings and copy its config values into the `VITE_FIREBASE_*` variables.
3. Deploy the security rules, which validate every write and match the limits in `src/lib/liveStore.js`.

```powershell
# Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project <your-project-id>
```

> [!NOTE]
> Firebase web config values and Web3Forms access keys are public by design. Access control comes from `firestore.rules`. For extra spam protection, enable Firebase App Check and moderate guestbook entries from the Firestore console.

## Editing content

| File                             | What it controls                                                               |
|----------------------------------|--------------------------------------------------------------------------------|
| `src/data/profile.js`            | Name, contact details, hero copy, stats and the About section                  |
| `src/data/skills.js`             | Periodic table elements, grid positions, heat levels and notes                 |
| `src/data/experience.js`         | Roles, impact metrics and heat-treatment stages                                |
| `src/data/projects.js`           | Project specimens and alloy colors                                             |
| `src/index.css`                  | Tailwind theme: colors for both themes, fonts, animations and custom utilities |
| `public/Chetan_Goyal_Resume.pdf` | The résumé served by the download buttons                                      |

Years of experience are calculated from July 2023, so the site stays current without edits.

## Styling with Tailwind

Components use Tailwind utility classes directly in JSX, and the design system lives in `src/index.css`:

* Semantic colors switch with the theme, for example `bg-surface`, `text-ink-2`, `border-line` and `text-ember-text`
* The `light:` variant targets the light theme, while dark is the default
* Custom utilities cover effects that need more than one class: `site-container`, `text-molten`, `metal-plate`, `rivet`, `element-face` and `bg-lattice`
* Keyframe animations are exposed as utilities such as `animate-molten` and `animate-pulse-dot`

Shared class strings for buttons, chips and form fields live in `src/components/ui/classes.js`, together with a small `cx()` helper for conditional classes.

## Easter eggs

* Press Ctrl+K (⌘K on macOS) for the command palette, which also searches all 45 skills
* Press the backtick key for the terminal, then try `help`, `forgefetch` or `sudo hire-chetan`
* Enter ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the page to overheat the forge
* Click the element card to flip it, and hold the anvil to keep hammering
* Open the browser console for a hello

## Deployment

The `dist/` folder is a static site, so any static host works. Environment variables are read at build time, so rebuild after changing them.

| Host              | Build command   | Output | Notes                                                            |
|-------------------|-----------------|--------|------------------------------------------------------------------|
| Vercel or Netlify | `npm run build` | `dist` | Add the `VITE_*` variables in the project settings               |
| Firebase Hosting  | `npm run build` | `dist` | Add a `hosting` block with `"public": "dist"` to `firebase.json` |
| GitHub Pages      | `npm run build` | `dist` | Set `BASE_PATH=/<repo-name>/` before building                    |

## Project structure

| Path                           | Contents                                                                |
|--------------------------------|-------------------------------------------------------------------------|
| `src/components/`              | Page sections, layout, command palette, terminal and shared UI          |
| `src/components/ui/classes.js` | Shared Tailwind class strings and the `cx()` helper                     |
| `src/hooks/`                   | Theme, scroll-spy, focus trap, Konami code, GitHub and live-store hooks |
| `src/lib/`                     | Spark engine, live store, contact delivery, GitHub client and helpers   |
| `src/data/`                    | Editable content                                                        |
| `src/index.css`                | Tailwind entry: theme tokens, base styles and custom utilities          |
| `firestore.rules`              | Firestore security rules for the Forge Wall                             |
