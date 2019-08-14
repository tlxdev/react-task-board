import React from 'react';

import { Layout } from 'antd';

import { Typography } from 'antd';

import './App.css';
import './Settings.css';
import { SideNavigation } from './SideNavigation';

const { Title } = Typography;


export function About() {

    return (<Layout className="fullheight">
        <SideNavigation selectedPage={'3'}/>

        <Layout type="flex" justify="center">
            <Layout style={{
                background: '#fff',
                padding: 24,
                marginLeft: 24,
                marginTop: 24,
                marginRight: 24,
                minHeight: 280,
            }}>

                <Title level={2} className="settings-title">About</Title>

                Created by <a href="https://github.com/tanlah">https://github.com/tanlah</a>


            </Layout>
        </Layout>
    </Layout>);
}