import React from 'react';

import { Layout, Button, Switch, Row, notification } from 'antd';
import { exportData, getFileData } from '../utils/localstorage';
import { useTasks, useSettings } from '../entities';

import { Typography } from 'antd';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';
import { DownloadOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const { Title } = Typography;

// The settings view
export const Settings = () => {
  const [tasks, { importData }] = useTasks();

  const [settings, { setDarkMode }] = useSettings();

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

  return (
    <Layout className="full-height">
      <SideNavigation selectedPage={'2'} />

      <Layout
        type="flex"
        justify="center"
        className={classNames('full-height', { dark: settings.darkMode })}>
        <Layout className="page-card">
          <Title level={2} className="settings-title">
            Settings
          </Title>

          <Row>
            <Switch
              className="settings-switch"
              onChange={onChangeDarkMode}
              checked={settings.darkMode}>
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
            <Switch defaultChecked className="settings-switch">
              Show contents
            </Switch>
            <span className="settings-switch-text">Show task contents on task board</span>
          </Row>

          <Row>
            <Button
              type="normal"
              icon={<DownloadOutlined />}
              size="default"
              className="settings-button"
              onClick={onClickImport}>
              Import data
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="default"
              className="settings-button"
              onClick={onClickExport}>
              Export data
            </Button>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
};
