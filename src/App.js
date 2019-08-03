import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';





const firstCardData = `# Example data  
let's render this
abcdefg`

const secondCardData = `# Second card  
some INTeresting stuff`

const initial = [firstCardData, secondCardData];


const secondColumnData = `This data will be on the second column`;
const secondColumn = [secondColumnData];




const columns = [
  {
    name: 'Todo',
    data: initial,
  },
  {
    name: 'In progress',
    data: secondColumn,
  },
  {
    name: 'Done',
    data: []
  }
];

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


  columns =  [...columns]; 
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


  const columnsArray = [...state.columns ];
  columnsArray[index] = {...columnsArray[index], data};

  return {columns: columnsArray};
}


function App() {

  const [state, setState] = useState({ columns });

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
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>

        <Row type="flex" justify="center">

          {state.columns.map(column => (

            <Col span={4}>
              <Title class="App-title" level={4}>{column.name}</Title>

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

    </div >
  );
}

export default App;
