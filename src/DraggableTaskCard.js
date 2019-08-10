import React, { useState, useCallback } from 'react';
import './App.css';
import { Card, Avatar } from 'antd';

import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import Meta from 'antd/lib/card/Meta';

function DraggableTaskCard({ data }) {


    const [state, setState] = useState({ data });
    const [isEditing, setIsEditing] = useState(false);


    const onClick = () => {
        window.location.href = "/task/" + state.data.id;
    }

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

            <Link to={`/task/${data.id}`}>
                <Card style={{ width: 300, textAlign: "left" }}>
                    <div >

                        <Meta
                            title={`#${data.id} ${data.title}`}
                            description={<ReactMarkdown source={data.text} />}
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
