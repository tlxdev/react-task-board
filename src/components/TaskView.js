import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import ReactMarkdown from 'react-markdown';

import { useTasks, useSettings } from '../entities';

import './TaskView.css';
import classNames from 'classnames';

const EMPTY_TASK = {
  title: '',
  text: ''
};

/**
 * The view for /task/:id (popup) view
 * If id is 'new', doesn't save changes until "Save" button is pressed
 */
export const TaskView = () => {
  const { id } = useParams();

  const isNew = id === 'new';

  const [tasks, { setTask, addNewTask }] = useTasks();

  const getInitialTaskState = () => {
    if (isNew) {
      return EMPTY_TASK;
    }
    return tasks.tasks.find((taskIter) => taskIter.id === Number(id)) || EMPTY_TASK;
  };

  const [selectedTask, setSelectedTask] = useState(getInitialTaskState());

  const [settings] = useSettings();

  // When user types into the "title" field, update state
  const setTitle = (title) => {
    setSelectedTask({ ...selectedTask, title });
  };

  // When user types into the "text" field, update state
  const setText = (text) => {
    setSelectedTask({ ...selectedTask, text });
  };

  const onSave = () => {
    if (isNew) {
      addNewTask(selectedTask);
    } else {
      setTask(selectedTask);
    }
  };

  return (
    selectedTask && (
      <div className={classNames('popover', { dark: settings.darkMode })}>
        <Row className="centered">
          <div className="task-form">
            <input
              className="title-input form-item"
              value={selectedTask.title}
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Row gutter={[16, 0]}>
              <Col span={12}>
                <TextArea
                  className="edit-textarea form-item"
                  rows={4}
                  value={selectedTask.text}
                  placeholder="Type task description in Markdown"
                  onChange={(e) => setText(e.target.value)}
                />
              </Col>

              <Col span={12}>
                <ReactMarkdown className="markdown" children={selectedTask.text} linkTarget={'_blank'} />
              </Col>
            </Row>

            <Link to="/">
              <Button type="primary" htmlType="submit" className="task-form-button" onClick={onSave}>
                Save
              </Button>
            </Link>
          </div>
        </Row>
      </div>
    )
  );
};
