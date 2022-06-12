import React, { useState, useEffect } from 'react';
import './App.css';

import DraggableTaskCard from './DraggableTaskCard';
import { Draggable } from 'react-beautiful-dnd';
import Confetti from 'react-dom-confetti';
import { useTaskPreviousColumns, useTasks } from '../entities';

const CONFETTI_ANIMATION_LENGTH = 500;

// The task list view for a column
// Contains all the cards for the column
const TaskList = ({ tasks, name }) => {
  const [showAnim, setShowAnim] = useState([]);

  const [taskData] = useTasks();

  const [taskPreviousColumns, { setTaskPreviousColumns }] = useTaskPreviousColumns();

  // Handles diffing column data & showing confetti animation
  useEffect(() => {
    if (taskData?.columns?.length > 0) {
      for (const column of taskData?.columns) {
        for (const columnTask of column?.tasks || []) {
          // Show animation if the card has been moved to column that has 'showConfetti' attribute
          const taskData = taskPreviousColumns.tasks[columnTask];
          if (taskData && column.name && taskData.previousColumn !== column.name && column.showConfetti) {
            setShowAnim((cur) => [...cur, columnTask]);
            setTimeout(() => setShowAnim((cur) => cur.filter((iter) => iter !== columnTask)), CONFETTI_ANIMATION_LENGTH);
          }
          const newTaskData = { id: columnTask, previousColumn: column.name };
          setTaskPreviousColumns(newTaskData);
        }
      }
    }
    //eslint-disable-next-line
  }, [taskData?.columns]);

  return tasks?.map((task, index) => (
    <Draggable key={'task-list-draggable-' + index} draggableId={name + index.toString()} index={index}>
      {(provided) => (
        <div className="task-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Confetti className="confetti" active={showAnim?.includes(task)}></Confetti>

          <DraggableTaskCard id={task}></DraggableTaskCard>
        </div>
      )}
    </Draggable>
  ));
};

export default TaskList;
