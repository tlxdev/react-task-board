import React from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const { Sider } = Layout;

export function SideNavigation({ selectedPage }) {
    return (<Sider trigger={null} collapsible collapsed={false}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedPage]}>
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
                <Link to="/about">
                    <Icon type="question-circle" />
                    <span>About</span>
                </Link>
            </Menu.Item>
        </Menu>
    </Sider>);
}