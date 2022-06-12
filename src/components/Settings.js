import React from 'react';

import { Layout, Button, Switch, Row, notification, Typography, Col, Divider, Timeline } from 'antd';
import { exportData, getFileData, resetLocalStorageState } from '../utils/localstorage';
import { useTasks, useSettings } from '../entities';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';
import { DeleteOutlined, DownloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Title } = Typography;

// The settings view
export const Settings = ({ blur }) => {
  const [tasks, { loadTasksFromLocalStorage, importData, addNewColumnAtIndex, deleteColumnAtIndex }] = useTasks();

  const [settings, { loadSettingsFromLocalStorage, setDarkMode, setShowContentsOnTaskBoard }] = useSettings();

  const navigate = useNavigate();

  const onClickExport = () => {
    exportData(tasks);
  };

  const onClickImport = () => {
    getFileData().then((data) => {
      importData(data);
      showNotification();
    });
  };

  const showNotification = () => {
    notification.open({
      message: 'Data imported',
      description: 'Your data has been succesfully imported.'
    });
  };

  const onChangeDarkMode = (newVal) => {
    setDarkMode(newVal);
  };

  const onChangeShowTaskContentsOnBoard = (newVal) => {
    setShowContentsOnTaskBoard(newVal);
  };

  const onResetData = () => {
    resetLocalStorageState();

    // loadSettings functions auto-init with default data if localstorage is empty
    loadSettingsFromLocalStorage();
    loadTasksFromLocalStorage();

    notification.success({
      message: 'Data cleared to default',
      placement: 'top'
    });
  };

  const onClickMainDiv = () => {
    if (blur) {
      navigate('/settings');
    }
  };

  const canCreateNewColumn = tasks?.columns?.length < 4;
  const canDeleteColumn = tasks?.columns?.length > 1;

  const TaskboardColumnEditor = () => (
    <Timeline style={{ marginTop: 10 }}>
      {tasks?.columns?.map((column, index) => (
        <Timeline.Item color={column.color}>
          <Link to={`/column/${index}`}>{column.name}</Link>

          {canCreateNewColumn && (
            <Button
              style={{ paddingLeft: 5 }}
              type="link"
              size={'small'}
              icon={<PlusOutlined />}
              onClick={() => addNewColumnAtIndex(index + 1)}
            />
          )}

          {canDeleteColumn && <Button type="link" size={'small'} icon={<MinusOutlined />} onClick={() => deleteColumnAtIndex(index)} />}
        </Timeline.Item>
      ))}
    </Timeline>
  );

  return (
    <>
      <Layout
        className={classNames('full-height', {
          dark: settings.darkMode,
          blurred: blur
        })}
        onClick={onClickMainDiv}>
        <SideNavigation selectedPage={'2'} />
        <Layout type="flex" justify="center" className={classNames('full-height', { dark: settings.darkMode })}>
          <Layout className="page-card">
            <Title level={2} className="settings-title">
              Settings
            </Title>

            <Row>
              <Switch className="settings-switch" onChange={onChangeDarkMode} checked={settings.darkMode}>
                Dark mode
              </Switch>
              <span className="settings-switch-text">Dark mode</span>
            </Row>

            <Row>
              <Switch defaultChecked className="settings-switch">
                Confetti
              </Switch>
              <span className="settings-switch-text">Enable confetti animation</span>
            </Row>

            <Row>
              <Switch className="settings-switch" onChange={onChangeShowTaskContentsOnBoard} checked={settings.showContentsOnTaskBoard}>
                Show contents
              </Switch>
              <span className="settings-switch-text">Show task contents on task board</span>
            </Row>

            <Row gutter={[0, 16]} type="flex">
              <Col>
                <Button type="normal" icon={<DownloadOutlined />} size="default" className="settings-button" onClick={onClickImport}>
                  Import task data
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} size="default" className="settings-button" onClick={onClickExport}>
                  Export task data
                </Button>
              </Col>
              <Col span={24}>
                <Button type="danger" icon={<DeleteOutlined />} onClick={onResetData}>
                  Reset tasks
                </Button>
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Task board columns (max 4)</Title>

            <TaskboardColumnEditor />
          </Layout>
        </Layout>
      </Layout>

      <Outlet />
    </>
  );
};
