// src/index.js
import "./styles.css";

class Project {
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
}

class Todo {
  constructor(title, description, dueDate, priority, options = {}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    this.completed = false;
    this.createdAt = new Date();

    // optional stuff
    this.notes = options.notes || "";
    this.checklist = options.checklist || [];
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  update(fields) {
    Object.assign(this, fields);
  }
}
