# Tasks — Todo Monorepo

## Phase 1: Foundation

### TASK-001: Monorepo Root Setup
- **Status:** ⏳ TODO
- **Assignee:** Backend Engineer
- **Branch:** `feat/foundation`
- **Description:** Create root package.json, pnpm-workspace.yaml, tsconfig.base.json, .gitignore updates
- **Acceptance Criteria:**
  - pnpm workspaces configured for packages/* and apps/*
  - Base tsconfig with strict mode
  - Root scripts for building

### TASK-002: Shared Types Package
- **Status:** ⏳ TODO
- **Assignee:** Backend Engineer
- **Branch:** `feat/foundation`
- **Description:** Create packages/types with Todo, CreateTodoInput, UpdateTodoInput
- **Acceptance Criteria:**
  - Package named @todo-monorepo/types
  - All three types exported
  - TypeScript strict mode

### TASK-003: Shared API Client Package
- **Status:** ⏳ TODO
- **Assignee:** Backend Engineer
- **Branch:** `feat/foundation`
- **Description:** Create packages/api-client with fetch-based TodoApiClient
- **Acceptance Criteria:**
  - Package named @todo-monorepo/api-client
  - Uses @todo-monorepo/types
  - All CRUD + toggle methods implemented

---

## Phase 2: Backend

### TASK-004: Hono REST API
- **Status:** ⏳ TODO
- **Assignee:** Backend Engineer
- **Branch:** `feat/backend`
- **Description:** Create apps/backend with Hono server, SQLite database, CRUD routes
- **Acceptance Criteria:**
  - Hono (NOT Express) server on port 3001
  - SQLite database with todos table
  - All 6 API endpoints working
  - CORS enabled
  - Uses @todo-monorepo/types

---

## Phase 3: Web Frontend

### TASK-005: TanStack Start Web App
- **Status:** ⏳ TODO
- **Assignee:** Frontend Engineer
- **Branch:** `feat/web`
- **Description:** Create apps/web with TanStack Start, React 19, full CRUD UI
- **Acceptance Criteria:**
  - TanStack Start with Vite 7
  - Uses @todo-monorepo/api-client
  - Full CRUD operations in UI
  - Toggle completion checkbox
  - Runs on port 3000

---

## Phase 4: Mobile

### TASK-006: Expo Mobile App
- **Status:** ⏳ TODO
- **Assignee:** Mobile Engineer
- **Branch:** `feat/mobile`
- **Description:** Create apps/mobile with Expo, Expo Router, full CRUD UI
- **Acceptance Criteria:**
  - Expo with Expo Router
  - Uses @todo-monorepo/api-client
  - Full CRUD operations in UI
  - Toggle completion
