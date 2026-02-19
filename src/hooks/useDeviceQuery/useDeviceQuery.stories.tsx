import type { Meta, StoryObj } from "@storybook/react";
import { Space, Typography, Card, Tag, Alert } from "antd";
import { useDeviceQuery } from "./useDeviceQuery";

const { Title, Paragraph, Text } = Typography;

// Demo component showing device detection
function DeviceQueryDemo() {
  const { isMobile, isTablet, isDesktop } = useDeviceQuery();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>Current Device Type</Title>
      <Paragraph>
        Resize your browser window to see the device type change in real-time.
      </Paragraph>

      <Card>
        <Space direction="vertical">
          <div>
            <Text strong>Mobile: </Text>
            <Tag color={isMobile ? "green" : "default"}>
              {isMobile ? "Yes" : "No"}
            </Tag>
          </div>
          <div>
            <Text strong>Tablet: </Text>
            <Tag color={isTablet ? "blue" : "default"}>
              {isTablet ? "Yes" : "No"}
            </Tag>
          </div>
          <div>
            <Text strong>Desktop: </Text>
            <Tag color={isDesktop ? "purple" : "default"}>
              {isDesktop ? "Yes" : "No"}
            </Tag>
          </div>
        </Space>
      </Card>

      <Card title="Responsive Content Example">
        {isMobile && (
          <Alert
            message="Mobile View"
            description="Optimized for small screens"
            type="info"
          />
        )}
        {isTablet && (
          <Alert
            message="Tablet View"
            description="Optimized for medium screens"
            type="success"
          />
        )}
        {isDesktop && (
          <Alert
            message="Desktop View"
            description="Optimized for large screens"
            type="warning"
          />
        )}
      </Card>
    </Space>
  );
}

const meta: Meta = {
  title: "Hooks/useDeviceQuery",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# useDeviceQuery Hook

A hook for detecting device type based on screen width. Useful for responsive design and conditional rendering.

## Features
- Real-time device type detection
- Mobile, tablet, and desktop breakpoints
- Window resize listener
- TypeScript support

## Usage

\`\`\`tsx
import { useDeviceQuery } from '@biznessforce/ui-lib';

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useDeviceQuery();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
\`\`\`

## Breakpoints

- **Mobile**: width < 768px
- **Tablet**: 768px ≤ width < 1024px
- **Desktop**: width ≥ 1024px
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LiveDemo: Story = {
  render: () => <DeviceQueryDemo />,
};
