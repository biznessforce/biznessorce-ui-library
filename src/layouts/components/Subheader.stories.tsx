import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Typography, Breadcrumb, Space, Tag } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import Subheader from "./Subheader";

const meta: Meta<typeof Subheader> = {
  title: "Layout/Subheader",
  component: Subheader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Subheader>;

export const WithBreadcrumbs: Story = {
  args: {
    leftSlot: (
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/users",
            title: (
              <>
                <UserOutlined />
                <span>Users</span>
              </>
            ),
          },
          {
            title: "Profile",
          },
        ]}
      />
    ),
    rightSlot: (
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>
          Add New
        </Button>
      </Space>
    ),
  },
};

export const WithTitleAndActions: Story = {
  args: {
    leftSlot: (
      <Space>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Dashboard
        </Typography.Title>
        <Tag color="blue">Live</Tag>
      </Space>
    ),
    rightSlot: (
      <Space>
        <Button icon={<FilterOutlined />}>Filter</Button>
        <Button icon={<DownloadOutlined />}>Export</Button>
        <Button type="primary">Refresh</Button>
      </Space>
    ),
  },
};

export const CustomBackground: Story = {
  args: {
    bgColor: "#e6f7ff",
    leftSlot: <Typography.Text strong>Custom Background Color</Typography.Text>,
    rightSlot: <Button type="link">View Details</Button>,
  },
};

export const LeftSlotOnly: Story = {
  args: {
    leftSlot: (
      <Breadcrumb
        items={[
          { title: "Home" },
          { title: "Products" },
          { title: "Electronics" },
        ]}
      />
    ),
  },
};

export const RightSlotOnly: Story = {
  args: {
    rightSlot: (
      <Space>
        <Button>Cancel</Button>
        <Button type="primary">Save Changes</Button>
      </Space>
    ),
  },
};
