# Requirements: Sticky Header & Themed Section Components

## Goal

Build a reusable, sticky `Header` component and a reusable `Section` component in React + TypeScript for the Astro-based hackathon landing page. The `Header` must appear globally on every page; the `Section` component must accept a title, a primary/secondary color theme, a custom `className`, and custom content via props/children. Styling uses SASS for global design tokens and per-component scoped styles, with Tailwind CSS available as a utility layer.

## Context / Background

The project `mini-hackaton-front` is an Astro 6 site using React 19 islands. It currently has no components or styles. The design references show a dark-themed hackathon landing page with a sticky top navigation bar and content sections composed of themed cards. A reusable component layer will keep markup consistent across pages and make future page additions predictable.

## Scope

### In scope

- Reusable `Header` React component, sticky on all pages.
- Reusable `Section` React component with configurable title, color theme, className, and content.
- Global SASS design tokens (colors, typography, spacing, breakpoints).
- Per-component scoped SASS styles (CSS Modules or BEM-based scoped classes).
- Tailwind CSS configured as an additional styling utility layer.
- Astro layout integration so the header renders globally.
- TypeScript prop interfaces and component exports.
- `lucide-react` icon library for the header logo and any future icon needs.
- Jest + React Testing Library unit tests for the `Header` and `Section` components.
- Manual browser verification.

### Out of scope

- Backend, CMS, or API integrations.
- Animation libraries or complex scroll-driven animations.
- Multi-theme (light/dark) toggle.
- Mobile hamburger menu (manual responsive scaling only).
- E2E tests.

## MoSCoW Prioritization

### Must have

- `Header` is sticky to the top of the viewport on all pages.
- `Header` renders logo/branding, navigation links, and a CTA button.
- `Header` uses the `Cpu` icon from `lucide-react` as the logo icon.
- `Header` uses global SASS variables, scoped component styles, and Tailwind utility classes where appropriate.
- Install `sass`, `tailwindcss`, `jest`, `@testing-library/react`, `jest-environment-jsdom`, and `lucide-react` as project dependencies.
- `Section` accepts `title`, `color` (`primary` | `secondary`), and optional `className` props.
- `Section` accepts custom content via `children` (or an equivalent content prop).
- Unit tests cover `Header` and `Section` render output and prop behavior.
- `Section` applies the selected color theme to its title and container.
- Components are implemented in TypeScript with typed props.
- `pnpm run build` completes without errors.

### Should have

- Navigation links highlight or indicate the active section/page.
- Smooth anchor scrolling to section IDs.
- A layout wrapper in Astro so the header is included automatically on every page.

### Could have

- Header hide/show behavior on scroll direction.
- Mobile-first responsive padding adjustments.
- Reusable icon slot inside the section title.

### Won't have

- Third-party UI component library.
- Runtime theme switching.
- Form handling or authentication logic in the CTA.

## Functional Requirements

1. **FR-1 Header branding** — The `Header` must render a logo icon (the `Cpu` icon from `lucide-react`) plus the text "AI HACKATHON" on the left.
2. **FR-2 Header navigation** — The `Header` must render navigation links (e.g., Inicio, Acerca de, Actualizaciones, Videos, Precios, Términos) and a "Registrarse" CTA button.
3. **FR-3 Sticky positioning** — The `Header` must remain fixed/sticky at the top of the viewport while scrolling.
4. **FR-4 Global header inclusion** — The `Header` must be included on every page via an Astro layout or root wrapper.
5. **FR-5 Section title** — The `Section` component must render the provided `title` prop as a visible heading.
6. **FR-6 Section color theme** — The `Section` component must apply styling based on the `color` prop, accepting exactly `primary` or `secondary`. `primary` maps to cyan/teal accents; `secondary` maps to magenta/pink accents.
7. **FR-7 Section custom class** — The `Section` component must append any `className` prop to its root element so consumers can add custom SASS overrides.
8. **FR-8 Section custom content** — The `Section` component must render arbitrary content passed via `children` inside its body area.
9. **FR-9 Section anchor** — The `Section` component should support an optional `id` prop for anchor navigation.
10. **FR-10 Type safety** — All component props must be defined with TypeScript interfaces/types and components must be exported for use in `.tsx` and `.astro` files.
11. **FR-11 Icon library** — Icons must be sourced from `lucide-react` to keep the bundle consistent and avoid inline SVG duplication.
12. **FR-12 Unit tests** — `Header` and `Section` components must have Jest + React Testing Library tests that verify render output, navigation presence, title rendering, and color theme class application.

## Technical Requirements

- **Framework**: React 19 + TypeScript inside Astro 6 using `@astrojs/react`.
- **Styling**: SASS (`sass` package) with a global partial for tokens and per-component scoped styles, plus Tailwind CSS for utility-first styling. CSS Modules are acceptable; BEM naming inside component-scoped files is also acceptable.
- **Color tokens**: at minimum define `--color-primary` (cyan/teal), `--color-secondary` (magenta/pink), `--color-bg`, `--color-surface`, `--color-text`, and `--color-text-muted`.
- **Icons**: `lucide-react` for all vector icons.
- **Testing**: Jest with `jest-environment-jsdom` and `@testing-library/react` for component unit tests.
- **Accessibility**: semantic `<header>`, `<nav>`, `<section>`, and `<h2>` elements; sufficient color contrast for text.
- **Performance**: components should be islands only where interactivity is needed; static markup is preferred for the section wrapper.
- **Build compatibility**: SASS and Tailwind CSS must compile with both `pnpm run dev` and `pnpm run build`; tests must pass via `pnpm test`.

## Constraints and Assumptions

- The existing project uses `pnpm` and Astro's strict TypeScript config.
- No SASS, Tailwind CSS, Jest, React Testing Library, or `lucide-react` tooling is currently installed; adding them as dependencies is required.
- Images provided in the prompt define the visual target; exact measurements (padding, font sizes) can be estimated but must be tokenized and easy to adjust.
- All content inside `Section` is consumer-provided; the component itself does not own card layouts.

## Success Criteria / Acceptance Criteria

- [ ] `pnpm run build` completes with no errors.
- [ ] `pnpm test` runs all Jest tests without failures.
- [ ] `Header` is visible at the top of every page and stays in view while scrolling.
- [ ] `Header` displays the `Cpu` icon from `lucide-react` next to the brand text.
- [ ] `Section` renders with the correct title and the selected primary/secondary accent color.
- [ ] Passing a custom `className` to `Section` applies additional scoped SASS/Tailwind styles without breaking base styles.
- [ ] Custom content passed to `Section` renders correctly inside the section body.
- [ ] At least one example page demonstrates both `Header` and `Section` usage and looks acceptable in the browser.
