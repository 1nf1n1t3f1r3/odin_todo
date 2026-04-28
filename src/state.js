//src/state.js

import Project from "./classes/project.js";

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
  return project;
}

export function deleteProject(projectId) {
  projects = projects.filter((p) => p.id !== projectId);
}

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
}

// Todos
export function toggleTodo(todoId) {
  const todo = currentProject.getTodo(todoId);
  if (todo) {
    todo.toggleComplete();
  }
}

export function addTodoToCurrentProject(todo) {
  currentProject.addTodo(todo);
}
