import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

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
    title: "User Management",
    permission: ["user.view"],
  },
  reports: {
    key: "reports",
    label: "Reports",
    icon: <FileTextOutlined />,
    title: "Reports",
    permission: ["report.view"],
  },
  analytics: {
    key: "analytics",
    label: "Analytics",
    icon: <BarChartOutlined />,
    title: "Analytics",
    permission: ["analytics.view"],
  },
  team: {
    key: "team",
    label: "Team",
    icon: <TeamOutlined />,
    title: "Team Management",
    permission: ["team.manage"],
  },
  settings: {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    title: "Settings",
    permission: ["settings.manage"],
  },
};

export const AdminUser: Story = {
  args: {
    menus: sampleMenus,
    authorities: [
      "user.view",
      "report.view",
      "analytics.view",
      "team.manage",
      "settings.manage",
    ],
    SUPER_ADMIN: null,
    logoBgColor: "#002140",
  },
};

export const RegularUser: Story = {
  args: {
    menus: sampleMenus,
    authorities: ["user.view", "report.view"],
    SUPER_ADMIN: null,
    logoBgColor: "#002140",
  },
};

export const SuperAdmin: Story = {
  args: {
    menus: sampleMenus,
    authorities: [],
    SUPER_ADMIN: "SUPER_ADMIN",
    logoBgColor: "#1890ff",
  },
};

export const CustomLogo: Story = {
  args: {
    menus: sampleMenus,
    authorities: ["user.view", "report.view", "analytics.view"],
    SUPER_ADMIN: null,
    logoBgColor: "#52c41a",
    logo: "https://via.placeholder.com/40x40/52c41a/ffffff?text=BF",
  },
};

export const MinimalPermissions: Story = {
  args: {
    menus: sampleMenus,
    authorities: [],
    SUPER_ADMIN: null,
    logoBgColor: "#002140",
  },
};
