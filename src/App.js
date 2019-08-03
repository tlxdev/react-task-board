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
const changeColumn = (source, destination, state) => {

  const sourceData = Array.from(state[source.droppableId]);

  const destinationData = Array.from(state[destination.droppableId]);

  const [removed] = sourceData.splice(source.index, 1);
  destinationData.splice(destination.index, 0, removed);


  return { [source.droppableId]: sourceData, [destination.droppableId]: destinationData };
};


function App() {

  const [state, setState] = useState({ data: initial, secondColumnData: secondColumn });

  function onDragEnd({ destination, source }) {

    if(!destination || !source){
      return;
    }

    if (destination && source && destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }



    if (destination.droppableId !== source.droppableId) {
      setState(changeColumn(source, destination, state));
    } else {

      console.log(state[destination.droppableId]);

      const data = reorder(
        state[destination.droppableId],
        source.index,
        destination.index
      );



      console.log('new result');
      console.log(data);

      setState({ ...state, [destination.droppableId]: data });

    }
  }



  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>

        <Row type="flex" justify="center">


          <Col span={4}>
            <Title class="App-title" level={4}>Todo</Title>

            <Droppable droppableId={"data"} isCombineEnabled={false} key={"tasklist"}>
              {provided => (

                <div ref={provided.innerRef} {...provided.droppableProps}>

                  <TaskList tasks={state.data} name={"first"}>

                  </TaskList>


                  {provided.placeholder}
                </div>


              )}
            </Droppable>

          </Col>



          <Col span={4}>
            <Title class="App-title" level={4}>In progress</Title>


            <Droppable droppableId={"secondColumnData"} isCombineEnabled={false} key="abcd">
              {provided => (

                <div ref={provided.innerRef} {...provided.droppableProps}>

                  <TaskList tasks={state.secondColumnData} name={"second"}>

                  </TaskList>


                  <div style={{ height: 300, width: 300, marginRight: 16, marginTop: 8 }}> {provided.placeholder} </div>
                </div>


              )}
            </Droppable>

          </Col>

        </Row>

      </DragDropContext>

    </div >
  );
}

export default App;
