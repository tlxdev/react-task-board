import React, { useState, useEffect } from 'react';

import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Meta from 'antd/lib/card/Meta';

import { useTasks, useSettings } from '../entities';

import './App.css';

const DraggableTaskCard = ({ data }) => {
  const [tasks] = useTasks();

  const [state, setState] = useState({});

  const [settings] = useSettings();

  useEffect(() => {
    setState({ ...tasks.tasks.find((taskIter) => taskIter.id === data) });
  }, [tasks, data]);

  return (
    <div>
      <Link to={`/task/${state.id}`}>
        <Card
          style={{ width: 300, textAlign: 'left' }}
          className={`${settings.darkMode ? 'dark' : ''}`}>
          <div>
            <Meta
              className={`${settings.darkMode ? 'dark' : ''}`}
              title={`#${state.id} ${state.title}`}
              description={<ReactMarkdown source={state.text} />}
            />
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default DraggableTaskCard;
