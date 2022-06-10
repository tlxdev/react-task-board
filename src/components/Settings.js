import React from 'react';

import { Layout, Button, Switch, Row, notification } from 'antd';
import { exportData, getFileData } from '../utils/localstorage';
import { useTasks, useSettings } from '../entities';

import { Typography } from 'antd';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';
import { DownloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

// The settings view
export function Settings() {

    const [tasks, { importData }] = useTasks();

    
    const [settings, { setDarkMode }] = useSettings();

    function clickExport() {
        exportData(tasks);
    }

    function clickImport() {
        getFileData().then(data => {
            importData(data);
            showNotification();
        });
    }

    
    const showNotification = () => {
        notification.open({
        message: 'Data imported',
        description:
            'Your data has been succesfully imported.',
        });
    };

    function changeDarkMode(checked) {
        setDarkMode(checked);
    }

    return (<Layout className="fullheight">
        <SideNavigation selectedPage={'2'} />

        <Layout type="flex" justify="center" className={`fullheight ${settings.darkMode ? 'dark' : ''}`}>
            <Layout className="page-card">

                <Title level={2} className="settings-title">Settings</Title>


                <Row>
                    <Switch className="settings-switch" onChange={changeDarkMode} checked={settings.darkMode}>Dark mode</Switch>
                    <span className="settings-switch-text">Dark mode</span>
                </Row>

                <Row>
                    <Switch defaultChecked className="settings-switch" >Confetti</Switch>
                    <span className="settings-switch-text">Enable confetti animation</span>
                </Row>


                <Row>
                    <Switch defaultChecked className="settings-switch">Show contents</Switch>
                    <span className="settings-switch-text">Show task contents on task board</span>
                </Row>

                <Row>
                    <Button type="normal" icon={<DownloadOutlined />} size="default" className="settings-button" onClick={clickImport}>
                        Import data
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size="default" className="settings-button" onClick={clickExport}>
                        Export data
                </Button>
                </Row>


            </Layout>
        </Layout>
    </Layout>);
}