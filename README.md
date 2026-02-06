# Todo Monorepo

A full-stack Todo application built as a **pnpm monorepo** with shared packages, a Hono REST API backend, a TanStack Start web frontend, and an Expo React Native mobile app.

## Project Structure

```
todo-monorepo/
├── packages/
│   ├── types/              # @todo-monorepo/types - Shared TypeScript interfaces
│   └── api-client/         # @todo-monorepo/api-client - Fetch-based API client
├── apps/
│   ├── backend/            # @todo-monorepo/backend - Hono + SQLite REST API
│   ├── web/                # @todo-monorepo/web - TanStack Start (React 19)
│   └── mobile/             # @todo-monorepo/mobile - Expo (React Native)
├── package.json            # Root workspace config
├── pnpm-workspace.yaml     # pnpm workspace definition
└── tsconfig.base.json      # Shared TypeScript config
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Monorepo | pnpm workspaces |
| Backend | Hono + better-sqlite3 |
| Web Frontend | TanStack Start (React 19, Vite 7) |
| Mobile | Expo SDK 53 (React Native, Expo Router) |
| Shared Types | TypeScript (strict mode) |
| API Client | Fetch-based TypeScript client |

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Running the Backend

```bash
pnpm dev:backend
```

The API server starts at **http://localhost:3001**.

### Running the Web App

```bash
# Make sure the backend is running first
pnpm dev:web
```

The web app starts at **http://localhost:3000**.

### Running the Mobile App

```bash
# Make sure the backend is running first
pnpm dev:mobile
```

This starts the Expo dev server. Use the Expo Go app on your device or an emulator to run the app.

## API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | List all todos |
| GET | /api/todos/:id | Get a single todo |
| POST | /api/todos | Create a new todo |
| PATCH | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |
| PATCH | /api/todos/:id/toggle | Toggle completion status |

## Shared Packages

### @todo-monorepo/types

Shared TypeScript interfaces used across all packages:

- `Todo` - The todo item with id, title, completed, createdAt, updatedAt
- `CreateTodoInput` - Input for creating a todo (title)
- `UpdateTodoInput` - Input for updating a todo (title?, completed?)

### @todo-monorepo/api-client

A fetch-based API client class (`TodoApiClient`) that provides typed methods for all API operations. Used by both the web and mobile apps.

## Features

- Create, read, update, and delete todos
- Toggle todo completion status
- Inline editing on web
- Native alerts and confirmations on mobile
- Persistent storage with SQLite
- CORS enabled for cross-origin requests
- Platform-aware API URL for mobile (Android emulator vs iOS simulator)
- Server-side rendering on web with TanStack Start
