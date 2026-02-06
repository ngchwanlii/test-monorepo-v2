import type { Todo, CreateTodoInput, UpdateTodoInput } from "@todo-monorepo/types";

export type { Todo, CreateTodoInput, UpdateTodoInput } from "@todo-monorepo/types";

export class TodoApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async getAll(): Promise<Todo[]> {
    const res = await fetch(`${this.baseUrl}/api/todos`);
    if (!res.ok) throw new Error(`Failed to fetch todos: ${res.statusText}`);
    return res.json();
  }

  async getById(id: string): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch todo: ${res.statusText}`);
    return res.json();
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create todo: ${res.statusText}`);
    return res.json();
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to update todo: ${res.statusText}`);
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete todo: ${res.statusText}`);
  }

  async toggle(id: string): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}/toggle`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error(`Failed to toggle todo: ${res.statusText}`);
    return res.json();
  }
}
