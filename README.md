# OpenAdmin

React 19 + Vite admin dashboard SPA (OpenAdmin). Provides cookie + bearer auth, role-gated routes, paginated/searchable data tables, and management views for users, AI agents/chats, server logs & errors, and database backups.

## Tech stack

- **React 19**, **Vite 8** (`@vitejs/plugin-react-swc`), **React Router 7**
- **react-query v3** — server-state / data fetching
- **axios** — HTTP (two instances: cookie-based `http`, bearer `authHttp`)
- **RxJS** — used only for the auth `BehaviorSubject`
- **Bootstrap 5** + **Sass** (`sass-embedded`) — styling entry at `src/assets/styles/main.scss`
- **styled-components**, **react-data-table-component**, **chart.js** + **react-chartjs-2**, **react-datepicker**
- **yup** — validation schemas in `src/validation/`
- **moment**, **query-string**

No test framework is configured.

## Quick start

```bash
yarn install
cp .env.example .env        # then edit — see Environment below
yarn start
```

## Scripts

| Command | Purpose |
| --- | --- |
| `yarn start` | Vite dev server with HMR |
| `yarn build` | Production build to `dist/` |
| `yarn preview` | Serve the production build locally |
| `yarn lint` | ESLint over `**/*.{js,jsx}` |

## Environment

Vite reads `.env` and exposes `VITE_`-prefixed vars to the client.

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend base URL (e.g. `http://localhost:3001/v1`) |
| `VITE_WITH_SERVER` | When truthy, `src/index.jsx` awaits `authService.refreshToken()` before mounting so a cookie session can hydrate the user; when unset, the app mounts immediately without contacting the API |
| `VITE_SITE_NAME` | Displayed in UI chrome |

`config.json` at the repo root holds app-level constants. Currently just `homeUrl` (default `/dashboard`) — the post-login landing route.

## Architecture

### Auth flow (read before touching auth code)

- `src/services/auth.service.js` owns a module-level `userSubject` (`BehaviorSubject`). `login` and `refreshToken` push `{ ...user, token }` into it and schedule a `setTimeout` to refresh 60s before `tokens.access.expires`.
- `src/index.jsx` awaits `authService.refreshToken()` (only when `VITE_WITH_SERVER`) before mounting — this is what makes `authService.userValue` synchronously available to route guards on first render.
- `src/routing/RequireAuth.jsx` reads `authService.userValue` synchronously. If null, redirects to `/login`. If the user's role is not in the route's `roles` array, calls `authService.logout()`.

### HTTP layer

Two axios instances in `src/services/`:

- `http.service.js` → named export `http` — plain axios with `withCredentials: true`. Used only for `/auth/*` endpoints (cookie-based refresh).
- `authHttp.service.js` → default export — request interceptor injects `Authorization: Bearer <token>` from `authService.userValue`. Response interceptor:
  - **4xx (except 404)** — resolves (does **not** reject) with `response.isError = true`, so callers branch on `isError` instead of wrapping in try/catch.
  - **401/403** — calls `refreshToken()` and retries the original request once (guarded by `config._retry`).
  - **5xx** — rejects normally.

New feature services should use `authHttp` and follow the `isError` convention.

### Routing

- `src/App.jsx` maps `publicRoutes` and `protectedRoutes` (from `src/routing/`) into React Router `<Route>`s, wrapping protected routes in `RequireAuth`.
- Each route entry is `{ path, layout, roles, element }`. Layouts are applied by **composition** (`<route.layout><route.element/></route.layout>`), not via nested routes.
- `src/routing/sidebar.menu.js` drives the sidebar nav **independently** of the route table — when you add a page, update both.

### Data layer

- `src/hooks/useTableData.jsx` is the standard paginated/sortable/searchable table hook. Wraps `react-query`'s `useQuery`, debounces `search` (500ms), and prefetches the next page. Signature: `(queryKey, getService, options)` where `getService(params)` returns `{ data }`. If `options.id` is a string, it's passed as the first arg to `getService` (nested-resource pattern). **Reuse this hook** for any new table view rather than rolling a custom query.
- Feature-specific react-query hooks live in `src/query/` (e.g. `ai.query.jsx`); raw API calls live in `src/services/*.service.js`.
- `QueryClientProvider` is instantiated in `App.jsx` with a single default `new QueryClient()`.

## Routes

All protected routes require roles `['systemAdmin', 'admin']` (`db-backups` is `systemAdmin` only in the sidebar).

### Public (`src/routing/public.routes.jsx`)

| Path | Layout | View |
| --- | --- | --- |
| `/` | DefaultLayout | Redirects to `config.homeUrl` |
| `/login` | LoginLayout | LoginEmail |
| `/login-google` | LoginLayout | LoginGoogle |
| `/dev` | DashboardLayout | Dev (dev utility view) |

### Protected (`src/routing/protected.routes.jsx`)

| Path | View |
| --- | --- |
| `/dashboard` | DashboardMain |
| `/users` | Users |
| `/ai`, `/ai/knowledge-base` | KnowledgeBase |
| `/ai/chat-logs` | ChatLogs |
| `/server` | ServerStats |
| `/server/server-errors` | ServerErrors |
| `/server/server-logs` | ServerLogs |
| `/db-backups` | Redirects to `/db-backups/pro` |
| `/db-backups/:db` | DbBackups |

## Directory layout

```
src/
  Views/         top-level route components (auth/, AI/, Users/, Server/, DashboardMain, DbBackups, Settings, Dev)
  Features/      larger feature modules (AI, Charts, ServerLogs, Settings)
  components/    shared UI (DataTable, Sidebar, Modals, InputComponents, DateFilter, ServerLogsFilter)
  layouts/       DashboardLayout, DefaultLayout, LoginLayout
  hooks/         useTableData, useDebounce, useEditModal, useDataModal, useDeleteById
  context/       search-context.jsx (shared search state)
  routing/       public.routes.jsx, protected.routes.jsx, RequireAuth.jsx, sidebar.menu.js
  services/      axios instances + per-resource API (auth, user, ai, dbBackup, serverLogs, serverError)
  query/         react-query feature hooks
  tables/        column configs for react-data-table-component
  validation/    yup schemas
  assets/styles/ main.scss (Sass + Bootstrap 5 entry)
```

## Backend endpoints consumed

From `src/services/*.service.js`:

- **Auth** — `/auth/register`, `/auth/login/email`, `/auth/login/dashboard`, `/auth/logout`, `/auth/refresh-tokens`, `/auth/forgot-password`, `/auth/reset-password`
- **Users** — `/users` (CRUD), `/users/roles`, `/users/timeSeries`
- **AI** — `/ai/agents` (CRUD), `/ai/chats` (CRUD), `/ai/chat-logs`
- **DB backups** — `/db-backups` (CRUD + download)
- **Server logs** — `/accessLog`, `/accessLog/options`, `/accessLog/timeSeries`
- **Server errors** — `/server-errors`

## Conventions & gotchas
-Select Bootstrap Icons with fill option for sidebar
- New feature services should use `authHttp` and branch on `response.isError` rather than wrapping in try/catch (4xx except 404 resolves, not rejects).
- Adding a page means updating **both** the relevant routes file **and** `src/routing/sidebar.menu.js` — they're decoupled.
- ESLint is flat config (`eslint.config.js`): `no-unused-vars` allows UPPER_CASE / PascalCase identifiers via `varsIgnorePattern: '^[A-Z_]'` (so unused imported components don't flag).
- Vite config (`vite.config.js`) uses the SWC React plugin and prioritizes ES-module `mainFields` (`['module', 'browser', 'jsnext:main', 'jsnext']`). No path aliases.

## Favicon

Generated via https://favicon.io/favicon-converter/.
