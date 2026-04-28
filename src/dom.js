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

  // =========================
  // HEADER (always visible)
  // =========================
  const header = document.createElement("div");
  header.style.cursor = "pointer";
  header.style.display = "flex";
  header.style.gap = "8px";
  header.style.alignItems = "center";

  const title = document.createElement("strong");
  title.textContent = todo.title;

  const meta = document.createElement("span");
  meta.textContent = `| ${todo.dueDate} | ${todo.priority}`;

  header.append(title, meta);

  header.addEventListener("click", () => {
    if (expandedTodos.has(todo.id)) {
      expandedTodos.delete(todo.id);
    } else {
      expandedTodos.add(todo.id);
    }
    renderApp();
  });

  li.appendChild(header);

  // =========================
  // EXPANDED SECTION ONLY
  // =========================
  if (isExpanded) {
    // DESCRIPTION
    const desc = document.createElement("p");
    desc.textContent = todo.description;
    li.appendChild(desc);

    // ACTIONS WRAPPER
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "8px";

    // COMPLETE / UNDO
    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "Undo" : "Complete";

    completeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleTodo(todo.id);
      renderApp();
    });

    // EDIT
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const newTitle = prompt("Title:", todo.title);
      const newDesc = prompt("Description:", todo.description);
      const newDate = prompt("Due date:", todo.dueDate);
      const newPriority = prompt("Priority:", todo.priority);

      if (!newTitle || !newDesc || !newDate || !newPriority) return;

      todo.update({
        title: newTitle,
        description: newDesc,
        dueDate: newDate,
        priority: newPriority,
      });

      renderApp();
    });

    // DELETE
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodoFromCurrentProject(todo.id);
      expandedTodos.delete(todo.id);
      renderApp();
    });

    actions.append(completeBtn, editBtn, deleteBtn);
    li.appendChild(actions);
  }

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
