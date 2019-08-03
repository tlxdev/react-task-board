import React from 'react';
import './App.css';

import Task from './Task';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskList({ tasks, name }) {
    return tasks ? tasks.map((task, index) => (
        <Draggable draggableId={name+index.toString()} index={index}>
            {provided => (
                <div className="Task-card" 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Task data={task} ></Task>
                </div>
            )}
        </Draggable>
    )) : '';

}

export default TaskList;
