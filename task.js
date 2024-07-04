// task.js
export default class Task {
    constructor(title, description, dueDate, completed = false) {
      this.id = Date.now() + Math.random().toString(36).substring(2); // Generate unique ID
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = completed;
    }
  }