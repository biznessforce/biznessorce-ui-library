import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button, Space, Typography, Card, Alert } from "antd";
import ErrorBoundaries from "./ErrorBoundaries";

const { Title, Paragraph } = Typography;

// Component that throws an error
function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("This is a simulated error!");
  }
  return <Alert message="Component is working fine!" type="success" />;
}

// Demo component
function ErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setShouldThrow(false);
    setKey((prev) => prev + 1);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>Error Boundary Demo</Title>
      <Paragraph>
        Error boundaries catch JavaScript errors in child components and display
        a fallback UI instead of crashing the entire application.
      </Paragraph>

      <Card>
        <Space>
          <Button type="primary" danger onClick={() => setShouldThrow(true)}>
            Trigger Error
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Card>

      <Card title="Protected Component">
        <ErrorBoundaries key={key}>
          <BuggyComponent shouldThrow={shouldThrow} />
        </ErrorBoundaries>
      </Card>

      <Alert
        message="How it works"
        description={
          <ul>
            <li>Click "Trigger Error" to simulate a component error</li>
            <li>
              The Error Boundary catches the error and shows a fallback UI
            </li>
            <li>Click "Reset" to restore the component</li>
            <li>The rest of the application continues to work normally</li>
          </ul>
        }
        type="info"
      />
    </Space>
  );
}

const meta: Meta = {
  title: "Error Handling/ErrorBoundary",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Error Boundary

A React error boundary component that catches JavaScript errors in child components
and displays a fallback UI instead of crashing the entire application.

## Features
- Catches errors in child components
- Displays user-friendly error message
- Prevents entire app from crashing
- Logs errors for debugging

## Usage

\`\`\`tsx
import { ErrorBoundaries } from '@biznessforce/ui-lib';

function App() {
  return (
    <ErrorBoundaries>
      <YourComponent />
    </ErrorBoundaries>
  );
}
\`\`\`

## Best Practices

1. Wrap route components with error boundaries
2. Use multiple boundaries for different sections
3. Log errors to error tracking service
4. Provide helpful error messages to users
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InteractiveDemo: Story = {
  render: () => <ErrorBoundaryDemo />,
};
