import React from 'react';

import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Meta from 'antd/lib/card/Meta';
import classNames from 'classnames';

import { useTasks, useSettings } from '../entities';

import './App.css';

const DraggableTaskCard = React.memo(({ id }) => {
  const [tasks] = useTasks();

  const task = tasks.tasks.find((taskIter) => taskIter.id === id);

  const [settings] = useSettings();

  if (id == null) {
    return null;
  }

  return (
    <Link to={`/task/${task.id}`}>
      <Card className={classNames('task-card', { dark: settings.darkMode })}>
        <Meta
          className={classNames({ dark: settings.darkMode })}
          title={`#${task.id} ${task.title}`}
          description={<ReactMarkdown source={task.text} />}
        />
      </Card>
    </Link>
  );
});

export default DraggableTaskCard;
