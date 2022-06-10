import React from 'react';

import { Layout } from 'antd';

import { Typography } from 'antd';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';
import { useSettings } from '../entities';

const { Title } = Typography;

// The about view
export const About = () => {
  const [settings] = useSettings();

  return (
    <Layout className="fullheight">
      <SideNavigation selectedPage={'3'} />

      <Layout
        type="flex"
        justify="center"
        className={`fullheight ${settings.darkMode ? 'dark' : ''}`}
      >
        <Layout className="page-card">
          <Title level={2} className="settings-title">
            About
          </Title>

          <div className="text">
            <p>Created by Taneli</p>{' '}
            <a href="https://github.com/tlxdev">https://github.com/tlxdev</a>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}
