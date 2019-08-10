
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
         title: 'Create a demo for application features',
         text: `![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
     
     
     With markdown you can add images on tasks
     
 [https://www.github.com]
     
     
     Or links
     `},

]

const initialColumns = [
    {
        name: 'Todo',
        tasks: [0, 1],
        canAddTask: true,
    },
    {
        name: 'In progress',
        tasks: []
    },
    {
        name: 'Done',
        tasks: [2],
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

export const saveState = (state) => {
    state.tasks.forEach(task => delete task.previousColumn);
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};