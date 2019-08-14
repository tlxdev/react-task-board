
// thanks https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e for localstorage load/save methods

const initialTasks = [
    {
        id: 0,
        title: 'Test editing by clicking a task',
        text: 'You can write markdown, and instantly preview it while typing. Isn\'t that nice?'
    },
    {
        id: 1,
        title: 'Test the application out', text:
            'Drag and drop the task cards around to move them between columns.'
    },
    {
        id: 2,
        title: 'Edit a task',
        text: `Edit a task and type some markdown. 
Some examples about possibilities are images
![Images](https://icon-library.net/images/react-icon/react-icon-13.jpg)

or links
https://www.github.com/tanlah`},
     {
        id: 3,
        title: 'Visit the application',
        text: `Use react-task-board by navigating to it`},

]

const initialColumns = [
    {
        name: 'Todo',
        tasks: [0, 1],
        canAddTask: true,
    },
    {
        name: 'In progress',
        tasks: [2]
    },
    {
        name: 'Done',
        tasks: [3],
        showConfetti: true
    }
]


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return {
                columns: initialColumns,
                tasks: initialTasks,
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

export const saveState = (state) => {
    state.tasks.forEach(task => delete task.previousColumn);
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
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
}


export const getFileData = () => {
    return new Promise((resolve, reject) => {
        let linkElement = document.createElement('input');
        linkElement.setAttribute('type', 'file');
        linkElement.setAttribute('accept', '.json');
        linkElement.click();
        linkElement.addEventListener('change', (event => {
            const reader = new FileReader()
            reader.onload = (event) => resolve(loadStateFromData(event.target.result));
            reader.readAsText(event.target.files[0])
        }), false);
    });
}