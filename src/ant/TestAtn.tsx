import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const Testant: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentContent, setCurrentContent] = useState('Bill is a cat.'); // Giá trị ban đầu của nội dung trong Content
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (key: string) => {
    // Cập nhật nội dung trong Content dựa trên key của mục menu được bấm
    switch (key) {
      case '1':
        setCurrentContent('Nội dung Option 1');
        break;
      case '2':
        setCurrentContent('Nội dung Option 2');
        break;
      case '3':
        setCurrentContent('Nội dung User - Tom');
        break;
      case '4':
        setCurrentContent('Nội dung User - Bill');
        break;
      case '5':
        setCurrentContent('Nội dung User - Alex');
        break;
      case '6':
        setCurrentContent('Nội dung Team - Team 1');
        break;
      case '8':
        setCurrentContent('');
        break;
      case '9':
        setCurrentContent('Nội dung Files');
        break;
      default:
        setCurrentContent('');
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={({ key }) => handleMenuItemClick(key)} // Xử lý sự kiện khi một mục trong menu được bấm
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {currentContent} {/* Hiển thị nội dung tương ứng */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Testant;
