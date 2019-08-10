import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { WrappedTaskView } from './TaskView';

const PopoverRouter = () => (
    <BrowserRouter>
        <Route path="/task/:taskId" component={WrappedTaskView} />
    </BrowserRouter>

)

export default PopoverRouter;