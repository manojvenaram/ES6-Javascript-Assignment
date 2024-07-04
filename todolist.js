// todolist.js
import Task from './task.js';

export default class ToDoList {
  constructor() {
    this.tasks = this.loadTasks() || [];
  }

  addTask(title, description, dueDate) {
    const newTask = new Task(title, description, dueDate);
    this.tasks.push(newTask);
    this.saveTasks();
  }

  editTask(id, updatedTask) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      this.saveTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  filterTasks(status) {
    switch (status) {
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      case 'incomplete':
        return this.tasks.filter((task) => !task.completed);
      default:
        return this.tasks;
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : null;
  }
}