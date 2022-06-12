import React from 'react';

import { Layout, Button, Switch, Row, notification, Typography, Col } from 'antd';
import { exportData, getFileData, resetLocalStorageState } from '../utils/localstorage';
import { useTasks, useSettings } from '../entities';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const { Title } = Typography;

// The settings view
export const Settings = () => {
  const [tasks, { loadTasksFromLocalStorage, importData }] = useTasks();

  const [settings, { loadSettingsFromLocalStorage, setDarkMode, setShowContentsOnTaskBoard }] = useSettings();

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
      placement: 'top',
    });
  };

  return (
    <Layout className="full-height">
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
        </Layout>
      </Layout>
    </Layout>
  );
};
