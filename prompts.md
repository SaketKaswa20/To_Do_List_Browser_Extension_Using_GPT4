Prompt 1: Write code to create a To-DO List Extension. It should take input from user. If the task gets completes the user will click the checkbox and the text should be given a strikethrough. Design it using Tailwind CSS and give it dark mode. Provide all the code and also tell me that how can i integrate that extension in my chrome browser

Output:
To create a To-Do List extension, you'll need to create a few files: `manifest.json`, `index.html`, `styles.css`, and `script.js`. I'll provide the code for each file, and then I'll explain how to integrate the extension into your Chrome browser.

1. Create a `manifest.json` file:

```json
{
  "manifest_version": 2,
  "name": "To-Do List Extension",
  "version": "1.0",
  "description": "A simple To-Do List extension with dark mode.",
  "browser_action": {
    "default_popup": "index.html",
    "default_icon": {
      "48": "icon.png"
    }
  },
  "permissions": ["storage"],
  "icons": {
    "48": "icon.png"
  },
  "content_security_policy": "script-src 'self' 'unsafe-inline'; object-src 'self'"
}
```

2. Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <title>To-Do List Extension</title>
</head>
<body class="bg-gray-100 dark:bg-gray-800">
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">To-Do List</h1>
    <div class="mb-4">
      <input id="taskInput" type="text" class="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="Enter a task...">
    </div>
    <ul id="taskList" class="list-none space-y-2"></ul>
    <button id="toggleDarkMode" class="bg-blue-500 text-white px-4 py-2 rounded">Toggle Dark Mode</button>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

3. Create a `styles.css` file:

```css
.strikethrough {
  text-decoration: line-through;
}
```

4. Create a `script.js` file:

```javascript
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const toggleDarkMode = document.getElementById('toggleDarkMode');

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const listItem = document.createElement('li');
    listItem.classList.add('p-2', 'border', 'border-gray-300', 'rounded', 'bg-white', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-gray-200');
    listItem.textContent = taskText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('mr-2');
    checkbox.addEventListener('change', () => {
      listItem.classList.toggle('strikethrough');
    });

    listItem.prepend(checkbox);
    taskList.appendChild(listItem);
    taskInput.value = '';
  }
}

toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
```

5. Create a 48x48 icon for your extension and save it as `icon.png` in the same folder as the other files.

Now, to integrate the extension into your Chrome browser:

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click the "Load unpacked" button and select the folder containing your extension files (`manifest.json`, `index.html`, `styles.css`, `script.js`, and `icon.png`).
4. The extension should now appear in your list of extensions, and you can access it by clicking the extension icon in the top right corner of your browser.

That's it! You now have a To-Do List extension with dark mode using Tailwind CSS.

Prompt 2: The extension is not remembering the task. It deletes all the task if we close the extension. make it to remember task. remove the toggle dark mode button and give the extension Only Dark mode. Also make the Dialog box bigger it is too small.

Output:
To make the extension remember tasks, you can use the `chrome.storage` API to store and retrieve tasks. I've updated the `script.js` file to include this functionality. Additionally, I've removed the dark mode toggle button and set the extension to dark mode only. I've also increased the size of the popup by modifying the `index.html` file.

1. Update the `manifest.json` file to include the "storage" permission:

```json
{
  "manifest_version": 2,
  "name": "To-Do List Extension",
  "version": "1.0",
  "description": "A simple To-Do List extension with dark mode.",
  "browser_action": {
    "default_popup": "index.html",
    "default_icon": {
      "48": "icon.png"
    }
  },
  "permissions": ["storage"],
  "icons": {
    "48": "icon.png"
  },
  "content_security_policy": "script-src 'self' 'unsafe-inline'; object-src 'self'"
}
```

2. Update the `index.html` file to set the dark mode and increase the size of the popup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <title>To-Do List Extension</title>
  <style>
    html, body {
      min-width: 350px;
      min-height: 400px;
    }
  </style>
</head>
<body class="bg-gray-800">
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-gray-100">To-Do List</h1>
    <div class="mb-4">
      <input id="taskInput" type="text" class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200" placeholder="Enter a task...">
    </div>
    <ul id="taskList" class="list-none space-y-2"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

3. Update the `script.js` file to store and retrieve tasks using `chrome.storage`:

```javascript
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const listItem = createTaskItem(taskText);
    taskList.appendChild(listItem);
    taskInput.value = '';

    chrome.storage.sync.get(['tasks'], (result) => {
      const tasks = result.tasks || [];
      tasks.push(taskText);
      chrome.storage.sync.set({ tasks });
    });
  }
}

function createTaskItem(taskText) {
  const listItem = document.createElement('li');
  listItem.classList.add('p-2', 'border', 'border-gray-600', 'rounded', 'bg-gray-700', 'text-gray-200');

  listItem.textContent = taskText;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('mr-2');
  checkbox.addEventListener('change', () => {
    listItem.classList.toggle('strikethrough');
  });

  listItem.prepend(checkbox);
  return listItem;
}

chrome.storage.sync.get(['tasks'], (result) => {
  const tasks = result.tasks || [];
  tasks.forEach((taskText) => {
    const listItem = createTaskItem(taskText);
    taskList.appendChild(listItem);
  });
});
```

Now, the extension will remember tasks even if you close it. The popup size has been increased, and the extension is set to dark mode only.

Prompt 3: The extension is working better than last time but the task which we have checked and are strikethrough gets back to normal if we close the extension and again open it. So improve the code such that the task should remain checked even if we close the extension and add a button to clear all the tasks and if a person clicks clear all button delete that specific data

Output: 
To make the extension remember the checked state of tasks, you can store an object for each task containing the task text and its checked state. I've updated the `script.js` file to include this functionality. I've also added a "Clear All" button to delete all tasks.

1. Update the `index.html` file to add the "Clear All" button:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <title>To-Do List Extension</title>
  <style>
    html, body {
      min-width: 350px;
      min-height: 400px;
    }
  </style>
</head>
<body class="bg-gray-800">
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-gray-100">To-Do List</h1>
    <div class="mb-4">
      <input id="taskInput" type="text" class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200" placeholder="Enter a task...">
    </div>
    <ul id="taskList" class="list-none space-y-2"></ul>
    <button id="clearAll" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Clear All</button>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

2. Update the `script.js` file to store the checked state of tasks and handle the "Clear All" button:

```javascript
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
```

Now, the extension will remember the checked state of tasks even if you close it. The "Clear All" button will delete all tasks when clicked.
