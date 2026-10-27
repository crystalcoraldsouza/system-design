const express = require("express");

const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: "Learn Express", completed: false },
  { id: 2, task: "Build REST API", completed: false },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id", id);
  const index = todos.findIndex((t) => t.id === id);
  todos[index] = {
    id,
    task: req.body.task,
    completed: req.body.completed,
  };
  res.json(todos[index]);
});

app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (req.body.task !== undefined) {
    todo.task = req.body.task;
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ message: "Todo deleted" });
});

app.head("/todos", (req, res) => {
  res.status(200).end();
});

app.options("/todos", (req, res) => {
  res.set("Allow", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.send();
});

app.trace("/trace", (req, res) => {
  res.send(req.headers);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
