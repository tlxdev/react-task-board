import React from 'react';
import './App.css';

import DraggableTaskCard from './DraggableTaskCard';
import { Draggable } from "react-beautiful-dnd";

function TaskList({ tasks, name }) {
    return tasks ? tasks.map((task, index) => (
        <Draggable key={"task-list-draggable-" + index} draggableId={name+index.toString()} index={index}>
            {provided => (
                <div className="Task-card" 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <DraggableTaskCard data={task} ></DraggableTaskCard>
                </div>
            )}
        </Draggable>
    )) : '';

}

export default TaskList;