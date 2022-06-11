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
  const oldTaskCount = tasksStore.state.tasks.length;
  // Create new task object, id made by auto incrementing
  const newTask = { ...task, id: oldTaskCount + 1 };

  const tasksWithNewTask = [...tasksStore.state.tasks, newTask];

  const columnsWithNewTask = tasksStore.state.columns.map((column, index) => {
    if (index === 0) {
      return {
        ...column,
        tasks: [...column.tasks, newTask.id]
      };
    }
    return column;
  });

  console.log(tasksWithNewTask);

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
