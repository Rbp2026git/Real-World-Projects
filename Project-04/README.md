# Project 04 — Employee Directory

A vanilla JavaScript employee directory app with search, filter and full keyboard navigation — built with plain HTML, CSS, and JS (no frameworks).

## Features

- **Search** — filter employees live by name, role, or location
- **Department Filter** — narrow the list using a dropdown (Engineering, Design, Product, HR, Finance)
- **Detail Panel** — click or press `Enter` on a row to view full employee details (email, location, status, joined date)
- **Keyboard Navigation** — fully accessible roving tabindex pattern:
  - `↑` / `↓` — move between rows
  - `Enter` — open employee details
  - `Esc` — close the detail panel
- **Status Indicators** — color-coded dots for Active / Away / Offline
- **Responsive Row Count** — shows live count of visible employees
- **No Results State** — friendly message when search/filter returns nothing

## File Structure

```
Project-04/
├── index.html      # Markup & structure
├── style.css       # Styling
├── script.js       # App logic (render, filter, sort, keyboard nav)
└── README.md
```

## Key Concepts Practiced

- DOM manipulation (`innerHTML`, `createElement`, event delegation)
- Array methods (`filter`, `sort`)
- State management without a framework
- Accessible keyboard navigation (roving tabindex)
- Dynamic class/badge rendering based on data

---
Part of [Back-to-Basics-JavaScript](../) — a JS fundamentals revision series.