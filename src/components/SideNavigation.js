import React from 'react';

import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { QuestionCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export const SideNavigation = ({ selectedPage }) => {
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedPage]}>
        <Menu.Item key="1">
          <Link to="/">
            <UserOutlined />
            <span>Task board</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/settings">
            <SettingOutlined />
            <span>Settings</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">
            <QuestionCircleOutlined />
            <span>About</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
