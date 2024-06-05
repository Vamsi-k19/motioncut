document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Handle task actions (edit, delete, toggle completion)
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const taskItem = e.target.parentElement;
            if (e.target.classList.contains('delete')) {
                taskItem.remove();
            } else if (e.target.classList.contains('edit')) {
                const newText = prompt('Edit task', taskItem.firstChild.textContent);
                if (newText !== null) {
                    taskItem.firstChild.textContent = newText;
                }
            }
            saveTasks();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTasks();
        }
    });

    // Add task to the list
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text);
            const li = taskList.lastChild;
            if (task.completed) {
                li.classList.add('completed');
            }
        });
    }
});
