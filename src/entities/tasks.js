import { arrayMoveImmutable } from 'array-move';
import { saveState, loadState } from '../utils/localstorage';

export const initialState = {
  columns: [],
  tasks: []
};

export const setTask = (tasksStore) => (task) => {
  // Replace the object located in that index with given param
  const tasksClone = [...tasksStore.state.tasks].map((originalTask) => {
    if (originalTask.id === task.id) {
      return task;
    }
    return originalTask;
  });

  tasksStore.setState({ ...tasksStore.state, tasks: tasksClone });
};

const insertToArrayWithoutMutate = (array, index, item) => [...array.slice(0, index), item, ...array.slice(index)];

export const moveTaskBetweenColumns = (tasksStore) => (sourceColumnName, targetColumnName, sourceTaskIndex, targetTaskIndex) => {
  // Find the task id for for given column and index
  const targetTaskId = tasksStore.state.columns.find((columnIter) => columnIter.name === sourceColumnName).tasks[sourceTaskIndex];

  // For each column
  const newArrayData = [...tasksStore.state.columns].map((column) => {
    // Remove the task from old column
    if (column.name === sourceColumnName) {
      return {
        ...column,
        tasks: [...column.tasks].filter((task) => task !== targetTaskId)
      };
    }
    // Insert it into new column
    if (column.name === targetColumnName) {
      return {
        ...column,
        tasks: insertToArrayWithoutMutate([...column.tasks], targetTaskIndex, targetTaskId)
      };
    }

    return column;
  });

  tasksStore.setState({ ...tasksStore.state, columns: newArrayData });
};

export const moveTaskInSameColumn = (tasksStore) => (columnName, sourceTaskIndex, targetTaskIndex) => {
  const columns = tasksStore.state.columns.map((column) => {
    if (column?.name === columnName) {
      return {
        ...column,
        tasks: arrayMoveImmutable(column.tasks, sourceTaskIndex, targetTaskIndex)
      };
    }
    return column;
  });

  tasksStore.setState({ ...tasksStore.state, columns });
};

export const addNewTask = (tasksStore) => (task) => {
  const columnsWithNewTask = [...tasksStore.state.columns];
  const tasksWithNewTask = [...tasksStore.state.tasks];

  // Create new task object, id made by auto incrementing
  const newTask = { id: tasksWithNewTask.length + 1, ...task };

  // Add it into the tasks array
  tasksWithNewTask.push(newTask);

  // Add the new task into the first column(hardcoded for now)
  columnsWithNewTask[0].tasks.push(newTask.id);

  tasksStore.setState({
    ...tasksStore.state,
    columns: columnsWithNewTask,
    tasks: tasksWithNewTask
  });
};

export const loadTasksFromLocalStorage = (tasksStore) => () => {
  // Set state to data from localstorage
  tasksStore.setState({ ...loadState('state') });
};

export const saveTasksToLocalStorage = (tasksStore) => () => {
  // Save state to localstorage
  saveState(tasksStore.state, 'state');
};

export const importData = (tasksStore) => (data) => {
  tasksStore.setState({ ...data });
};
