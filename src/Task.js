import React, { useState, useCallback } from 'react';
import './App.css';
import { Card } from 'antd';

import ReactMarkdown from 'react-markdown';

function Task({ data }) {


    const [state, setState] = useState({ data });
    const [isEditing, setIsEditing] = useState(false);



    const handleChange =useCallback(async (event) => {
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
            <Card style={{ width: 300 }}>
                <div onClick={test} >

                    <ReactMarkdown source={data} />
                </div>
            </Card>
        </div>
    )
        :
        <div>
            <Card extra={<a href="#" onClick={test}>Save</a>} style={{ width: 300 }}>
                <textarea value={data} onChange={handleChange} ></textarea>
            </Card>
        </div>
        ;
}

export default Task;
