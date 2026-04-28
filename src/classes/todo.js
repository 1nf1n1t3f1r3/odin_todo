// src/todo.js
export default class Todo {
  constructor(title, description, dueDate, priority, options = {}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    this.completed = false;
    this.createdAt = new Date();

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
