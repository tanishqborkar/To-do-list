const add_task = document.getElementById("add_task_but");
const question_menu = document.querySelector(".question_menu");
const yes_but = document.getElementById("yes_but");
const no_but = document.getElementById("no_but");
const question = document.getElementById("qtext");
const taskList = document.getElementsByClassName("taskList");

let question_list = ["Is this task Urgent?", "Is this task Important?"];
let responseList = [-1, -1];
let qindex = 0;
let currentTask = '';

question.textContent = question_list[qindex];

add_task.addEventListener('click', function() {
    const input = document.querySelector('#task_info');
    currentTask = input.value;

    if (currentTask.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    question_menu.style.display = 'flex';
    question.textContent = question_list[qindex];
    input.value = '';
});

yes_but.addEventListener('click', function() {
    if (qindex == 0) {
        responseList[0] = 1;
    } else {
        responseList[1] = 1;
    }
    qindex += 1;
    processResponse();
});

no_but.addEventListener('click', function() {
    if (qindex == 0) {
        responseList[0] = 2;
    } else {
        responseList[1] = 2;
    }
    qindex += 1;
    processResponse();
});

function processResponse() {
    if (qindex <= 1) {
        question.textContent = question_list[qindex];
    } else {
        question_menu.style.display = 'none';
        qindex = 0;
        columnAllot(responseList, currentTask);
        responseList = [-1, -1]; 
    }
}

function addTask(task, columnNum) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<input type="checkbox" class="task_check" /> <span class="task_d">${task}</span> <button>Delete</button>`;
    taskList[columnNum].appendChild(taskItem);

    taskItem.querySelector('button').addEventListener('click', function() {
        taskItem.remove();
    });

    const checkbox = taskItem.querySelector('.task_check');
    const taskDesc = taskItem.querySelector('.task_d');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskDesc.style.textDecoration = 'line-through';
        } else {
            taskDesc.style.textDecoration = 'none';
        }
    });
}


function columnAllot(response, task) {
    if (response[0] === 1 && response[1] === 1) {
        addTask(task, 0);
    } else if (response[0] === 2 && response[1] === 1) {
        addTask(task, 1);
    } else if (response[0] === 1 && response[1] === 2) {
        addTask(task, 2);
    } else if (response[0] === 2 && response[1] === 2) {
        addTask(task, 3);
    }
}