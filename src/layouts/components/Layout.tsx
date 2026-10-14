import { Layout as AntLayout } from 'antd';
import React from 'react';
import Sidebar, { SidebarProps } from './Sidebar';

type LayoutProps = React.FC & {
  sidebarProps: SidebarProps;
  children: JSX.Element;
};

export function Layout({ children, sidebarProps }: LayoutProps) {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidebar {...sidebarProps} />
      {children}
      {/* <Ezdrawer /> */}
    </AntLayout>
  );
}

export default Layout;
