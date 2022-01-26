## Simple To-Do List
The application gives the ability to add/remove task groups, add/remove tasks to each group, add a group header and add a task name and date for each task.

Personal Comments/Thoughts:
Currently, I'd like to make the tasks draggable? but thinking, in the future, when make the tasks sort by date, might not need that customization.

Looks like garbage.

Future additions:
- Convert date field to correct date format to add ability of date sorting and upcoming date styles (ex. tasks within a week of current date are yellow, within a few days are red)
- Use date field to create a "Today's Tasks" area, pulling all tasks from any group that are due today
- Make groups editiable for positioning to move a group above or below another (drag or arrow buttons)
- Prettify styles

### Quickstart
To get started:
```
npm install
```

To run:
```
cd [folder path]
node server.js
```
Open index.html in browser
- Keep cmd with running server open for data to save to tasks.json