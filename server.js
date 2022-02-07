const fs = require("fs");

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(`Hello from Express!`);
});

//get all tasks
app.get('/getTasks', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHeader(200, {'Content-Type': 'text/html'});

    console.log("get tasks");

    let taskList = [];

    fs.readFile('tasks.json', (err,data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData.forEach(courseGroup => {
            courseGroup.tasks.sort((a, b) => b.date < a.date ? 1 : -1);
        });

        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });

        resData.forEach(res => {
            taskList.push(res);
        });

        res.write(JSON.stringify(taskList));
        res.send();
    });
});

//change course names
app.post('/updateCourseName/:newName/:courseGroupNum', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let newName = req.params.newName;
    let courseGroup = req.params.courseGroupNum;

    fs.readFile('tasks.json', (err, courseGroupData) => {
        if (err) throw err;

        let resData = JSON.parse(courseGroupData);

        resData[courseGroup].courseName = newName;

        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });
    });

    console.log(`Course name updated`);
    res.write(`Course name updated`);
    res.send();
});

//change task names
app.post('/updateTaskName/:newName/:courseGroupNum/:taskNum', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let newName = req.params.newName;
    let courseGroupNum = req.params.courseGroupNum;
    let taskNum = req.params.taskNum;

    fs.readFile('tasks.json', (err, courseGroupData) => {
        if (err) throw err;

        let resData = JSON.parse(courseGroupData);

        resData[courseGroupNum].tasks[taskNum].taskName = newName;

        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });
    });

    console.log(`Task name updated`);
    res.write(`Task name updated`);
    res.send();
});

//change task dates
app.post('/updateTaskDate/:newDate/:courseGroupNum/:taskNum', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let newDate = req.params.newDate;
    let courseGroupNum = req.params.courseGroupNum;
    let taskNum = req.params.taskNum;

    fs.readFile('tasks.json', (err, courseGroupData) => {
        if (err) throw err;

        let resData = JSON.parse(courseGroupData);

        resData[courseGroupNum].tasks[taskNum].date = newDate;

        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });
    });

    console.log(`Task date updated`);
    res.write(`Task date updated`);
    res.send();
});

app.post('/removeTask/:courseGroupIndex/:taskIndex', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let courseGroupIndex = req.params.courseGroupIndex;
    let taskIndex = req.params.taskIndex;

    fs.readFile('tasks.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData[courseGroupIndex].tasks.splice(taskIndex, 1);
        
        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });

        console.log(`Removed task`);
        res.write(`Removed task`);
        res.send();
    });
});

app.post('/addTask/:index', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let addIndex = req.params.index;

    let newTask = {taskName:"",date:""};

    fs.readFile('tasks.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData[addIndex].tasks.push(newTask);
        
        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });

        console.log(`Added task`);
        res.write(`Added task`);
        res.send();
    });
});

app.post('/addCourse', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let newCourse = {courseName:"",tasks:[{taskName:"",date:""}]};

    fs.readFile('tasks.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData.push(newCourse);

        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });

        console.log(`Added new course`);
        res.write(`Added new course`);
        res.send();
    });
});


app.post('/removeCourse/:index', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});

    let removeIndex = req.params.index;

    fs.readFile('tasks.json', (err, data) => {
        if (err) throw err;

        let resData = JSON.parse(data);

        resData.splice(removeIndex, 1);
        
        fs.writeFile('tasks.json', JSON.stringify(resData), err => {
            if (err) throw err;
        });

        console.log(`Removed course`);
        res.write(`Removed course`);
        res.send();
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));