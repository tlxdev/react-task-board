import React from 'react';

import './App.css';
import { Layout, Menu, Icon, Button, Switch, Row } from 'antd';
import { Link } from 'react-router-dom'
import { exportData } from '../utils/localstorage';
import { useTasks } from '../entities';

import { Typography } from 'antd';

const { Title } = Typography;



const { Sider } = Layout;



export function Settings() {

    const [tasks] = useTasks();

    function clickExport() {
        exportData(tasks);
    }

    return (<Layout className="fullheight">
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <Link to="/">
                        <Icon type="user" />
                        <span>Task board</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/settings">
                        <Icon type="setting" />
                        <span>Settings</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="question-circle" />
                    <span>About</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout type="flex" justify="center">
            <Layout style={{
                background: '#fff',
                padding: 24,
                marginLeft: 24,
                marginTop: 24,
                marginRight: 24,
                minHeight: 280,
            }}>

            <Title level={2} style={{marginBottom: 24}}>Settings</Title>
            

            <Row>
                <Switch style={{ width: 24, marginRight: 4, marginBottom: 8 }}>Night mode</Switch>
                <span style={{marginTop: 8}}> Dark mode</span>
            </Row>

            <Row>
                <Switch defaultChecked style={{ width: 24, marginRight: 4, marginBottom: 8 }}>Night mode</Switch>
                <span style={{marginTop: 8}}> Enable confetti animation</span>
            </Row>

            
            <Row>
                <Switch defaultChecked style={{ width: 24, marginRight: 4, marginBottom: 8 }}>Night mode</Switch>
                <span style={{marginTop: 8}}>Show task contents on task board</span>
            </Row>

            <Row>
            
            <Button type="normal" icon="download" size="default" style={{ marginTop: 24, width: 164 }}>
                Import data
            </Button>

            <Button type="primary" icon="download" size="default" style={{ marginLeft: 16, marginTop: 24, width: 164 }} onClick={clickExport}>
                Export data
            </Button>

            </Row>


            </Layout>
        </Layout>
    </Layout>);
}