function getTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  // If tasks are null or undefined, return an empty array
  if (!Array.isArray(tasks)) {
    tasks = [];
  }
  return tasks;
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  let tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
            <span style='text-decoration:${
              task.completed ? 'line-through' : 'none'
            }'>${task.title}</span>
             <div>
             <button onclick='editTask(${task.id})'>edit</button>
             <button onclick='deleteTask(${task.id})'>delete</button>
              <button style='cursor:${
                task.completed ? 'not-allowed' : 'pointer'
              }' onclick='toggleCompletion(${task.id})' >Completed</button>
             </div>
              
        `;
    taskList.appendChild(li);
  });
}
function disableButton() {
  const button = document.getElementById('myButton');
  button.disabled = true; // Disable the button after click
}
function addTask() {
  let tasks = getTasksFromLocalStorage();
  const taskInput = document.getElementById('taskInput');
  const taskTitle = taskInput.value.trim();
  if (taskTitle === '') {
    alert('Are you kidding me ? kindly add a task before you can proceed');
    return;
  }

  tasks.push({
    id: Date.now(),
    title: taskTitle,
    completed: false,
  });
  taskInput.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(id) {
  let tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const newTitle = window.prompt('Edit task title:', task.title);
    if (newTitle !== null && newTitle.trim() !== '') {
      task.title = newTitle.trim();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks(); // Re-render tasks
    }
  }
}

function deleteTask(id) {
  let tasks = getTasksFromLocalStorage();
  const confirmDelete = confirm('Are you sure about this action ?');
  if (confirmDelete) {
    tasks = tasks.filter((task) => task.id !== id);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

function toggleCompletion(taskId) {
  let tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
  }
}

window.onload = renderTasks();
