# Development Plan -- Todo Monorepo

## Phase 1: Foundation [COMPLETE]
Set up monorepo structure, shared packages, and root configs.

### Tasks
- [x] Root package.json, pnpm-workspace.yaml, tsconfig.base.json
- [x] packages/types -- shared Todo types
- [x] packages/api-client -- shared fetch-based API client

### Branch: `feat/foundation`
### PR: #1 Foundation -- monorepo setup + shared packages (merged)

---

## Phase 2: Backend [COMPLETE]
Build the Hono REST API with SQLite persistence.

### Tasks
- [x] apps/backend -- Hono server with SQLite
- [x] CRUD routes for todos
- [x] CORS middleware for frontend/mobile access

### Branch: `feat/backend`
### PR: #2 Backend -- Hono REST API + SQLite (merged)

---

## Phase 3: Web Frontend [COMPLETE]
Build the TanStack Start web app consuming the API.

### Tasks
- [x] apps/web -- TanStack Start project setup
- [x] Todo list page with CRUD operations
- [x] Toggle completion UI

### Branch: `feat/web`
### PR: #3 Web -- TanStack Start frontend (merged)

---

## Phase 4: Mobile App [COMPLETE]
Build the Expo React Native app consuming the API.

### Tasks
- [x] apps/mobile -- Expo project setup with Expo Router
- [x] Todo list screen with CRUD operations
- [x] Toggle completion UI

### Branch: `feat/mobile`
### PR: #4 Mobile -- Expo React Native app (merged)

---

## Phase 5: Finalization [COMPLETE]
Final testing, cleanup, and documentation.

### Tasks
- [x] End-to-end verification
- [x] README.md generation
- [x] Update project docs
