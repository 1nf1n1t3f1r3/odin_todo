import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  toggleTodo,
} from "./state.js";

const projectListEl = document.getElementById("project-list");
const todoListEl = document.getElementById("todo-list");
const projectTitleEl = document.getElementById("project-title");

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
