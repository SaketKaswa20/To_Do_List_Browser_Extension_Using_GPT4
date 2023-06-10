const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAll = document.getElementById('clearAll');

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = { text: taskText, checked: false };
    const listItem = createTaskItem(task);
    taskList.appendChild(listItem);
    taskInput.value = '';

    chrome.storage.sync.get(['tasks'], (result) => {
      const tasks = result.tasks || [];
      tasks.push(task);
      chrome.storage.sync.set({ tasks });
    });
  }
}

function createTaskItem(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('p-2', 'border', 'border-gray-600', 'rounded', 'bg-gray-700', 'text-gray-200');
  if (task.checked) {
    listItem.classList.add('strikethrough');
  }

  listItem.textContent = task.text;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.checked;
  checkbox.classList.add('mr-2');
  checkbox.addEventListener('change', () => {
    listItem.classList.toggle('strikethrough');
    task.checked = !task.checked;
    updateTaskInStorage(task);
  });

  listItem.prepend(checkbox);
  return listItem;
}

function updateTaskInStorage(updatedTask) {
  chrome.storage.sync.get(['tasks'], (result) => {
    const tasks = result.tasks || [];
    const taskIndex = tasks.findIndex(task => task.text === updatedTask.text);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      chrome.storage.sync.set({ tasks });
    }
  });
}

chrome.storage.sync.get(['tasks'], (result) => {
  const tasks = result.tasks || [];
  tasks.forEach((task) => {
    const listItem = createTaskItem(task);
    taskList.appendChild(listItem);
  });
});

clearAll.addEventListener('click', () => {
  chrome.storage.sync.set({ tasks: [] });
  taskList.innerHTML = '';
});

