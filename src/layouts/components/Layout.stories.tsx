import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Card, Typography, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Layout from "./Layout";

const meta: Meta<typeof Layout> = {
  title: "Layout/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Layout>;

const sampleMenus = {
  dashboard: {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    permission: true,
  },
  users: {
    key: "users",
    label: "Users",
    icon: <UserOutlined />,
    title: "Users",
    permission: ["user.view"],
  },
  reports: {
    key: "reports",
    label: "Reports",
    icon: <FileTextOutlined />,
    title: "Reports",
    permission: ["report.view"],
  },
  settings: {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    title: "Settings",
    permission: ["settings.manage"],
  },
};

const SampleContent = () => (
  <div
    style={{
      marginLeft: 64,
      padding: 24,
      minHeight: "100vh",
      background: "#f0f2f5",
    }}
  >
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Card>
        <Typography.Title level={2}>Application Layout</Typography.Title>
        <Typography.Paragraph>
          This is the main application layout component that combines the
          sidebar with the page content. The sidebar is fixed on the left side,
          and the content area adjusts accordingly.
        </Typography.Paragraph>
      </Card>
      <Card title="Features">
        <ul>
          <li>Fixed sidebar navigation</li>
          <li>Permission-based menu items</li>
          <li>Responsive content area</li>
          <li>Full-height layout</li>
        </ul>
      </Card>
    </Space>
  </div>
);

export const Default: Story = {
  args: {
    sidebarProps: {
      menus: sampleMenus,
      authorities: ["user.view", "report.view", "settings.manage"],
      SUPER_ADMIN: null,
      logoBgColor: "#002140",
    },
    children: <SampleContent />,
  },
};

export const WithCustomLogo: Story = {
  args: {
    sidebarProps: {
      menus: sampleMenus,
      authorities: ["user.view", "report.view"],
      SUPER_ADMIN: null,
      logoBgColor: "#1890ff",
      logo: "https://via.placeholder.com/40x40/1890ff/ffffff?text=APP",
    },
    children: <SampleContent />,
  },
};

export const SuperAdminView: Story = {
  args: {
    sidebarProps: {
      menus: sampleMenus,
      authorities: [],
      SUPER_ADMIN: "SUPER_ADMIN",
      logoBgColor: "#52c41a",
    },
    children: (
      <div
        style={{
          marginLeft: 64,
          padding: 24,
          minHeight: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Card>
          <Typography.Title level={2}>Super Admin Dashboard</Typography.Title>
          <Typography.Paragraph>
            As a super admin, you have access to all menu items regardless of
            specific permissions.
          </Typography.Paragraph>
        </Card>
      </div>
    ),
  },
};
