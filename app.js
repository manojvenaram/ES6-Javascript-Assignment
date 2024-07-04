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
