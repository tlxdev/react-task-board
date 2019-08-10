import React from 'react';
import './App.css';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import { Col, Row, Layout, Menu, Icon, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { withRouter } from "react-router-dom";
import { useTasks } from '../entities';
import { Link } from 'react-router-dom'

const { Sider, Content } = Layout;




function App(props) {


  const [tasks, { moveTaskBetweenColumns, moveTaskInSameColumn }] = useTasks();

  function clickMainDiv() {
    if (props.blur) {
      props.history.push('/')
    }
  }

  function onDragEnd({ destination, source }) {

    if (!destination || !source) {
      return;
    }

    if (destination && source && destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }



    if (destination.droppableId !== source.droppableId) {
      moveTaskBetweenColumns(source.droppableId, destination.droppableId, source.index, destination.index);
    } else {
      moveTaskInSameColumn(source.droppableId, source.index, destination.index);
    }
  }



  return (

    <div className={`fullheight ${props.blur ? 'blurred' : ''} `} onClick={clickMainDiv} >
      <Layout className="fullheight">
        <Sider trigger={null} collapsible collapsed={false}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="user" />
                <span>Task board</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/settings">
                <Icon type="setting" />
                <span>Settings</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="question-circle" />
              <span>About</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>

          <div className="App">
            <DragDropContext onDragEnd={onDragEnd}>

              <Row type="flex" justify="center">

                {tasks.columns.map(column => (

                  <Col span={5} key={"task-column-" + column.name}>
                    <Row type="flex">
                      <Title className="App-title" level={4}>{column.name} ({column.tasks.length})</Title>

                      {column.canAddTask &&
                        <Link to="/task/new">
                          <Button className="add-task-button" icon="plus" type="link" size={"default"}>
                            Add
                        </Button>
                        </Link>
                      }

                    </Row>

                    <Droppable droppableId={column.name} isCombineEnabled={false}>
                      {provided => (

                        <div ref={provided.innerRef} {...provided.droppableProps}>

                          <TaskList tasks={column.tasks} name={column.name}>

                          </TaskList>

                          <div style={{ height: 300, width: 300, marginRight: 16 }}> {provided.placeholder} </div>
                        </div>


                      )}
                    </Droppable>

                  </Col>
                ))}

              </Row>

            </DragDropContext>
          </div>

        </Content>
      </Layout>
    </div >

  );
}

export default withRouter(App);
