const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
};

const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(taskItem => {
        return {
            text: taskItem.textContent,
            complete: taskItem.classList.contains('complete')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToList = (task) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    if (task.complete) {
        taskItem.classList.add('complete');
    }

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('complete');
        saveTasks();
    });

    taskList.appendChild(taskItem);
};

const addTask = () => {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText !== '') {
        addTaskToList({ text: newTaskText, complete: false });
        newTaskInput.value = '';
        saveTasks();
    }
};

addTaskButton.addEventListener('click', addTask);

loadTasks();
