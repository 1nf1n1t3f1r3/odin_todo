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
const descriptionInput = document.getElementById("todo-description");
const dateInput = document.getElementById("todo-dueDate");
const priorityInput = document.getElementById("todo-priority");

// Add Project
const addProjectBtn = document.getElementById("add-project-btn");

addProjectBtn.addEventListener("click", handleAddProject);

// ???
const expandedTodos = new Set();

// Submit
export function initEventListeners() {
  form.addEventListener("submit", handleSubmitTodo);
}

function handleSubmitTodo(e) {
  e.preventDefault();

  const title = titleInput.value;
  const description = descriptionInput.value;
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  const todo = new Todo(title, description, dueDate, priority);

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

  const isExpanded = expandedTodos.has(todo.id);

  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.gap = "10px";
  header.style.cursor = "pointer";

  const title = document.createElement("strong");
  title.textContent = todo.title;

  const meta = document.createElement("span");
  meta.textContent = `${todo.dueDate} | ${todo.priority}`;

  header.append(title, meta);

  // EXPAND / COLLAPSE
  header.addEventListener("click", () => {
    if (expandedTodos.has(todo.id)) {
      expandedTodos.delete(todo.id);
    } else {
      expandedTodos.add(todo.id);
    }
    renderApp();
  });

  li.appendChild(header);

  // expanded section
  if (isExpanded) {
    const desc = document.createElement("p");
    desc.textContent = todo.description;
    li.appendChild(desc);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodoFromCurrentProject(todo.id);
    expandedTodos.delete(todo.id); // cleanup
    renderApp();
  });

  li.appendChild(deleteBtn);

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
