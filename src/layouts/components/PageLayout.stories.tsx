import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, Typography, Space, Button, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import PageLayout from "./PageLayout";

const meta: Meta<typeof PageLayout> = {
  title: "Layout/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const SampleContent = () => (
  <Space direction="vertical" style={{ width: "100%" }} size="large">
    <Card>
      <Typography.Title level={3}>Welcome to the Dashboard</Typography.Title>
      <Typography.Paragraph>
        This is a sample page layout demonstrating the PageLayout component with
        header, subheader, content area, and footer.
      </Typography.Paragraph>
    </Card>
    <Card title="Statistics">
      <Typography.Text>Your content goes here...</Typography.Text>
    </Card>
    <Card title="Recent Activity">
      <Typography.Text>
        Activity feed would be displayed here...
      </Typography.Text>
    </Card>
  </Space>
);

export const Complete: Story = {
  args: {
    headerProps: {
      leftSlot: (
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          My Application
        </Typography.Title>
      ),
      rightSlot: (
        <Space>
          <Button type="text" style={{ color: "white" }}>
            <UserOutlined /> Profile
          </Button>
        </Space>
      ),
    },
    subheaderProps: {
      showSubheader: true,
      leftSlot: (
        <Breadcrumb
          items={[
            { href: "/", title: <HomeOutlined /> },
            { title: "Dashboard" },
          ]}
        />
      ),
      rightSlot: (
        <Button type="primary" icon={<PlusOutlined />}>
          New Item
        </Button>
      ),
    },
    footerProps: {
      version: "1.0.0",
      buildStamp: new Date(),
      rightTools: [
        { link: "/help", label: "Help" },
        { link: "/privacy", label: "Privacy" },
      ],
    },
    children: <SampleContent />,
  },
};

export const WithoutSubheader: Story = {
  args: {
    headerProps: {
      leftSlot: (
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          Simple Layout
        </Typography.Title>
      ),
      rightSlot: (
        <Button type="text" style={{ color: "white" }}>
          <UserOutlined /> Account
        </Button>
      ),
    },
    subheaderProps: {
      showSubheader: false,
    },
    footerProps: {
      version: "2.0.0",
      buildStamp: new Date(),
    },
    children: <SampleContent />,
  },
};

export const CustomBackground: Story = {
  args: {
    bgColor: "#f0f2f5",
    headerProps: {
      leftSlot: (
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          Custom Background
        </Typography.Title>
      ),
    },
    subheaderProps: {
      showSubheader: true,
      leftSlot: (
        <Typography.Text strong>Custom Content Area Color</Typography.Text>
      ),
    },
    footerProps: {
      version: "1.5.0",
      buildStamp: new Date(),
    },
    children: (
      <Card>
        <Typography.Paragraph>
          This layout uses a custom background color for the content area.
        </Typography.Paragraph>
      </Card>
    ),
  },
};

export const MinimalLayout: Story = {
  args: {
    headerProps: {
      leftSlot: (
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          Minimal
        </Typography.Title>
      ),
    },
    subheaderProps: {
      showSubheader: false,
    },
    footerProps: {
      version: "1.0.0",
      buildStamp: new Date(),
    },
    children: (
      <Card>
        <Typography.Title level={2}>Minimal Layout</Typography.Title>
        <Typography.Paragraph>
          This is the most basic layout configuration with just header, content,
          and footer.
        </Typography.Paragraph>
      </Card>
    ),
  },
};
