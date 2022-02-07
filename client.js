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

                    let taskNameInput = `<input type="text" placeholder="Task" value="${task.taskName}" class="taskName" onchange="updateTaskName(this.value, ${index}, ${taskIndex})"></input>`;
                    let dateInput = `<input type="datetime-local" value="${task.date}" class="taskDate" id="dateInput${index}${taskIndex}" min="2022-01-01" max="2050-01-01" onchange="updateTaskDate(this.value, ${index}, ${taskIndex})"></input>`;

                    singleTaskArea.innerHTML += `<input type="checkbox" class="checkbox">`;
                    singleTaskArea.innerHTML += taskNameInput;
                    singleTaskArea.innerHTML += dateInput;
                    singleTaskArea.innerHTML += `<button class="removeTaskBtn" onclick="removeTask(${index}, ${taskIndex})">X</button>`;

                    taskGroupArea.appendChild(singleTaskArea);

                    let domDateInput = document.querySelector(`#dateInput${index}${taskIndex}`);
                    //changes date color if within a week of now
                    if (urgencyCheck(domDateInput.value) === true) {
                        domDateInput.style.color = 'red';
                    }                    
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
    console.log(newDate);

    let url = `http://127.0.0.1:3000/updateTaskDate/${newDate}/${courseGroupNum}/${taskNum}`;

    const request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.onload = function() {
        getTasks();
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

function urgencyCheck(dateValue) {
    let dateToday = new Date();
    dateToday = dateToday.toString();

    let dateTodayConverted = "";

    //year
    let todayYear = dateToday.substring(11, 15);

    //month
    let todayMonth = dateToday.substring(4, 7);

    let months = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    };

    let convertedMonth = months[todayMonth];

    //day
    let todayDay = dateToday.substring(8, 10);

    //hour
    let todayHour = dateToday.substring(16, 18);

    //minute
    let todayMinute = dateToday.substring(19, 21);

    dateTodayConverted = `${todayYear}-${convertedMonth}-${todayDay}T${todayHour}:${todayMinute}`;

    let yearOK = false;
    let monthOK = false;
    let dayOK = false;

    let dateValueMonth = dateValue.substring(5, 7);
    let dateTodayConvertedMonth = dateTodayConverted.substring(5, 7);

    let dateValueYear = dateValue.substring(0, 4);
    let todayDateYear = dateTodayConverted.substring(0, 4);

    let dateValueDay = dateValue.substring(8, 10);
    let dateTodayConvertedDay = dateTodayConverted.substring(8, 10);

    if (dateValueYear === todayDateYear) {
        yearOK = true;

        //checks when both months are under 10
        if (dateValueMonth < 10 && dateTodayConvertedMonth < 10) {
            if (dateValueMonth === dateTodayConvertedMonth) {
                monthOK = true;
                if (checkDaysSameMonth(dateValueDay, dateTodayConvertedDay) === true) {
                    dayOK = true;
                }
            }else if (dateValueMonth === ('0' + (Number(dateTodayConvertedMonth) + 1).toString())) {
                monthOK = true;
                if (checkDaysMonthAfter(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonth) === true) {
                    dayOK = true;
                }
            }else {
                monthOK = false;
            }
        }
        //checks when both months are 10 or above
        //check functions might be the same as above?
        else if (dateValueMonth >= 10 && dateTodayConvertedMonth >= 10) {
            if (dateValueMonth === dateTodayConvertedMonth) {
                monthOK = true;
                if (checkDaysSameMonth(dateValueDay, dateTodayConvertedDay) === true) {
                    dayOK = true;
                }
            }else if (dateValueMonth === (Number(dateTodayConvertedMonth) + 1).toString()) {
                monthOK = true;
                if (checkDaysMonthAfter(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonth) === true) {
                    dayOK = true;
                }
            }else {
                monthOK = false;
            }
        }
        //special case
        else if (Number(dateValueMonth) === 10 && Number(dateTodayConvertedMonth) === 9) {
            monthOK = true;
            if (checkDaysMonthAfterSpecial2(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonth) === true) {
                dayOK = true;
            }
        }
        //catch all for months
        else{
            monthOK = false;
        }
    }
    //checks for spanning over years
    else if (Number(dateValueYear) === Number(todayDateYear) + 1) {
        if (Number(dateValueMonth) === 1 && Number(dateTodayConvertedMonth) === 12) {
            yearOK = true;
            monthOK = true;
            if (checkDaysMonthAfterAcrossYear(dateValueDay, dateTodayConvertedDay, todayMonth) === true) {
                dayOK = true;
            }
        }
    }
    //catch all for years
    else{
        yearOK = false;
    }

    return dayOK;
}

//used to check for dates within 7 days of current date when are same month
function checkDaysSameMonth(valueDay, todayDay) {
    let vDay = Number(valueDay);
    let tDay = Number(todayDay);
    let withinAWeek = false;

    if (vDay >= tDay) {
        if (vDay - tDay < 8) {
            withinAWeek = true;
        }
    }
    return withinAWeek;
}

let monthDaysAmount = {
    Jan: '31',
    Feb: '28',
    Mar: '31',
    Apr: '30',
    May: '31',
    Jun: '30',
    Jul: '31',
    Aug: '31',
    Sep: '30',
    Oct: '31',
    Nov: '30',
    Dec: '31'
}

function checkDaysMonthAfter(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonthName) {
    let tYear = Number(todayDateYear);
    let tDay = Number(dateTodayConvertedDay);
    let vDay = Number(dateValueDay);
    let tMonthName = todayMonthName;
    //let tMonthName = 'Nov';

    let daysInMonths = monthDaysAmount;

    let daysInMonthsKeys = Object.keys(daysInMonths);

    let withinAWeek = false;

    if (tYear%4 === 0) {
        daysInMonths.Feb = '29';
    }else{
        daysInMonths.Feb = '28';
    }    

    for (let i = 0; i < 12; i++) {
        if (daysInMonthsKeys[i] === tMonthName) {
            //adds the amount of days from previous month for later subraction
            let daysToBeAdded = daysInMonths[tMonthName]; 

            vDay += Number(daysToBeAdded);
        }
    }

    if (vDay - tDay < 8) {
        withinAWeek = true;
    }

    return withinAWeek;
}

//might not need since will always be before current date/time
function checkDaysMonthBefore(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonthName) {
    let tYear = Number(todayDateYear);
    let tDay = Number(dateTodayConvertedDay);
    let vDay = Number(dateValueDay);
    let tMonthName = todayMonthName;
    //let tMonthName = 'Jul';

    let daysInMonths = monthDaysAmount;

    let daysInMonthsKeys = Object.keys(daysInMonths);

    let withinAWeek = false;

    if (tYear%4 === 0) {
        daysInMonths.Feb = '29';
    }else{
        daysInMonths.Feb = '28';
    }    

    for (let i = 0; i < 12; i++) {
        if (daysInMonthsKeys[i] === tMonthName) {
            //adds the amount of days from previous month for later subraction
            let daysToBeAdded = daysInMonths[tMonthName];

            tDay += Number(daysToBeAdded);
        }
    }

    if (tDay - vDay < 8) {
        withinAWeek = true;
    }

    return withinAWeek;
}

function checkDaysMonthAfterSpecial2(todayDateYear, dateValueDay, dateTodayConvertedDay, todayMonthName) {
    let tYear = Number(todayDateYear);
    let tDay = Number(dateTodayConvertedDay);
    let vDay = Number(dateValueDay);
    let tMonthName = todayMonthName;
    //let tMonthName = 'Sep';

    let daysInMonths = monthDaysAmount;

    let daysInMonthsKeys = Object.keys(daysInMonths);

    let withinAWeek = false;

    if (tYear%4 === 0) {
        daysInMonths.Feb = '29';
    }else{
        daysInMonths.Feb = '28';
    }    

    for (let i = 0; i < 12; i++) {
        if (daysInMonthsKeys[i] === tMonthName) {
            //adds the amount of days from previous month for later subraction
            let daysToBeAdded = daysInMonths[tMonthName];

            vDay += Number(daysToBeAdded);
        }
    }

    if (vDay - tDay < 8) {
        withinAWeek = true;
    }

    return withinAWeek;
}

function checkDaysMonthAfterAcrossYear(dateValueDay, dateTodayConvertedDay, todayMonthName) {
    let tMonthName = todayMonthName;
    //let tMonthName = 'Dec';
    let tDay = Number(dateTodayConvertedDay);
    let vDay = Number(dateValueDay);

    let daysInMonths = monthDaysAmount;

    let daysInMonthsKeys = Object.keys(daysInMonths);

    let withinAWeek = false;

    for (let i = 0; i < 12; i++) {
        if (daysInMonthsKeys[i] === tMonthName) {
            //adds the amount of days from previous month for later subraction
            let daysToBeAdded = daysInMonths[tMonthName];

            vDay += Number(daysToBeAdded);
        }
    }

    if (vDay - tDay < 8) {
        withinAWeek = true;
    }

    return withinAWeek;
}