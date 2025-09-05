const fs = require("fs");
const file = "todos.json";

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify([]));
}
const readTodos = () => JSON.parse(fs.readFileSync(file));
const saveTodos = (todos) =>
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));

const addTask = (task) => {
  const todos = readTodos();
  todos.push({ task, done: false });
  saveTodos(todos);
  console.log("✅ Task added:", task);
};

const listTasks = () => {
  const todos = readTodos();
  if (todos.length === 0) return console.log("No tasks yet.");
  todos.forEach((t, i) =>
    console.log(`${i + 1}. ${t.task} [${t.done ? "✔" : "❌"}]`)
  );
};

const updateTask = (index, newTask) => {
  const todos = readTodos();
  if (index < 1 || index > todos.length) return console.log("Invalid index.");
  todos[index - 1].task = newTask;
  saveTodos(todos);
  console.log("✏ Task updated.");
};

const deleteTask = (index) => {
  const todos = readTodos();
  if (index < 1 || index > todos.length) return console.log("Invalid index.");
  const removed = todos.splice(index - 1, 1);
  saveTodos(todos);
  console.log("🗑 Task deleted:", removed[0].task);
};

const markDone = (index) => {
  const todos = readTodos();
  if (index < 1 || index > todos.length) return console.log("Invalid index.");
  todos[index - 1].done = true;
  saveTodos(todos);
  console.log("✔ Task marked as done.");
};

const [,, cmd, ...args] = process.argv;
if (cmd === "add") addTask(args.join(" "));
else if (cmd === "list") listTasks();
else if (cmd === "update") updateTask(Number(args[0]), args.slice(1).join(" "));
else if (cmd === "delete") deleteTask(Number(args[0]));
else if (cmd === "done") markDone(Number(args[0]));
else console.log("Usage: node todo.js add|list|update|delete|done");
