import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { TodoApiClient } from "@todo-monorepo/api-client";
import type { Todo } from "@todo-monorepo/types";

const api = new TodoApiClient("http://localhost:3001");

export const Route = createFileRoute("/")({
  component: TodoApp,
});

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getAll();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos. Is the backend running on port 3001?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      setError(null);
      await api.create({ title: newTitle.trim() });
      setNewTitle("");
      await fetchTodos();
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      setError(null);
      await api.toggle(id);
      await fetchTodos();
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await api.delete(id);
      await fetchTodos();
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editTitle.trim()) return;
    try {
      setError(null);
      await api.update(editingId, { title: editTitle.trim() });
      setEditingId(null);
      setEditTitle("");
      await fetchTodos();
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  if (loading) {
    return (
      <div>
        <h1>Todo App</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo App</h1>

      {error && (
        <p style={{ color: "red", padding: "8px", background: "#fee", borderRadius: "4px" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleCreate} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                style={{ cursor: "pointer" }}
              />

              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    style={{ flex: 1 }}
                    autoFocus
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? 0.6 : 1,
                    }}
                  >
                    {todo.title}
                  </span>
                  <button onClick={() => handleStartEdit(todo)}>Edit</button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
        {todos.filter((t) => !t.completed).length} item(s) remaining
      </p>
    </div>
  );
}
