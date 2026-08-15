# mini-hackaton-front

An [Astro](https://astro.build) project with [React](https://react.dev) template for the mini hackathon landing page.

## Stack

- [Astro 6](https://astro.build) with React 19 islands
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/) for design tokens and component-scoped styles
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) for unit tests
- [lucide-react](https://lucide.dev/) for icons

## Project structure

```
src/
├── components/        # Reusable React components
│   ├── Header/        # Sticky global header
│   └── Section/       # Themed content section
├── layouts/           # Astro layouts
│   └── Layout.astro   # Global shell with Header
├── pages/             # Astro pages
├── styles/            # Global SASS tokens and entry
└── ...
docs/specs/            # Spec-Driven Development packages
```

## Scripts

| Command            | Action                                |
| :----------------- | :------------------------------------ |
| `pnpm run dev`     | Start local dev server                |
| `pnpm run build`   | Build for production                  |
| `pnpm run preview` | Preview production build locally      |
| `pnpm test`        | Run Jest unit tests                   |

## Specs

This project follows Spec-Driven Development. Feature specifications live under `docs/specs/<feature-folder>/` and contain `requirements.md`, `design.md`, `tasks.md`, and `metadata.md`.
