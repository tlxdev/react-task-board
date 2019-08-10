import React, { useState } from 'react';
import './TaskView.css';

import { Form, Button, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import ReactMarkdown from 'react-markdown';

import { columns } from './data';


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



  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleChangeText = event => {
    this.setState({
      text: event.target.value
    });

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
