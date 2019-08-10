import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Card, Avatar } from 'antd';

import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import Meta from 'antd/lib/card/Meta';

import { useTasks } from './entities';


function DraggableTaskCard({ data }) {


    const [tasks, { setTask, moveTaskBetweenColumns }] = useTasks();

    const [state, setState] = useState({});

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setState({ ...tasks.tasks.find(taskIter => taskIter.id === data) });
    }, [tasks]);





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
