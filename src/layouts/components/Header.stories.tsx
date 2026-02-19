import type { Meta, StoryObj } from "@storybook/react";
import { Button, Space } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import React from "react";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const sampleDropdownMenu = {
  items: [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "Logout",
      danger: true,
    },
  ],
  onClick: (info: any) => {
    console.log("Menu clicked:", info.key);
  },
};

export const Default: Story = {
  args: {
    title: "Dashboard",
    loggedUserName: "John Doe",
    dropdownMenu: sampleDropdownMenu,
    toolSlot: null,
    rightToolSlot: null,
  },
};

export const WithToolSlots: Story = {
  args: {
    title: "Employee Management",
    loggedUserName: "Jane Smith",
    dropdownMenu: sampleDropdownMenu,
    toolSlot: (
      <Space>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Button type="primary">Add Employee</Button>
      </Space>
    ),
    rightToolSlot: (
      <Space>
        <Button icon={<BellOutlined />} />
        <Button icon={<SettingOutlined />} />
      </Space>
    ),
  },
};

export const CustomTitle: Story = {
  args: {
    title: (
      <Space>
        <img
          src="https://via.placeholder.com/32"
          alt="Logo"
          style={{ borderRadius: 4 }}
        />
        <span>My Application</span>
      </Space>
    ),
    loggedUserName: "Admin User",
    dropdownMenu: sampleDropdownMenu,
    toolSlot: null,
    rightToolSlot: null,
  },
};

export const WithActions: Story = {
  args: {
    title: "Projects",
    loggedUserName: "Project Manager",
    dropdownMenu: sampleDropdownMenu,
    toolSlot: (
      <Space>
        <Button>Filter</Button>
        <Button>Sort</Button>
        <Button type="primary">New Project</Button>
      </Space>
    ),
    rightToolSlot: (
      <Space>
        <Button icon={<BellOutlined />} badge={{ count: 5 }} />
      </Space>
    ),
  },
};
