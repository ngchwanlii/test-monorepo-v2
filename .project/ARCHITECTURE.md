# Architecture — Todo Monorepo

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Monorepo | pnpm workspaces |
| Backend | Hono + better-sqlite3 |
| Web Frontend | TanStack Start (React 19, Vite 7) |
| Mobile | Expo (React Native, Expo Router) |
| Shared Types | TypeScript package |
| Shared API Client | Fetch-based TypeScript package |
| Language | TypeScript (strict mode) |

## Directory Structure
```
test-monorepo-v2/
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── packages/
│   ├── types/              # @todo-monorepo/types
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts    # Todo, CreateTodoInput, UpdateTodoInput
│   └── api-client/         # @todo-monorepo/api-client
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           └── index.ts    # TodoApiClient class
├── apps/
│   ├── backend/            # @todo-monorepo/backend
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts    # Hono server entry
│   │       ├── db.ts       # SQLite setup
│   │       └── routes/
│   │           └── todos.ts # Todo CRUD routes
│   ├── web/                # @todo-monorepo/web
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── app.config.ts
│   │   └── app/
│   │       ├── routes/
│   │       │   └── index.tsx
│   │       ├── client.tsx
│   │       ├── router.tsx
│   │       └── ssr.tsx
│   └── mobile/             # @todo-monorepo/mobile
│       ├── package.json
│       ├── tsconfig.json
│       ├── app.json
│       └── app/
│           ├── _layout.tsx
│           └── index.tsx
└── .project/               # Project docs
```

## Database Schema
```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## API Design

Base URL: `http://localhost:3001`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | /api/todos | List all todos | — | Todo[] |
| GET | /api/todos/:id | Get single todo | — | Todo |
| POST | /api/todos | Create todo | CreateTodoInput | Todo |
| PATCH | /api/todos/:id | Update todo | UpdateTodoInput | Todo |
| DELETE | /api/todos/:id | Delete todo | — | { success: true } |
| PATCH | /api/todos/:id/toggle | Toggle completion | — | Todo |

## Shared Types
```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateTodoInput {
  title: string;
}

interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}
```

## Shared API Client
```typescript
class TodoApiClient {
  constructor(baseUrl: string)
  getAll(): Promise<Todo[]>
  getById(id: string): Promise<Todo>
  create(input: CreateTodoInput): Promise<Todo>
  update(id: string, input: UpdateTodoInput): Promise<Todo>
  delete(id: string): Promise<void>
  toggle(id: string): Promise<Todo>
}
```
