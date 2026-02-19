import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Space, Typography, Card, Progress, Alert } from "antd";
import ProgressLine from "./ProgressLine";

const { Title, Paragraph } = Typography;

const meta: Meta<typeof ProgressLine> = {
  title: "Common/ProgressLine",
  component: ProgressLine,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    strokeColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressLine>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};

export const Complete: Story = {
  args: {
    percent: 100,
  },
};

export const CustomColor: Story = {
  args: {
    percent: 75,
    strokeColor: "#52c41a",
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Task Progress">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Paragraph>Planning Phase</Paragraph>
            <ProgressLine percent={100} strokeColor="#52c41a" />
          </div>
          <div>
            <Paragraph>Development Phase</Paragraph>
            <ProgressLine percent={65} strokeColor="#1890ff" />
          </div>
          <div>
            <Paragraph>Testing Phase</Paragraph>
            <ProgressLine percent={30} strokeColor="#faad14" />
          </div>
          <div>
            <Paragraph>Deployment Phase</Paragraph>
            <ProgressLine percent={0} strokeColor="#d9d9d9" />
          </div>
        </Space>
      </Card>
    </Space>
  ),
};
