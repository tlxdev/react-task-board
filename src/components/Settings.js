import React from 'react';

import { Layout, Button, Switch, Row } from 'antd';
import { exportData } from '../utils/localstorage';
import { useTasks } from '../entities';

import { Typography } from 'antd';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';

const { Title } = Typography;


export function Settings() {

    const [tasks] = useTasks();

    function clickExport() {
        exportData(tasks);
    }

    return (<Layout className="fullheight">
        <SideNavigation selectedPage={'2'}/>

        <Layout type="flex" justify="center">
            <Layout style={{
                background: '#fff',
                padding: 24,
                marginLeft: 24,
                marginTop: 24,
                marginRight: 24,
                minHeight: 280,
            }}>

                <Title level={2} className="settings-title">Settings</Title>


                <Row>
                    <Switch className="settings-switch" >Night mode</Switch>
                    <span className="settings-switch-text"> Dark mode</span>
                </Row>

                <Row>
                    <Switch defaultChecked className="settings-switch" >Night mode</Switch>
                    <span className="settings-switch-text"> Enable confetti animation</span>
                </Row>


                <Row>
                    <Switch defaultChecked className="settings-switch">Night mode</Switch>
                    <span className="settings-switch-text">Show task contents on task board</span>
                </Row>

                <Row>
                    <Button type="normal" icon="download" size="default" className="settings-button">
                        Import data
                    </Button>
                    <Button type="primary" icon="download" size="default" className="settings-button" onClick={clickExport}>
                        Export data
                </Button>
                </Row>


            </Layout>
        </Layout>
    </Layout>);
}