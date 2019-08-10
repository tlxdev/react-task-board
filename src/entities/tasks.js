import { saveState, loadState } from '../utils/localstorage';

const arrayMove = require('array-move');

export const initialState = {
    columns: [],
    tasks: []
};

export const setTask = (counter) => task => {
    const forId = counter.state.tasks.findIndex(taskIter => taskIter.id === task.id);

    const tasksClone = [...counter.state.tasks];
    tasksClone[forId] = task;


    counter.setState({ ...counter.state, tasks: tasksClone })

}

export const moveTaskBetweenColumns = (counter) => (sourceColumnName, targetColumnName, sourceTaskIndex, targetTaskIndex) => {
    const targetTaskId = counter.state.columns.find(columnIter => columnIter.name === sourceColumnName).tasks[sourceTaskIndex];

    const newArrayData = [...counter.state.columns].map(column => {
        if (column.name === sourceColumnName) {
            column.tasks = column.tasks.filter(task => task !== targetTaskId);
        }

        if (column.name === targetColumnName) {
            column.tasks.splice(targetTaskIndex, 0, targetTaskId);
        }


        return column;
    })


    counter.setState({ ...counter.state, columns: newArrayData });

}

export const moveTaskInSameColumn = (counter) => (columnName, sourceTaskIndex, targetTaskIndex) => {

    const columnsCopy = [...counter.state.columns];

    let targetColumn = columnsCopy.find(columnIter => columnIter.name === columnName);
    targetColumn.tasks = arrayMove(targetColumn.tasks, sourceTaskIndex, targetTaskIndex);

    counter.setState({ ...counter.state, columns: columnsCopy })

}

export const loadTasks = (counter) => () => {
    counter.setState({ ...loadState() });
}


export const saveTasks = (counter) => () => {
    saveState(counter.state);
}