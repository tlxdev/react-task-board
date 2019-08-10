import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import { Col, Row, Layout, Menu, Icon } from 'antd';
import Title from 'antd/lib/typography/Title';

import { columns } from './data';

import { withRouter } from "react-router-dom";

const { Header, Sider, Content } = Layout;


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// when changing columns
const moveToDifferentColumn = (source, destination, state) => {


  let columns = state.columns;


  const sourceData = columns.find(data => data.name === source.droppableId).data;

  const destinationData = columns.find(data => data.name === destination.droppableId).data;

  const [removed] = sourceData.splice(source.index, 1);
  destinationData.splice(destination.index, 0, removed);

  const sourceIndex = columns.findIndex(data => data.name === source.droppableId);
  const destinationIndex = columns.findIndex(data => data.name === destination.droppableId);


  columns = [...columns];
  columns[sourceIndex].data = sourceData;
  columns[destinationIndex].data = destinationData;

  console.log('Changed data ');
  console.log({ columns });


  return { columns };
};

const moveToSameColumn = (source, destination, state) => {
  const data = reorder(
    state.columns.find(column => column.name === destination.droppableId).data,
    source.index,
    destination.index
  );

  const index = state.columns.findIndex(column => column.name === destination.droppableId);


  const columnsArray = [...state.columns];
  columnsArray[index] = { ...columnsArray[index], data };

  return { columns: columnsArray };
}


function App(props) {

  const [state, setState] = useState({ columns });

  function clickMainDiv() {
    if (props.blur) {
      props.history.push('/')
    }
  }

  function onDragEnd({ destination, source }) {


    console.log(source);
    console.log(destination);


    if (!destination || !source) {
      return;
    }

    if (destination && source && destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }



    if (destination.droppableId !== source.droppableId) {
      setState(moveToDifferentColumn(source, destination, state));
    } else {
      setState(moveToSameColumn(source, destination, state));
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

          <div class="App">
            <DragDropContext onDragEnd={onDragEnd}>

              <Row type="flex" justify="center">

                {state.columns.map(column => (

                  <Col span={5}>
                    <Title class="App-title" level={4}>{column.name} ({column.data.length})</Title>

                    <Droppable droppableId={column.name} isCombineEnabled={false} key={column.name}>
                      {provided => (

                        <div ref={provided.innerRef} {...provided.droppableProps}>

                          <TaskList tasks={column.data} name={column.name}>

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
