import React from 'react';
import './App.css';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import { Col, Row, Layout, Menu, Icon } from 'antd';
import Title from 'antd/lib/typography/Title';
import { withRouter } from "react-router-dom";
import { useTasks } from './entities';

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
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>

          <div className="App">
            <DragDropContext onDragEnd={onDragEnd}>

              <Row type="flex" justify="center">

                {tasks.columns.map(column => (

                  <Col span={5} key={"task-column-" + column.name}>
                    <Title className="App-title" level={4}>{column.name} ({column.tasks.length})</Title>

                    <Droppable droppableId={column.name} isCombineEnabled={false}>
                      {provided => (

                        <div ref={provided.innerRef} {...provided.droppableProps}>

                          <TaskList tasks={column.tasks} name={column.name}>

                          </TaskList>

                          <div style={{ height: 300, width: 300, marginRight: 16, marginTop: 8 }}> {provided.placeholder} </div>
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
