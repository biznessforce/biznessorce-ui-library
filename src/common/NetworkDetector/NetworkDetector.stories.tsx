import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Space, Typography, Card, Tag, Alert } from "antd";
import { WifiOutlined, DisconnectOutlined } from "@ant-design/icons";
import NetworkDetector from "./NetworkDetector";

const { Title, Paragraph } = Typography;

// Demo wrapper component
function NetworkDetectorDemo() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  return (
    <NetworkDetector>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={4}>Network Detector Demo</Title>
        <Paragraph>
          This component monitors your network connection status in real-time.
        </Paragraph>

        <Card>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <strong>Current Status: </strong>
              <Tag
                icon={isOnline ? <WifiOutlined /> : <DisconnectOutlined />}
                color={isOnline ? "success" : "error"}
              >
                {isOnline ? "Online" : "Offline"}
              </Tag>
            </div>

            <Alert
              message="Try it yourself"
              description="Open your browser's DevTools (F12), go to the Network tab, and toggle 'Offline' mode to see the detector in action."
              type="info"
              showIcon
            />
          </Space>
        </Card>

        <Card title="Features">
          <ul>
            <li>Automatic network status detection</li>
            <li>Real-time updates when connection changes</li>
            <li>Visual notifications to users</li>
            <li>Prevents actions when offline</li>
          </ul>
        </Card>
      </Space>
    </NetworkDetector>
  );
}

const meta: Meta = {
  title: "Error Handling/NetworkDetector",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Network Detector

A component that monitors network connectivity and notifies users when they go offline or come back online.

## Features
- Real-time network status monitoring
- Automatic notifications
- Prevents user actions when offline
- Browser API integration

## Usage

\`\`\`tsx
import { NetworkDetector } from '@biznessforce/ui-lib';

function App() {
  return (
    <NetworkDetector>
      <YourApp />
    </NetworkDetector>
  );
}
\`\`\`

## How It Works

The component listens to the browser's \`online\` and \`offline\` events
and displays a notification when the network status changes.

## Testing

To test the network detector:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Toggle "Offline" mode
4. Watch the notification appear
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: () => <NetworkDetectorDemo />,
};
