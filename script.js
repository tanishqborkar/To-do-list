const add_task = document.getElementById("add_task_but");
        const question_menu = document.querySelector(".question_menu");
        const yes_but = document.getElementById("yes_but");
        const no_but = document.getElementById("no_but");
        const question = document.getElementById("qtext");
        const taskList = document.getElementsByClassName("taskList");

        let question_list = ["Is this task Urgent?", "Is this task Important?"];
        let responseList = [-1, -1];
        let qindex = 0;
        let currentTask = ''; // Store the current task being processed

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
                responseList = [-1, -1]; // Reset response list
            }
        }

        function addTask(task, columnNum) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `<input type="checkbox" /> <span>${task}</span> <button>Delete</button>`;
            taskList[columnNum].appendChild(taskItem);

            // Add event listener to delete button
            taskItem.querySelector('button').addEventListener('click', function() {
                taskItem.remove();
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