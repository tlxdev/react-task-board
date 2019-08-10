import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import { WrappedTaskView } from './components/TaskView';
import { useTasks } from './entities';

function Main() {


    const [tasks, { loadTasks, saveTasks }] = useTasks();

    useEffect(() => {
        if (tasks.columns.length === 0) {
            loadTasks();
        } else {
            saveTasks()
        }
    }, [tasks, loadTasks, saveTasks]);

    return (<BrowserRouter>
        <Route path="/" exact component={App} />
        <Route path="/task/:id" render={() => <App blur={true}></App>} />
        <Route path="/task/:taskId" component={WrappedTaskView} />
    </BrowserRouter>);

}

export default Main;