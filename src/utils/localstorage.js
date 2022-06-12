// thanks https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e for localstorage load/save methods

const initialTasks = [
  {
    id: 0,
    title: 'Visit the application',
    text: `Use react-task-board by navigating to it with your browser`
  },
  {
    id: 1,
    title: 'Test the application out',
    text: 'Drag and drop the task cards around to move them between columns.'
  },
  {
    id: 2,
    title: 'Test editing by clicking a task',
    text: "You can write markdown, and instantly preview it while typing. Isn't that nice?"
  },
  {
    id: 3,
    title: 'Edit a task',
    text: `Edit a task and type some markdown. 
Some examples about possibilities are images
![Images](https://image.shutterstock.com/image-photo/example-word-written-on-wooden-260nw-1765482248.jpg)

or links
https://www.github.com/tlxdev`
  }
];

const initialColumns = [
  {
    name: 'Todo',
    tasks: [2, 3],
    canAddTask: true
  },
  {
    name: 'In progress',
    tasks: [1]
  },
  {
    name: 'Done',
    tasks: [0],
    showConfetti: true
  }
];

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return {
        columns: initialColumns,
        tasks: initialTasks
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const loadStateFromData = (data) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, key) => {
  if (state.tasks) {
    state.tasks.forEach((task) => delete task.previousColumn);
  }
  if (state.loaded) {
    //delete state.loaded;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

export const exportData = (data) => {
  data = JSON.stringify(data, null, 2);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);

  let exportFileDefaultName = 'exported-data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const getFileData = () => {
  return new Promise((resolve, reject) => {
    let linkElement = document.createElement('input');
    linkElement.setAttribute('type', 'file');
    linkElement.setAttribute('accept', '.json');
    linkElement.click();
    linkElement.addEventListener(
      'change',
      (event) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(loadStateFromData(event.target.result));
        reader.readAsText(event.target.files[0]);
      },
      false
    );
  });
};

export const resetLocalStorageState = () => {
  localStorage.clear('settings');
  localStorage.clear('state');
}
