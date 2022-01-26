window.onload = getTasks();

const taskArea = document.querySelector('.taskArea');

//when called will repaint page to match json file
function getTasks() {
    console.log("get tasks ran");

    let url = 'http://127.0.0.1:3000/getTasks';

    const request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function() {
        taskArea.innerHTML = '';

        let resp = JSON.parse(this.response);

        if (request.status == 200){
            resp.forEach((object, index) => {
                taskArea.innerHTML += `<div class="courseGroup" id="group${index + 1}"></div>`;

                let courseGroupArea = document.querySelector(`#group${index + 1}`);

                courseGroupArea.innerHTML += `<input type="text" placeholder="Title" value="${object.courseName}" class="courseHeader" onchange="updateCourseName(this.value, ${index})"></input>`;

                courseGroupArea.innerHTML += `<div class="taskGroup" id="tasks${index + 1}"></div>`;

                let taskGroupArea = document.querySelector(`#tasks${index + 1}`);

                object.tasks.forEach((task, taskIndex) => {
                    let singleTaskArea = document.createElement("div");
                    singleTaskArea.setAttribute("class", "singleTask");                    

                    singleTaskArea.innerHTML += `<input type="checkbox" class="checkbox">`;
                    singleTaskArea.innerHTML += `<input type="text" placeholder="Task" value="${task.taskName}" class="taskName" onchange="updateTaskName(this.value, ${index}, ${taskIndex})"></input>`;
                    singleTaskArea.innerHTML += `<input type="text" placeholder="Date" value="${task.date}" class="taskDate" onchange="updateTaskDate(this.value, ${index}, ${taskIndex})"></input>`;
                    singleTaskArea.innerHTML += `<button class="removeTaskBtn" onclick="removeTask(${index}, ${taskIndex})">X</button>`;

                    taskGroupArea.appendChild(singleTaskArea);
                });

                let courseButtons = document.createElement("div");
                courseButtons.setAttribute("class", "courseButtons");

                courseButtons.innerHTML += `<button onclick="addTask(${index})">Add Task</button>`;

                courseButtons.innerHTML += `<button onclick="removeCourse(${index})">Remove Course</button>`;

                courseGroupArea.appendChild(courseButtons);
            });
        }
    }
    request.send();
}

function updateCourseName(newName, courseGroupNum) {

    let url = `http://127.0.0.1:3000/updateCourseName/${newName}/${courseGroupNum}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);
    };

    request.send();
}

function updateTaskName(newName, courseGroupNum, taskNum) {
    let url = `http://127.0.0.1:3000/updateTaskName/${newName}/${courseGroupNum}/${taskNum}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);
    };

    request.send();
}

function updateTaskDate(newDate, courseGroupNum, taskNum) {
    let url = `http://127.0.0.1:3000/updateTaskDate/${newDate}/${courseGroupNum}/${taskNum}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);
    };

    request.send();
}

function removeTask(courseGroupIndex, taskIndex) {
    let url = `http://127.0.0.1:3000/removeTask/${courseGroupIndex}/${taskIndex}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);

        getTasks();
    };

    request.send();
}

function addTask(index) {
    console.log("add task ran");

    let url = `http://127.0.0.1:3000/addTask/${index}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);

        getTasks();
    };

    request.send();
}

function addCourse() {
    console.log("add course ran");

    let url = 'http://127.0.0.1:3000/addCourse';

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);

        getTasks();
    };

    request.send();
}

function removeCourse(index) {
    console.log("remove course ran");

    let url = `http://127.0.0.1:3000/removeCourse/${index}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        console.log(this.response);

        getTasks();
    };

    request.send();
}