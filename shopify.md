# EcomSend Shopify Frontend – Technical Overview

A markdown summary of the project’s **technical stack**, **features**, and **languages**.

---

## Technical Stack

### Core

| Category              | Technology        |
| --------------------- | ----------------- |
| **Runtime**           | Browser (ES2020+) |
| **Language**          | TypeScript 4.7    |
| **UI Framework**      | React 18.3        |
| **Build Tool**        | Vite 4.4          |
| **Module Resolution** | ESNext, bundler   |

### Shopify Ecosystem

| Package                     | Purpose                           |
| --------------------------- | --------------------------------- |
| `@shopify/app-bridge`       | Embedded app host communication   |
| `@shopify/app-bridge-react` | React hooks for App Bridge        |
| `@shopify/app-bridge-utils` | Utilities (e.g. mobile detection) |
| `@shopify/polaris`          | Polaris React components (legacy) |
| `@shopify/polaris-types`    | Types for Polaris web components  |
| `@shopify/polaris-icons`    | Icon set                          |
| `@shopify/polaris-viz`      | Charts and visualizations         |

**UI:** Mix of **Polaris React** and **web-polaris** custom elements (`s-table`, `s-button`, `s-text`, `s-checkbox`, `s-modal`, etc.) for newer screens (e.g. Subscribers table, filters, modals).

### State & Data

| Technology       | Use                                 |
| ---------------- | ----------------------------------- |
| **MobX**         | Global state (stores)               |
| **mobx-react**   | React bindings (Observer, Provider) |
| **mobx-persist** | Persist store state                 |
| **mobx-utils**   | Utilities                           |
| **axios**        | HTTP client                         |

### Routing & Navigation

| Technology                | Use                                                     |
| ------------------------- | ------------------------------------------------------- |
| **react-router-dom** (v5) | Declarative routing                                     |
| **react-router-config**   | Central route config and `renderRoutes` / `matchRoutes` |

### Internationalization (i18n)

| Technology                           | Use                     |
| ------------------------------------ | ----------------------- |
| **i18next**                          | Core i18n engine        |
| **react-i18next**                    | React integration       |
| **i18next-browser-languagedetector** | Detect browser language |
| **translation-check**                | i18n plugin             |

Namespaces: `common`, `dashboard`, `popups`, `campaigns`, `automations`, `setting`, `menu`, `subscribers`, `MailEditor`, `analytics`, `get_help`, etc.

### UI & Styling

| Technology                        | Use                               |
| --------------------------------- | --------------------------------- |
| **Polaris (React + web-polaris)** | Design system and components      |
| **Sass/SCSS**                     | Styles (modules: `*.module.scss`) |
| **Tailwind CSS**                  | Utility classes where used        |
| **classnames**                    | Conditional class names           |

### Drag & Drop / Sortable

| Technology                                  | Use                            |
| ------------------------------------------- | ------------------------------ |
| **@dnd-kit/core**                           | Drag-and-drop core             |
| **@dnd-kit/sortable**                       | Sortable lists                 |
| **@dnd-kit/modifiers**                      | Constrain drag (e.g. vertical) |
| **react-dnd** / **react-dnd-html5-backend** | Alternative DnD (e.g. editor)  |

### Rich Text & Code

| Technology                                | Use                            |
| ----------------------------------------- | ------------------------------ |
| **draft-js**                              | Rich text model                |
| **react-draft-wysiwyg**                   | WYSIWYG editor                 |
| **@uiw/react-codemirror**                 | Code editing                   |
| **@codemirror/lang-html**, **lang-css**   | CodeMirror language support    |
| **dompurify**                             | Sanitize HTML                  |
| **html-to-draftjs** / **draftjs-to-html** | Convert between HTML and Draft |

### Charts & Visualization

| Technology               | Use                                         |
| ------------------------ | ------------------------------------------- |
| **echarts**              | Charts                                      |
| **echarts-for-react**    | React wrapper for ECharts                   |
| **@shopify/polaris-viz** | Polaris charts (e.g. LineChart, ComboChart) |

### Utilities & Helpers

| Technology                                     | Use                         |
| ---------------------------------------------- | --------------------------- |
| **lodash-es**                                  | General utilities           |
| **dayjs**                                      | Dates and time              |
| **validator**                                  | Validation                  |
| **numeral**                                    | Number formatting           |
| **qs** / **query-string**                      | Query string parsing        |
| **libphonenumber-js**                          | Phone formatting/validation |
| **copy-to-clipboard** / **use-clipboard-copy** | Clipboard                   |
| **number-precision**                           | Precise arithmetic          |

### Dev & Quality

| Technology                  | Use                                         |
| --------------------------- | ------------------------------------------- |
| **TypeScript**              | Static typing                               |
| **ESLint**                  | Linting (TypeScript, React, hooks, imports) |
| **Prettier**                | Formatting                                  |
| **Jest**                    | Unit tests                                  |
| **@testing-library/react**  | Component tests                             |
| **Husky** / **lint-staged** | Pre-commit hooks                            |

### Deployment & Infra

| Technology   | Use                                      |
| ------------ | ---------------------------------------- |
| **Wrangler** | Cloudflare Pages deploy                  |
| **Vite**     | Dev server (port 4000), production build |

### Other Notable Dependencies

- **ahooks** – React hooks (e.g. `useDocumentVisibility`)
- **react-use-intercom** – Intercom integration
- **react-loadable** / **@loadable/component** – Code splitting
- **react-responsive-carousel** – Carousels
- **react-custom-roulette** – Spin wheel
- **emoji-picker-react** – Emoji picker
- **web-vitals** – Performance metrics
- **@channelwill/editor** / **@channelwill/components** – Channelwill editor/components

---

## Features (by Route / Page)

| Route                               | Feature                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `/`                                 | **Dashboard** – Overview, quick setup, banners, user guide                |
| `/popups`                           | **Popups** – List, create/edit popups (opt-in, spin wheel)                |
| `/popups/OptInPopup/:id`            | **Opt-in popup** – Preview/edit opt-in popup                              |
| `/popups/SpinWheelPopup/:id`        | **Spin wheel popup** – Preview/edit spin wheel                            |
| `/subscribers`                      | **Subscribers** – List, filters, sort, column config, export, bulk delete |
| `/get-help`                         | **Get Help** – Feedback/support                                           |
| `/recommendation`                   | **Recommendation** – Recommendations / banners                            |
| `/by-channelwill`                   | **By Channelwill** – Channelwill integration                              |
| `/campaigns`                        | **Campaigns** – Email campaign list                                       |
| `/campaigns/edit/:id`               | **Edit campaign** – Create/edit campaign                                  |
| `/campaigns/email-template`         | **Email template** – Template selection/editor                            |
| `/campaigns/email-default-settings` | **Email default settings** (from campaigns)                               |
| `/settings`                         | **Settings** – App settings entry                                         |
| `/settings/email-default-settings`  | **Email / brand settings** – Default email, domains, UTM, etc.            |
| `/subConfirmed`                     | **Subscription confirmed** – Post-subscribe confirmation                  |
| `/unsubConfirmed`                   | **Unsubscribe confirmed** – Post-unsubscribe confirmation                 |
| `/automations`                      | **Automations** – Automation list                                         |
| `/automations/:id`                  | **Automation detail** – When/Then rules, triggers, actions                |
| `/analytics`                        | **Analytics** – Analytics views                                           |
| `*`                                 | **NotFound** – Fallback route                                             |

### Feature Highlights

- **Subscribers:** Search, filters (email/SMS status, popup, country, subscription date, birthday), sort, customizable columns (drag order), CSV export, bulk delete, responsive table (desktop + mobile row layout).
- **Popups:** Opt-in and spin wheel popups; rules, rewards, triggers; text/content and locale configuration.
- **Campaigns:** List, create/edit, email template flow, scheduling, A/B test.
- **Automations:** List and detail; “When” triggers and “Then” actions; campaign toggles, order status, etc.
- **Settings:** Email defaults, brand (e.g. subscription blocks), domains (DNS), UTM, language.
- **Shopify embedding:** Full-screen and embedded layouts; App Bridge navigation and modals; resource wrapper where needed.

---

## Languages & Locales

### Source Code & Markup

| Language       | Use                               |
| -------------- | --------------------------------- |
| **TypeScript** | Application and plugin logic      |
| **TSX/JSX**    | React components                  |
| **SCSS/Sass**  | Styles (global + CSS modules)     |
| **CSS**        | Polaris and other vendor styles   |
| **JSON**       | i18n (en-US), config, static data |
| **HTML**       | `index.html`, docs                |

### Supported App Locales (i18n)

- **en-US** – English (default, bundled).
- **zh** – Chinese (from `SupportLanguages`; other locales can be loaded from server).

Fallback language: `en-US`.  
Namespaces align with app areas: `common`, `dashboard`, `popups`, `campaigns`, `automations`, `setting`, `menu`, `subscribers`, `MailEditor`, `analytics`, `get_help`, etc.

---

## Project Structure (High Level)

```
src/
├── api/           # API clients (subscribers, popups, campaigns, automation, analytics, app, mail, etc.)
├── assets/        # Global SCSS, images
├── component/     # Shared UI (CustomPage, SubscribersTable, SubscribersFilter, modals, etc.)
├── components/    # Additional shared components (Modal, Editor, LocaleSwitch, etc.)
├── config/        # App config
├── hooks/         # Custom hooks (e.g. useServerTranslation)
├── i18n/          # i18next config, resources, SupportLanguages
├── init/          # BridgeTransfer, fullscreen bars, bootstrap
├── layouts/       # Menu, navigation
├── pages/         # Route pages (Dashboard, Popups, Subscribers, Campaigns, Settings, Automations, Analytics, etc.)
├── router/        # Route config (react-router-config)
├── stores/        # MobX stores (UserInfo, Subscribers, Campaigns, Popups, Settings, Analytics, etc.)
├── types/         # Global TS types, global declarations (Window, JSX)
├── utils/         # Helpers (datetime, app-bridge, env, i18n, etc.)
├── main.tsx       # React root, AppProvider, Router, Intercom
└── vite-env.d.ts  # Vite env types, global Cio/Window
plugin/            # Plugin-specific code (separate build)
docs/              # Web component docs (Polaris web-polaris), guides
```

---

## Scripts (package.json)

| Script                                               | Purpose                                          |
| ---------------------------------------------------- | ------------------------------------------------ |
| `dev`                                                | Vite dev server (port 4000)                      |
| `dev:nested`                                         | Nested dev (port 4789)                           |
| `build`                                              | Production build                                 |
| `build:dev` / `build:test`                           | Build for dev/test                               |
| `build-p` / `build-p:dev` / `build-p:test`           | Plugin build + generate client entrance          |
| `deploy:test`                                        | Build test + Wrangler deploy to Cloudflare Pages |
| `preview`                                            | Vite preview                                     |
| `eslint`                                             | Lint and fix `src` & `plugin`                    |
| `plat:t`                                             | Flatten i18n (script)                            |
| `wasm:base64`                                        | Generate WASM base64 (script)                    |
| `theme-ext` / `theme-ext:connect` / `theme-ext:push` | Shopify theme app extension                      |

---

_Generated from the current codebase. Update this file when the stack or features change._
