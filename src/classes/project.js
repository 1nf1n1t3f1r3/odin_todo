// src/project.js
export default class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
    this.createdAt = new Date();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  toggleTodo(todoId) {
    this.getTodo(todoId)?.toggleComplete();
  }
}
