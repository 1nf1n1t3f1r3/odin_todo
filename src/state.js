//src/state.js

import Project from "./classes/project.js";
import Todo from "./classes/todo.js";

const defaultProject = new Project("Default");

let projects = [defaultProject];
let currentProject = defaultProject;

// Projects
export function getProjects() {
  return projects;
}

export function addProject(name) {
  const project = new Project(name);
  projects.push(project);
  saveState();
  return project;
}

export function deleteProject(projectId) {
  projects = projects.filter((p) => p.id !== projectId);
  saveState();
}

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
  saveState();
}

// Todos
export function toggleTodo(todoId) {
  currentProject.toggleTodo(todoId);
  saveState();
}

export function addTodoToCurrentProject(todo) {
  currentProject.addTodo(todo);
  saveState();
}
export function deleteTodoFromCurrentProject(todoId) {
  currentProject.removeTodo(todoId);
  saveState();
}

// Save / Load
const STORAGE_KEY = "odin_todo_app";

function saveState() {
  const data = {
    projects,
    currentProjectId: currentProject.id,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const data = JSON.parse(raw);

  projects = data.projects.map((p) => {
    const project = new Project(p.name);
    project.id = p.id;

    project.todos = p.todos.map((t) => {
      const todo = new Todo(t.title, t.description, t.dueDate, t.priority);

      todo.id = t.id;
      todo.completed = t.completed;
      todo.createdAt = t.createdAt;

      return todo;
    });

    return project;
  });

  currentProject =
    projects.find((p) => p.id === data.currentProjectId) || projects[0];
}
