import Project from "./classes/project.js";

const defaultProject = new Project("Default");

let projects = [defaultProject];
let currentProject = defaultProject;

export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
}

// state.js
export function toggleTodo(todoId) {
  const todo = currentProject.getTodo(todoId);
  if (todo) {
    todo.toggleComplete();
  }
}
