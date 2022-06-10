import React, { useState, useEffect } from 'react';
import './App.css';

import DraggableTaskCard from './DraggableTaskCard';
import { Draggable } from 'react-beautiful-dnd';
import Confetti from 'react-dom-confetti';
import { useTaskPreviousColumns, useTasks } from '../entities';

// The task list view for a column
// Contains all the cards for the column
const TaskList = ({ tasks, name }) => {
  const [showAnim, setShowAnim] = useState({});

  const [tasksData] = useTasks();

  const [taskPreviousColumns, { setTaskPreviousColumns }] = useTaskPreviousColumns();

  // Handles diffing column data & showing confetti animation
  useEffect(() => {
    if (tasksData && tasksData.columns && tasksData.columns.length > 0) {
      // Search tasks where columns has changed

      for (const column of tasksData.columns) {
        for (const columnTask of column.tasks) {
          // Show animation if the card has been moved to column that has 'showConfetti' attribute
          const taskData = taskPreviousColumns.tasks[columnTask];
          if (
            taskData &&
            column.name &&
            taskData.previousColumn !== column.name &&
            column.showConfetti
          ) {
            const data = { [columnTask]: true };
            setShowAnim(data);
            setTimeout(() => setShowAnim({}), 300);
          }
          const newTaskData = { id: columnTask, previousColumn: column.name };
          setTaskPreviousColumns(newTaskData);
        }
      }
    }
    //eslint-disable-next-line
  }, [tasksData.columns, showAnim, setShowAnim]);

  return tasks
    ? tasks.map((task, index) => (
        <Draggable
          key={'task-list-draggable-' + index}
          draggableId={name + index.toString()}
          index={index}>
          {(provided) => (
            <div
              className="Task-card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <Confetti className="confetti" active={showAnim[task]}></Confetti>

              <DraggableTaskCard data={task}></DraggableTaskCard>
            </div>
          )}
        </Draggable>
      ))
    : '';
};

export default TaskList;
