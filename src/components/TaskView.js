import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea';
import ReactMarkdown from 'react-markdown';

import { useTasks } from '../entities'

import './TaskView.css';

/**
 * The view for /task/:id (popup) view
 * If id is 'new', doesn't save changes until "Save" button is pressed
 */
export function TaskView({ match }) {

  const [tasks, { setTask, addNewTask }] = useTasks();

  const [state, setState] = useState({ title: '', text: '' });

  const [isNew, setIsNew] = useState(false);


  // Initialize local state using data from store
  useEffect(() => {

    if (match.params.taskId !== 'new' && tasks.tasks && state.title === '') {
      const taskForId = tasks.tasks.find(taskIter => taskIter.id === Number(match.params.taskId));
      if (taskForId) {
        setState(taskForId);
      }
    } else if (match.params.taskId && state.title === '') {
      setIsNew(true);
    }
    // We dont want tasks as dep
    // As it will be changing as the user types data, and we don't want to refire this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params]);


  // On local state change, update the store state
  useEffect(() => {
    if (!isNew) {
      setTask(state)
    }
  }, [state, setTask, isNew]);

  // When user types into the "title" field, update state
  const setTitle = (title => {
    setState({ ...state, title })
  });

  // When user types into the "text" field, update state
  const setText = (text => {
    setState({ ...state, text })
  });

  const save = (() => {
    if (isNew) {
      addNewTask(state);
    }
  })



  return (state && <div className="popover">
    <Row className="centered">
      <div className="task-form">

        <input
          className="title-input form-item"
          value={state.title}
          placeholder="Task title"
          onChange={e => setTitle(e.target.value)}
        />

        <Col span={12}>
          <TextArea className="edit-textarea form-item" rows={4} value={state.text} placeholder="Type task description in Markdown" onChange={e => setText(e.target.value)} />
        </Col>

        <Col span={11} style={{ marginLeft: 16 }}><ReactMarkdown source={state.text} linkTarget={"_blank"} /></Col>

        <Link to="/">
          <Button type="primary" htmlType="submit" className="task-form-button" onClick={save}>
            Save
          </Button>
        </Link>

      </div>
    </Row>
  </div>
  );
}
