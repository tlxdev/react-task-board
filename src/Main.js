import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import  { WrappedTaskView } from './TaskView';

const Main = () => (
    <BrowserRouter>
        <Route path="/" exact component={App}  />
        <Route path="/task/:id" render={() => <App blur={true}></App>} />
        <Route path="/task/:taskId" component={WrappedTaskView} />
    </BrowserRouter>

)

//  <Route path="/task/:taskId" component={WrappedTaskView} />

export default Main;