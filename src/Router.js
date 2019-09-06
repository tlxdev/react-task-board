import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import { TaskView } from './components/TaskView';
import { useTasks } from './entities';
import { Settings } from './components/Settings';
import { About } from './components/About';

function Router() {


    const [tasks, { loadTasksFromLocalStorage, saveTasksToLocalStorage }] = useTasks();

    // Automatically both loads data from local storage on startup,
    // And saves data changes to local storage
    useEffect(() => {
        if (tasks.columns.length === 0) {
            loadTasksFromLocalStorage();
        } else {
            saveTasksToLocalStorage()
        }
    }, [tasks, loadTasksFromLocalStorage, saveTasksToLocalStorage]);

    return (<BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path="/" exact component={App} />
        <Route path="/task/:id" render={() => <App blur={true}></App>} />
        <Route path="/task/:taskId" component={TaskView} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
    </BrowserRouter>);

}

export default Router;