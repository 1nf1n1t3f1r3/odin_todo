//src/dom.js

import Todo from "./classes/todo.js";

import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  toggleTodo,
  addTodoToCurrentProject,
  addProject,
  deleteTodoFromCurrentProject,
} from "./state.js";

// Grab Elements
const projectListEl = document.getElementById("project-list");
const todoListEl = document.getElementById("todo-list");
const projectTitleEl = document.getElementById("project-title");

// Todo Form
const form = document.getElementById("todo-form");
const titleInput = document.getElementById("todo-title");
const dateInput = document.getElementById("todo-dueDate");
const priorityInput = document.getElementById("todo-priority");

// Add Project
const addProjectBtn = document.getElementById("add-project-btn");

addProjectBtn.addEventListener("click", handleAddProject);

// Submit
export function initEventListeners() {
  form.addEventListener("submit", handleSubmitTodo);
}

function handleSubmitTodo(e) {
  e.preventDefault();

  const title = titleInput.value;
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  const todo = new Todo(title, "", dueDate, priority);

  addTodoToCurrentProject(todo);
  renderApp();
  form.reset();
}

function createProjectElement(project) {
  const li = document.createElement("li");
  li.textContent = project.name;

  if (project.id === getCurrentProject().id) {
    li.style.fontWeight = "bold";
  }

  li.addEventListener("click", () => {
    setCurrentProject(project);
    renderApp();
  });

  return li;
}

function handleAddProject() {
  const name = prompt("Project name?");
  if (!name) return;

  const project = addProject(name);
  setCurrentProject(project);
  renderApp();
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

  const text = document.createElement("span");
  text.textContent = `${todo.title} (${todo.dueDate})`;

  if (todo.completed) {
    text.style.textDecoration = "line-through";
  }

  text.addEventListener("click", () => {
    toggleTodo(todo.id);
    renderApp();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // IMPORTANT (explained below)
    deleteTodoFromCurrentProject(todo.id);
    renderApp();
  });

  li.append(text, deleteBtn);

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
