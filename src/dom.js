//src/dom.js

import Todo from "./classes/todo.js";

import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  toggleTodo,
  addTodoToCurrentProject,
} from "./state.js";

// Grab Elements
const projectListEl = document.getElementById("project-list");
const todoListEl = document.getElementById("todo-list");
const projectTitleEl = document.getElementById("project-title");

// Form
const form = document.getElementById("todo-form");
const titleInput = document.getElementById("todo-title");
const dateInput = document.getElementById("todo-dueDate");
const priorityInput = document.getElementById("todo-priority");

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  const todo = new Todo(title, "", dueDate, priority);

  addTodoToCurrentProject(todo);

  renderTodos();

  form.reset();
});

function createProjectElement(project) {
  const li = document.createElement("li");
  li.textContent = project.name;

  li.addEventListener("click", () => {
    setCurrentProject(project);
    renderTodos();
  });

  return li;
}

export function renderProjects() {
  const projects = getProjects();
  projectListEl.innerHTML = "";

  projects.forEach((project) => {
    projectListEl.appendChild(createProjectElement(project));
  });
}

function createTodoElement(todo) {
  const li = document.createElement("li");

  li.textContent = `${todo.title} (${todo.dueDate})`;

  if (todo.completed) {
    li.style.textDecoration = "line-through";
  }

  li.addEventListener("click", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  return li;
}

export function renderTodos() {
  const currentProject = getCurrentProject();

  projectTitleEl.textContent = currentProject.name;
  todoListEl.innerHTML = "";

  currentProject.todos.forEach((todo) => {
    const li = createTodoElement(todo);
    todoListEl.appendChild(li);
  });
}

export function renderApp() {
  renderProjects();
  renderTodos();
}
