# Product Requirements Document — Todo Monorepo

## Overview
A full-stack Todo application built as a pnpm monorepo with shared packages, a Hono REST API backend, a TanStack Start web frontend, and an Expo mobile app.

## Features

### Core Features
1. **Create Todo** — Add a new todo with a title
2. **List Todos** — View all todos
3. **Update Todo** — Edit a todo's title
4. **Delete Todo** — Remove a todo
5. **Toggle Completion** — Mark a todo as complete/incomplete

### User Stories
- As a user, I can add a new todo so I can track tasks
- As a user, I can see all my todos in a list
- As a user, I can mark a todo as complete/incomplete
- As a user, I can edit a todo's title
- As a user, I can delete a todo I no longer need

### Acceptance Criteria
- All CRUD operations work end-to-end
- Todos persist in SQLite database
- Web and mobile apps consume the same API
- Shared types ensure type safety across all packages
- Shared API client used by both web and mobile apps

## Non-Functional Requirements
- TypeScript strict mode in all packages
- Backend on port 3001, web on port 3000
- pnpm workspaces for dependency management
- Clean monorepo structure with shared packages

## Out of Scope
- User authentication
- Multi-user support
- Real-time sync
- Deployment/CI/CD
