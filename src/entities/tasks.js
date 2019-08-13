import { saveState, loadState } from '../utils/localstorage';

const arrayMove = require('array-move');

export const initialState = {
    columns: [],
    tasks: []
};

export const setTask = (counter) => task => {
    // Find the tasks index intasks array
    const forId = counter.state.tasks.findIndex(taskIter => taskIter.id === task.id);


    // Replace the object located in that index with given param
    const tasksClone = [...counter.state.tasks];
    tasksClone[forId] = task;

    counter.setState({ ...counter.state, tasks: tasksClone })

}

export const moveTaskBetweenColumns = (counter) => (sourceColumnName, targetColumnName, sourceTaskIndex, targetTaskIndex) => {
    // Find the task id for for given column and index
    const targetTaskId = counter.state.columns.find(columnIter => columnIter.name === sourceColumnName).tasks[sourceTaskIndex];

    // For each column
    const newArrayData = [...counter.state.columns].map(column => {
        // Remove the task from old column
        if (column.name === sourceColumnName) {
            column.tasks = column.tasks.filter(task => task !== targetTaskId);
        }
        // Insert it into new column
        if (column.name === targetColumnName) {
            column.tasks.splice(targetTaskIndex, 0, targetTaskId);
        }


        return column;
    })


    counter.setState({ ...counter.state, columns: newArrayData });

}

export const moveTaskInSameColumn = (counter) => (columnName, sourceTaskIndex, targetTaskIndex) => {

    const columnsCopy = [...counter.state.columns];

    // Find the column to perform move in
    let targetColumn = columnsCopy.find(columnIter => columnIter.name === columnName);

    // Move the task from that columns source location to target location
    targetColumn.tasks = arrayMove(targetColumn.tasks, sourceTaskIndex, targetTaskIndex);

    counter.setState({ ...counter.state, columns: columnsCopy })
}


export const addNewTask = (counter) => (task) => {

    const columnsWithNewTask = [...counter.state.columns];
    const tasksWithNewTask = [...counter.state.tasks];

    // Create new task object, id made by auto incrementing
    const newTask = { id: tasksWithNewTask.length + 1, ...task };

    // Add it into the tasks array
    tasksWithNewTask.push(newTask);

    // Add the new task into the first column(hardcoded for now)
    columnsWithNewTask[0].tasks.push(newTask.id);

    counter.setState({ ...counter.state, columns: columnsWithNewTask, tasks: tasksWithNewTask })
}

export const loadTasks = (counter) => () => {
    // Set state to data from localstorage
    counter.setState({ ...loadState() });
}


export const saveTasks = (counter) => () => {
    // Save state to localstorage
    saveState(counter.state);
}

export const importData = (counter) => (data) => {
    counter.setState({ ...data });
}