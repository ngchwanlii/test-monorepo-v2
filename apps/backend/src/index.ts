import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import todos from "./routes/todos.js";

const app = new Hono();

app.use("/*", cors());

app.route("/api/todos", todos);

app.get("/", (c) => {
  return c.json({ message: "Todo API is running", version: "1.0.0" });
});

const port = 3001;

console.log(`Todo API server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
