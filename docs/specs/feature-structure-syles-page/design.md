# Design: Sticky Header & Themed Section Components

## High-Level Architecture

```
┌─────────────────────────────────────────────┐
│  Astro Layout (src/layouts/Layout.astro)    │
│  ┌───────────────────────────────────────┐  │
│  │  Header (React island)                │  │
│  │  - sticky top bar                     │  │
│  │  - logo, nav, CTA                     │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  <slot />                             │  │
│  │  - pages render Section components    │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

- **Astro Layout** owns the document shell and wraps every page with the `Header`.
- **Header** is a React component rendered as an Astro island (`client:visible` or `client:load` only if interactivity is added; otherwise it can be static React markup).
- **Section** is a static React component used directly in `.astro` pages or `.tsx` page sections.
- **Global SASS tokens** live in a shared partial and are imported by both component style sheets.
- **Tailwind CSS** provides utility classes for rapid layout, spacing, and responsive tweaks.
- **lucide-react** supplies the `Cpu` icon for the header brand and any future icons.
- **Jest + React Testing Library** run unit tests for the components.

## Components and Responsibilities

### `Header`

- Renders inside a semantic `<header>` element.
- Contains:
  - **Brand**: `Cpu` icon from `lucide-react` + "AI HACKATHON" text.
  - **Nav**: unordered list of anchor links (`<a>`).
  - **CTA**: "Registrarse" button styled with the secondary/magenta accent.
- Applies sticky positioning with a dark background and a subtle bottom border.
- Uses global tokens for colors and typography; scoped SASS styles for layout/spacing; Tailwind utilities for minor adjustments.

### `Section`

- Renders inside a semantic `<section>` element.
- Props:
  - `title`: string rendered as an `<h2>`.
  - `color`: `'primary' | 'secondary'`.
  - `className?`: optional string appended to the root.
  - `children`: ReactNode rendered as the section body.
  - `id?`: optional string for anchor navigation.
- Applies a theme modifier class based on `color`:
  - `.section--primary` → cyan/teal title accent and optional border/glow.
  - `.section--secondary` → magenta/pink title accent and optional border/glow.
- Scoped styles define title typography, padding, max-width, and responsive behavior.

### Global SASS tokens (`src/styles/_variables.scss`)

- Color palette: primary, secondary, background, surface, text, text-muted.
- Typography scale: font sizes for brand, nav, section title, body.
- Spacing scale and layout max-width.
- Breakpoints for responsive adjustments.

### Tailwind configuration (`tailwind.config.mjs`)

- Extends the default theme with the same color palette and spacing values used in SASS tokens.
- Content paths include `src/**/*.{astro,html,js,jsx,ts,tsx}`.
- `@tailwind` directives added to a global CSS/SCSS entry file.

## Data Model / Schema

No persistent data model is required. Component props are defined as TypeScript interfaces:

```ts
interface HeaderProps {
  // Future extensibility: logo text, nav items, CTA label.
  // Initial implementation may keep these internal or optional.
}

interface SectionProps {
  title: string;
  color: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  id?: string;
}
```

## User Flows / Sequence Diagrams

### Page load flow

1. Browser requests an Astro page.
2. Astro renders the layout, which includes the `Header`.
3. Astro renders the page `<slot />`, which includes one or more `Section` components.
4. Each `Section` renders its title with the selected accent color and the custom content passed by the page.
5. User scrolls; `Header` remains stuck to the top.

### Anchor navigation flow

1. User clicks a nav link pointing to `#section-id`.
2. Browser scrolls to the `Section` with the matching `id`.
3. `Header` remains visible because it is sticky.

## API / Interface Design

### `Header`

```tsx
import type { FC } from 'react';

export interface HeaderProps {
  // Reserved for future customization; initial version uses defaults.
}

export const Header: FC<HeaderProps> = () => { ... };
```

Usage in Astro layout:

```astro
---
import { Header } from '../components/Header/Header';
---
<html>
  <body>
    <Header />
    <main>
      <slot />
    </main>
  </body>
</html>
```

### `Section`

```tsx
import type { FC, ReactNode } from 'react';

export interface SectionProps {
  title: string;
  color: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
  id?: string;
}

export const Section: FC<SectionProps> = ({ title, color, className, children, id }) => { ... };
```

Usage in a page:

```tsx
<Section title="Acerca del Hackathon" color="primary" id="acerca">
  {/* custom card grid content */}
</Section>
```

## Error Handling and Edge Cases

- **Invalid `color` prop**: restrict via TypeScript union; if a runtime value is passed, fall back to `primary`.
- **Missing `title`**: TypeScript enforces this; at runtime render nothing or a placeholder to avoid broken headings.
- **Missing `children`**: allow empty sections (useful for placeholders) but document that content is expected.
- **Sticky overlap**: ensure `main` has enough top padding or margin so content is not hidden behind the sticky header.
- **SASS compilation errors**: keep import paths relative and consistent; use `@use` instead of `@import` where the installed SASS version supports it.

## Implementation Approach and Key Decisions

1. **React islands inside Astro** — Because the site already uses `@astrojs/react`, components can be authored in `.tsx` and imported into `.astro` layouts/pages. The `Header` and `Section` can be rendered as static components unless interactivity is needed.
2. **SASS + Tailwind hybrid styling** — SASS handles component-scoped styles and design tokens; Tailwind provides utility classes for rapid layout and responsive tweaks. A single `_variables.scss` partial defines the palette and spacing; Tailwind config mirrors these values.
3. **BEM-ish class naming inside scoped files** — Even without CSS Modules, component-scoped files prevent collisions. Modifier classes (`.section--primary`, `.section--secondary`) control theme variations. Tailwind utilities can be combined on the same elements.
4. **Layout-driven global header** — Wrapping the header in `src/layouts/Layout.astro` guarantees it appears on every page without requiring each page to import it.
5. **Primary/Secondary mapping** — Based on the reference images, primary is cyan/teal and secondary is magenta/pink. This mapping is documented in the token file.

## Risks and Open Questions

- **SASS, Tailwind, Jest, and lucide-react not installed** — The project currently lacks these dependencies. Adding them is required and low risk.
- **Sticky stacking context** — The header must have a higher `z-index` than page content and a defined background color to avoid content showing through.
- **Font assets** — The design uses a stylized font; the spec assumes system fonts or a web-safe fallback unless a specific font is chosen later.
- **Icon system** — The header logo uses the `Cpu` icon from `lucide-react`. Future icons should come from the same library.
- **Tailwind + SASS coexistence** — Care must be taken to avoid conflicting class names; Tailwind utilities should be used for layout helpers while SASS handles component-specific styling and theming.
- **Jest/RTL setup with React 19** — Ensure installed versions of Jest, jsdom, and Testing Library support React 19 and TypeScript.
- **Responsiveness** — The reference images show a desktop layout; mobile behavior should be simple (flex wrap or horizontal scroll) until explicitly designed.
