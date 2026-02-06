import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import db from "../db.js";
import type { Todo, CreateTodoInput, UpdateTodoInput } from "@todo-monorepo/types";

interface TodoRow {
  id: string;
  title: string;
  completed: number;
  created_at: string;
  updated_at: string;
}

function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const todos = new Hono();

// GET /api/todos - List all todos
todos.get("/", (c) => {
  const rows = db.prepare("SELECT * FROM todos ORDER BY created_at DESC").all() as TodoRow[];
  return c.json(rows.map(rowToTodo));
});

// GET /api/todos/:id - Get single todo
todos.get("/:id", (c) => {
  const { id } = c.req.param();
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  if (!row) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(rowToTodo(row));
});

// POST /api/todos - Create todo
todos.post("/", async (c) => {
  const body = await c.req.json<CreateTodoInput>();
  if (!body.title || !body.title.trim()) {
    return c.json({ error: "Title is required" }, 400);
  }

  const id = uuidv4();
  const now = new Date().toISOString().replace("T", " ").replace("Z", "");

  db.prepare(
    "INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (?, ?, 0, ?, ?)"
  ).run(id, body.title.trim(), now, now);

  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow;
  return c.json(rowToTodo(row), 201);
});

// PATCH /api/todos/:id - Update todo
todos.patch("/:id", async (c) => {
  const { id } = c.req.param();
  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  if (!existing) {
    return c.json({ error: "Todo not found" }, 404);
  }

  const body = await c.req.json<UpdateTodoInput>();
  const now = new Date().toISOString().replace("T", " ").replace("Z", "");

  const title = body.title !== undefined ? body.title.trim() : existing.title;
  const completed = body.completed !== undefined ? (body.completed ? 1 : 0) : existing.completed;

  db.prepare(
    "UPDATE todos SET title = ?, completed = ?, updated_at = ? WHERE id = ?"
  ).run(title, completed, now, id);

  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow;
  return c.json(rowToTodo(row));
});

// DELETE /api/todos/:id - Delete todo
todos.delete("/:id", (c) => {
  const { id } = c.req.param();
  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  if (!existing) {
    return c.json({ error: "Todo not found" }, 404);
  }

  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  return c.json({ success: true });
});

// PATCH /api/todos/:id/toggle - Toggle completion
todos.patch("/:id/toggle", (c) => {
  const { id } = c.req.param();
  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  if (!existing) {
    return c.json({ error: "Todo not found" }, 404);
  }

  const now = new Date().toISOString().replace("T", " ").replace("Z", "");
  const newCompleted = existing.completed === 1 ? 0 : 1;

  db.prepare(
    "UPDATE todos SET completed = ?, updated_at = ? WHERE id = ?"
  ).run(newCompleted, now, id);

  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow;
  return c.json(rowToTodo(row));
});

export default todos;
