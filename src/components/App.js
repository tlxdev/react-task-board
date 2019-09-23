import React from 'react';
import './App.css';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import { Col, Row, Layout, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { withRouter } from "react-router-dom";
import { useTasks, useSettings } from '../entities';
import { Link } from 'react-router-dom'
import { SideNavigation } from './SideNavigation';

const { Content } = Layout;




function App(props) {


  const [settings] = useSettings();

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
    <div className={`fullheight`} onClick={clickMainDiv} >
      {props.blur && <div className='dark-overlay'></div>}
      <Layout className={`fullheight ${settings.darkMode ? 'dark' : ''} ${props.blur ? 'blurred' : ''}`}>

        <SideNavigation selectedPage={'1'} />

        <Content className="scrollbar-fix">

          <div className="App full-height" justify="center">
            <DragDropContext onDragEnd={onDragEnd}>

              <Row type="flex" justify="center" className="full-height">

                {tasks.columns.map(column => (
                  <Col className="task-column" xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 5 }} key={"task-column-" + column.name}>

                    <Row type="flex">
                      <Title className={`App-title ${settings.darkMode ? 'dark' : ''}`} level={4}>{column.name} ({column.tasks.length})</Title>
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
                        <div ref={provided.innerRef} {...provided.droppableProps} className="full-height">
                          <TaskList tasks={column.tasks} name={column.name}>
                          </TaskList>
                          <div className="row-placeholder"> {provided.placeholder} </div>
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
