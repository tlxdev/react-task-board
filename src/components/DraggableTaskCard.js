import React, { useState, useCallback, useEffect } from 'react';

import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Meta from 'antd/lib/card/Meta';
import Confetti from 'react-dom-confetti';

import { useTasks, useTaskPreviousColumns } from '../entities';

import './App.css';

const confettiConfig = {
    angle: 90,
    spread: 45,
    startVelocity: 45,
    elementCount: 50,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 0,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};


function DraggableTaskCard({ data }) {


    const [tasks, { setTask }] = useTasks();

    const [state, setState] = useState({});

    const [isEditing, setIsEditing] = useState(false);

    const [showAnim, setShowAnim] = useState(false);


    const [taskPreviousColumns, { setTaskPreviousColumns }] = useTaskPreviousColumns();


    useEffect(() => {
        setState({ ...tasks.tasks.find(taskIter => taskIter.id === data) });
    }, [tasks, data]);


    useEffect(() => {
        if (tasks.columns.length > 0) {
            const currentColumn = tasks.columns.find(column => column.tasks.includes(state.id));

            const taskData = taskPreviousColumns.tasks[state.id];


            if (currentColumn && taskData &&  taskData.previousColumn !== currentColumn.name && currentColumn.showConfetti) {
                setShowAnim(true);
            }

            if ((currentColumn && taskData && taskData.previousColumn !== currentColumn.name) || (currentColumn && !taskData)) {
                const newTaskData = { id: state.id, previousColumn: currentColumn.name };
                setTaskPreviousColumns(newTaskData);
            }
        }
        //eslint-disable-next-line
    }, [tasks, state])



    const handleChange = useCallback(async (event) => {
        // don't send again while we are sending
        // update state
        //data = event.target.value;
    }, []) // update the callback if the state changes

    const test = useCallback(async () => {
        // don't send again while we are sending
        // update state
        setIsEditing(!isEditing)
    }, [isEditing]) // update the callback if the state changes

    return !isEditing ? (
        <div>


            <Confetti active={showAnim} />
            <Link to={`/task/${state.id}`}>
                <Card style={{ width: 300, textAlign: "left" }}>
                    <div >

                        <Meta
                            title={`#${state.id} ${state.title}`}
                            description={<ReactMarkdown source={state.text} />}
                        />


                    </div>
                </Card>
            </Link>
        </div>
    )
        :
        <div>
            <Card extra={<a href={"/task/" + data.id} onClick={test}>Save</a>} style={{ width: 300 }}>
                <textarea value={data.text} onChange={handleChange} ></textarea>
            </Card>
        </div>
        ;
}

export default DraggableTaskCard;
