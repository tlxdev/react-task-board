import React, { useState, useEffect } from 'react';
import './TaskView.css';

import { Button, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import ReactMarkdown from 'react-markdown';

import { columns } from './data';

import { useTasks } from './entities'

export function WrappedTaskView({ match }) {

  const [tasks, { setTask }] = useTasks();

  const [state, setState] = useState({ title: '', text: '' });


  useEffect(() => {
    
    setState(tasks.tasks.find(taskIter => taskIter.id === Number(match.params.taskId)));

    // We dont want tasks as dep
    // As it will be changing as the user types data, and we don't want to refire this effect.
    // This is basically a constructor
  }, [match.params, setState]);


  // On text input change, update the store state
  useEffect(() => {

    setTask(state)

  }, [state, setTask]);

  const setTitle = (title => {
    setState({ ...state, title })
  });

  const setText = (text => {
    setState({ ...state, text })
  });



  // Only show error after a field is touched.
  return (
    <div className="popover">
      <Row className="centered">
        <div className="login-form">
          <input
            className="title-input form-item"
            value={state.title}
            onChange={e => setTitle(e.target.value)}
          />,
                <Col span={12}><TextArea className="edit-textarea form-item" rows={4} value={state.text} onChange={e => setText(e.target.value)} /></Col>
          <Col span={11} style={{ marginLeft: 16 }}><ReactMarkdown source={state.text} /></Col>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save
            </Button>
        </div>
      </Row>
    </div>

  );
}

/*
class TaskView extends React.Component {


  constructor(props) {
    super(props);
    const cardData = columns.forEach(column => {
      const forId = column.data.find(data => Number(data.id) === Number(props.match.params.taskId));
      if (forId) {
        this.state = { ...forId };
        console.log('State');
      }
    }
    );


  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {

    // Only show error after a field is touched.
    return (

      <div class="popover">
        <Row className="centered">
          <div className="login-form">
            <input
              className="title-input form-item"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />,
              <Col span={12}><TextArea className="edit-textarea form-item" rows={4} value={this.state.text} onChange={this.handleChangeText} /></Col>
            <Col span={11} style={{ marginLeft: 16 }}><ReactMarkdown source={this.state.text} /></Col>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Save
          </Button>
          </div>
        </Row>
      </div>

    );
  }
}

export const WrappedTaskView = Form.create({ name: 'horizontal_login' })(TaskView);
*/