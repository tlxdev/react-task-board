import { saveState, loadState } from '../utils/localstorage';

const arrayMove = require('array-move');

export const initialState = {
    columns: [],
    tasks: []
};

export const setTask = (tasksStore) => task => {
    // Find the tasks index in tasks array
    const forId = tasksStore.state.tasks.findIndex(taskIter => taskIter.id === task.id);


    // Replace the object located in that index with given param
    const tasksClone = [...tasksStore.state.tasks];
    tasksClone[forId] = task;

    tasksStore.setState({ ...tasksStore.state, tasks: tasksClone })

}

export const moveTaskBetweenColumns = (tasksStore) => (sourceColumnName, targetColumnName, sourceTaskIndex, targetTaskIndex) => {
    // Find the task id for for given column and index
    const targetTaskId = tasksStore.state.columns.find(columnIter => columnIter.name === sourceColumnName).tasks[sourceTaskIndex];

    // For each column
    const newArrayData = [...tasksStore.state.columns].map(column => {
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


    tasksStore.setState({ ...tasksStore.state, columns: newArrayData });

}

export const moveTaskInSameColumn = (tasksStore) => (columnName, sourceTaskIndex, targetTaskIndex) => {

    const columnsCopy = [...tasksStore.state.columns];

    // Find the column to perform move in
    let targetColumn = columnsCopy.find(columnIter => columnIter.name === columnName);

    // Move the task from that columns source location to target location
    targetColumn.tasks = arrayMove(targetColumn.tasks, sourceTaskIndex, targetTaskIndex);

    tasksStore.setState({ ...tasksStore.state, columns: columnsCopy })
}


export const addNewTask = (tasksStore) => (task) => {

    const columnsWithNewTask = [...tasksStore.state.columns];
    const tasksWithNewTask = [...tasksStore.state.tasks];

    // Create new task object, id made by auto incrementing
    const newTask = { id: tasksWithNewTask.length + 1, ...task };

    // Add it into the tasks array
    tasksWithNewTask.push(newTask);

    // Add the new task into the first column(hardcoded for now)
    columnsWithNewTask[0].tasks.push(newTask.id);

    tasksStore.setState({ ...tasksStore.state, columns: columnsWithNewTask, tasks: tasksWithNewTask })
}

export const loadTasksFromLocalStorage = (tasksStore) => () => {
    // Set state to data from localstorage
    tasksStore.setState({ ...loadState('state') });
}


export const saveTasksToLocalStorage = (tasksStore) => () => {
    // Save state to localstorage
    saveState(tasksStore.state, 'state');
}

export const importData = (tasksStore) => (data) => {
    tasksStore.setState({ ...data });
}