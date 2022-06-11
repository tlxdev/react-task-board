import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import ReactMarkdown from 'react-markdown';

import { useTasks, useSettings } from '../entities';

import './TaskView.css';
import classNames from 'classnames';

/**
 * The view for /task/:id (popup) view
 * If id is 'new', doesn't save changes until "Save" button is pressed
 */
export const TaskView = () => {
  const { id } = useParams();

  const isNew = id === 'new';

  const [tasks, { setTask, addNewTask }] = useTasks();

  const [state, setState] = useState({ title: '', text: '' });

  const [settings] = useSettings();

  useEffect(() => {
    if (id) {
      const taskForId = tasks.tasks.find((taskIter) => taskIter.id === Number(id));
      if (taskForId) {
        setState(taskForId);
      }
    }
  }, []);

  // On local state change, update the store state
  useEffect(() => {
    if (!isNew) {
      setTask(state);
    }
  }, [state]);

  // When user types into the "title" field, update state
  const setTitle = (title) => {
    setState({ ...state, title });
  };

  // When user types into the "text" field, update state
  const setText = (text) => {
    setState({ ...state, text });
  };

  const onSave = () => {
    if (isNew) {
      addNewTask(state);
    }
  };

  return (
    state && (
      <div className={classNames('popover', { dark: settings.darkMode })}>
        <Row className="centered">
          <div className="task-form">
            <input
              className="title-input form-item"
              value={state.title}
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Col span={12}>
              <TextArea
                className="edit-textarea form-item"
                rows={4}
                value={state.text}
                placeholder="Type task description in Markdown"
                onChange={(e) => setText(e.target.value)}
              />
            </Col>

            <Col span={11} style={{ marginLeft: 16 }}>
              <ReactMarkdown className="markdown" source={state.text} linkTarget={'_blank'} />
            </Col>

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
