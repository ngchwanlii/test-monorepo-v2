# Development Plan — Todo Monorepo

## Phase 1: Foundation [⏳ NOT STARTED]
Set up monorepo structure, shared packages, and root configs.

### Tasks
- [ ] Root package.json, pnpm-workspace.yaml, tsconfig.base.json
- [ ] packages/types — shared Todo types
- [ ] packages/api-client — shared fetch-based API client

### Branch: `feat/foundation`
### PR: Foundation — monorepo setup + shared packages

---

## Phase 2: Backend [⏳ NOT STARTED]
Build the Hono REST API with SQLite persistence.

### Tasks
- [ ] apps/backend — Hono server with SQLite
- [ ] CRUD routes for todos
- [ ] CORS middleware for frontend/mobile access

### Branch: `feat/backend`
### PR: Backend — Hono REST API + SQLite

---

## Phase 3: Web Frontend [⏳ NOT STARTED]
Build the TanStack Start web app consuming the API.

### Tasks
- [ ] apps/web — TanStack Start project setup
- [ ] Todo list page with CRUD operations
- [ ] Toggle completion UI

### Branch: `feat/web`
### PR: Web — TanStack Start frontend

---

## Phase 4: Mobile App [⏳ NOT STARTED]
Build the Expo React Native app consuming the API.

### Tasks
- [ ] apps/mobile — Expo project setup with Expo Router
- [ ] Todo list screen with CRUD operations
- [ ] Toggle completion UI

### Branch: `feat/mobile`
### PR: Mobile — Expo React Native app

---

## Phase 5: Finalization [⏳ NOT STARTED]
Final testing, cleanup, and documentation.

### Tasks
- [ ] End-to-end verification
- [ ] README.md generation
- [ ] Cleanup worktrees and branches
