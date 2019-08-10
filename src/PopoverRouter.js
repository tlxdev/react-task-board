import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import TaskView, { WrappedTaskView } from './TaskView';

const PopoverRouter = () => (
    <BrowserRouter>
        <Route path="/task/:taskId" component={WrappedTaskView} />
    </BrowserRouter>

)

export default PopoverRouter;