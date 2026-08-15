# Tasks: Sticky Header & Themed Section Components

## Phase 1: Foundation / Setup

### T1 — Install project dependencies

- **Description**: Install `sass`, `tailwindcss`, `jest`, `@testing-library/react`, `jest-environment-jsdom`, and `lucide-react` so the project can compile SASS, use Tailwind utilities, run component tests, and render icons.
- **Dependencies**: None.
- **Acceptance Criteria**:
  - `sass`, `tailwindcss`, `jest`, `@testing-library/react`, `jest-environment-jsdom`, and `lucide-react` appear in `package.json` (prod or dev as appropriate).
  - `pnpm lockfile` is updated.
  - `pnpm run dev` still starts without errors.

### T2 — Create global SASS tokens

- **Description**: Add a global partial (e.g., `src/styles/_variables.scss`) with design tokens for colors, typography, spacing, and breakpoints.
- **Dependencies**: T1.
- **Acceptance Criteria**:
  - File defines primary, secondary, background, surface, text, and muted text colors.
  - File defines font-size and spacing scales.
  - File is importable by component style sheets without errors.

### T3 — Configure Tailwind CSS

- **Description**: Initialize Tailwind CSS for Astro, create `tailwind.config.mjs`, add `@tailwind` directives to a global CSS/SCSS entry, and ensure Astro picks up the stylesheet.
- **Dependencies**: T1.
- **Acceptance Criteria**:
  - `tailwind.config.mjs` exists and points content to `src/**/*.{astro,html,js,jsx,ts,tsx}`.
  - Tailwind theme extends the same primary/secondary colors as SASS tokens.
  - A global stylesheet with `@tailwind base`, `@tailwind components`, and `@tailwind utilities` is imported by the layout.
  - A Tailwind utility class renders correctly in the browser.

### T4 — Configure Jest and React Testing Library

- **Description**: Add a Jest configuration that supports TypeScript and React 19, plus a `test` script in `package.json`.
- **Dependencies**: T1.
- **Acceptance Criteria**:
  - `jest.config.js` (or equivalent) uses `jest-environment-jsdom` and handles `.tsx` files.
  - `package.json` includes a `test` script that runs `jest`.
  - Running `pnpm test` executes the test suite (even if zero tests exist initially).

### T5 — Set up component folder structure

- **Description**: Create the directory layout for reusable React components and their scoped styles (e.g., `src/components/Header/` and `src/components/Section/`).
- **Dependencies**: None.
- **Acceptance Criteria**:
  - `src/components/Header/Header.tsx` and `Header.scss` paths are created.
  - `src/components/Section/Section.tsx` and `Section.scss` paths are created.
  - An index barrel file exists for clean imports if desired.

## Phase 2: Core Implementation

### T6 — Implement `Section` component

- **Description**: Build the `Section` React component with typed props for `title`, `color`, `className`, `children`, and `id`; render a themed section with a title and custom content area.
- **Dependencies**: T2, T3, T5.
- **Acceptance Criteria**:
  - Component accepts and uses all required props.
  - `color="primary"` applies cyan/teal accent classes.
  - `color="secondary"` applies magenta/pink accent classes.
  - Custom `className` is appended to the root element.
  - `children` renders inside the section body.

### T7 — Style the `Section` component

- **Description**: Write `Section.scss` using global tokens, including base layout, title typography, and primary/secondary modifiers. Use Tailwind utilities for layout helpers where appropriate.
- **Dependencies**: T6.
- **Acceptance Criteria**:
  - Section has consistent padding and max-width.
  - Title color changes based on the selected theme.
  - Custom class overrides work as expected.

### T8 — Implement `Header` component

- **Description**: Build the `Header` React component with the `Cpu` icon from `lucide-react`, navigation links, and a CTA button; make it sticky at the top.
- **Dependencies**: T2, T3, T5.
- **Acceptance Criteria**:
  - Component renders the `Cpu` icon from `lucide-react` plus the text "AI HACKATHON".
  - Component renders nav links (Inicio, Acerca de, Actualizaciones, Videos, Precios, Términos).
  - Component renders a "Registrarse" CTA button.
  - Component uses semantic `<header>` and `<nav>` markup.

### T9 — Style the `Header` component

- **Description**: Write `Header.scss` using global tokens for the dark sticky bar, nav link styles, and CTA button styling. Use Tailwind utilities for minor layout adjustments where appropriate.
- **Dependencies**: T8.
- **Acceptance Criteria**:
  - Header is sticky and stays at the top of the viewport.
  - Header has a dark background and a subtle bottom border.
  - Nav links and CTA match the visual target.
  - Content below the header is not hidden (account for header height via padding or margin).

## Phase 3: Integration and Validation

### T10 — Create/update Astro layout with global `Header`

- **Description**: Add or update `src/layouts/Layout.astro` to render the `Header` above the page slot so it appears on every page. Import the global stylesheet with Tailwind directives.
- **Dependencies**: T8, T9.
- **Acceptance Criteria**:
  - `Layout.astro` imports and renders `Header`.
  - `Layout.astro` imports the global stylesheet so Tailwind utilities are available.
  - Existing pages use the layout or a new sample page uses it.
  - Header appears on the rendered page without duplication.

### T11 — Build an example page with `Section` components

- **Description**: Update an existing page or create a new page that uses `Section` with both `primary` and `secondary` themes and custom content.
- **Dependencies**: T6, T7, T10.
- **Acceptance Criteria**:
  - Page renders at least two sections.
  - One section uses `color="primary"` and one uses `color="secondary"`.
  - Each section receives custom content through `children`.
  - Custom `className` is demonstrated on at least one section.

### T12 — Run build and manual browser checks

- **Description**: Verify the implementation compiles and behaves correctly in the browser.
- **Dependencies**: T10, T11.
- **Acceptance Criteria**:
  - `pnpm run build` completes with no errors.
  - `pnpm run dev` serves the site successfully.
  - Header is sticky while scrolling.
  - Sections render correct titles and accent colors.
  - Custom content and custom className are visible and styled.

## Phase 4: Final Review / Delivery

### T13 — Write unit tests for `Section`

- **Description**: Add Jest + React Testing Library tests for the `Section` component covering title rendering, color theme classes, `id`, and custom `className`/`children`.
- **Dependencies**: T4, T7.
- **Acceptance Criteria**:
  - Tests verify the section title is rendered.
  - Tests verify `primary` and `secondary` color classes are applied.
  - Tests verify custom `className` appears on the root element.
  - Tests verify custom `children` render inside the section.
  - `pnpm test` passes.

### T14 — Write unit tests for `Header`

- **Description**: Add Jest + React Testing Library tests for the `Header` component covering brand text, `Cpu` icon presence, nav links, and CTA button.
- **Dependencies**: T4, T9.
- **Acceptance Criteria**:
  - Tests verify "AI HACKATHON" text is rendered.
  - Tests verify the `Cpu` icon is present.
  - Tests verify all expected nav links are rendered.
  - Tests verify the "Registrarse" CTA button is rendered.
  - `pnpm test` passes.

### T15 — Review code and accessibility

- **Description**: Do a final pass for TypeScript correctness, semantic HTML, color contrast, responsive behavior, and consistent use of SASS/Tailwind tokens.
- **Dependencies**: T12, T13, T14.
- **Acceptance Criteria**:
  - No TypeScript errors in the editor or build output.
  - Header uses `<header>` and `<nav>`; Section uses `<section>` and `<h2>`.
  - Text has acceptable contrast against backgrounds.
  - Responsive layout degrades gracefully on narrow viewports.

### T16 — Integration verification / release readiness

- **Description**: Confirm the spec is complete and the components are ready for use across all pages.
- **Dependencies**: T15.
- **Acceptance Criteria**:
  - `pnpm run build`, `pnpm run preview`, and `pnpm test` all succeed.
  - Components are exported and documented enough for another developer to import them.
  - Remaining open questions (font, mobile menu) are recorded for follow-up.
