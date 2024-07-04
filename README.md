# ES6-Javascript-Assignment
**1.  HTML Structure (index.html)**

   *   **Basic Elements:** The HTML sets up the structure of our to-do list. We have:
        *   A title ("Work To-Dos")
        *   A form (`<form id="newTaskForm">`) to add new tasks.
            *   Input fields for task title, description, and due date.
            *   A button to submit the new task.
        *   A dropdown (`<select id="filterSelect">`) for filtering tasks (all, completed, incomplete).
        *   An empty list (`<ul id="taskList">`) where tasks will be displayed.
   *   **JavaScript Import:** The `<script>` tag imports the `app.js` file, which contains all the JavaScript logic for our to-do list.

**2.  JavaScript Logic (app.js)**

   *   **Imports:** We start by importing the `ToDoList` class from `todolist.js`.
   *   **Create ToDoList Instance:**  We create a new `ToDoList` object named `todoList`.
   *   **DOM Elements:** We get references to the HTML elements we'll be interacting with:
        *   `taskList`: The unordered list where tasks will be displayed.
        *   `newTaskForm`: The form for adding new tasks.
        *   `filterSelect`: The dropdown for filtering tasks.
   *   **renderTasks Function:**
        *   **Clears List:**  `taskList.innerHTML = '';` empties the list before displaying new tasks.
        *   **Filters Tasks:**  `todoList.filterTasks(filterSelect.value)` gets the tasks based on the selected filter (all, completed, incomplete).
        *   **Creates List Items:** It loops through the filtered tasks and creates list items (`<li>`) for each task.
            *   It sets the content of the list item to include:
                *   Task title (using `<h3>`).
                *   Task description (using `<p>`).
                *   Due date (using `<span>`).
                *   A checkbox to mark the task as complete.
                *   Edit and Delete buttons.
        *   **Adds List Items:** It appends the created list items to the `taskList` element.
   *   **attachTaskItemListeners Function:**
        *   **Gets List Items:**  It finds all the list items (`<li>`) in the `taskList`.
        *   **Attaches Listeners:** It attaches event listeners to each list item:
            *   **Checkbox:** When a checkbox is toggled, it calls `todoList.toggleTaskCompletion` to update the task's completion status and then re-renders the tasks.
            *   **Edit Button:**  (Not implemented yet)  Will be used to handle editing tasks.
            *   **Delete Button:**  When a delete button is clicked, it calls `todoList.deleteTask` to remove the task and then re-renders the tasks.
   *   **Event Listeners:**
        *   **Add Task Form:** When the form is submitted, it prevents the default form submission, gets the task details from the form input fields, adds the task using `todoList.addTask`, re-renders the tasks, and resets the form.
        *   **Filter Selection:** When the filter dropdown is changed, it re-renders the tasks.
   *   **Initial Rendering:**  `renderTasks()` is called to initially display the tasks from local storage.

**3.  Task Class (task.js)**

   *   **Constructor:** The `Task` class represents a single task. It has properties:
        *   `id`: A unique identifier for each task (generated using Date.now() and a random string).
        *   `title`: The title of the task.
        *   `description`:  The description of the task.
        *   `dueDate`: The due date of the task.
        *   `completed`: A boolean indicating if the task is completed (default is false).

**4.  ToDoList Class (todolist.js)**

   *   **Constructor:** The `ToDoList` class manages a list of tasks.
        *   `this.tasks`: An array to hold the task objects.
        *   **Load from Local Storage:** The constructor attempts to load tasks from `localStorage` (if any tasks were previously saved).
   *   **addTask:**  This method adds a new task to the `tasks` array, saves the updated list to `localStorage`, and calls `renderTasks` to update the UI.
   *   **editTask:**  This method allows you to update an existing task.
   *   **deleteTask:**  This method removes a task from the `tasks` array, saves the updated list to `localStorage`, and re-renders the tasks.
   *   **toggleTaskCompletion:**  This method toggles the `completed` status of a task, saves the changes to `localStorage`, and re-renders the tasks.
   *   **filterTasks:**  This method filters the tasks based on the selected filter (all, completed, incomplete).
   *   **saveTasks:**  This method saves the current list of tasks to `localStorage`.
   *   **loadTasks:**  This method loads tasks from `localStorage` if they exist.


### index.html
```
<!DOCTYPE html>
<html>
<head>
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Work To-Dos</h1>

  <form id="newTaskForm">
    <input type="text" id="taskTitle" placeholder="Task Title" required>
    <textarea id="taskDescription" placeholder="Description"></textarea>
    <input type="date" id="taskDueDate">
    <button type="submit">Add Task</button>
  </form>

  <select id="filterSelect">
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="incomplete">Incomplete</option>
  </select>

  <ul id="taskList">
    </ul>

  <script type="module" src="app.js"></script>
</body>
</html>
```
### App.js
```
import ToDoList from './todolist.js';

const todoList = new ToDoList();

// DOM elements
const taskList = document.getElementById('taskList');
const newTaskForm = document.getElementById('newTaskForm');
const filterSelect = document.getElementById('filterSelect');

// Render tasks in the UI
function renderTasks() {
  taskList.innerHTML = ''; // Clear previous tasks

  const filteredTasks = todoList.filterTasks(filterSelect.value);

  filteredTasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <span>Due: ${task.dueDate}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-task-id="${task.id}">
      <button data-edit-id="${task.id}">Edit</button>
      <button data-delete-id="${task.id}">Delete</button>
    `;

    taskList.appendChild(taskItem);
  });

  // Attach event listeners to task items
  attachTaskItemListeners();
}

// Attach event listeners to task list items
function attachTaskItemListeners() {
  const taskItems = taskList.querySelectorAll('li');

  taskItems.forEach((taskItem) => {
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const editButton = taskItem.querySelector('button[data-edit-id]');
    const deleteButton = taskItem.querySelector('button[data-delete-id]');

    checkbox.addEventListener('change', (event) => {
      const taskId = event.target.dataset.taskId;
      todoList.toggleTaskCompletion(taskId);
      renderTasks(); // Re-render after toggling
    });

    editButton.addEventListener('click', (event) => {
      const taskId = event.target.dataset.editId;
      // Implement task editing logic here
    });

    deleteButton.addEventListener('click', (event) => {
      const taskId = event.target.dataset.deleteId;
      todoList.deleteTask(taskId);
      renderTasks(); // Re-render after deleting
    });
  });
}

// Event listener for adding new task
newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const dueDate = document.getElementById('taskDueDate').value;

  todoList.addTask(title, description, dueDate);
  renderTasks();
  newTaskForm.reset();
});

// Event listener for filter selection
filterSelect.addEventListener('change', renderTasks);

// Initial rendering of tasks
renderTasks();
```
### task.js
```
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
```
### todolist.js
```
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
```
### Output:
![image](https://github.com/manojvenaram/ES6-Javascript-Assignment/assets/94165064/5eb07bff-f1ec-4579-82ea-350d0fa6b43b)
![Screenshot (23)](https://github.com/manojvenaram/ES6-Javascript-Assignment/assets/94165064/b222e031-7578-432c-9661-266c93e5f290)
