import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button, Space, Typography, Card, Input, Alert } from "antd";
import { useQueryParams } from "./useQueryParams";

const { Title, Paragraph, Text } = Typography;

// Demo component for query params
function QueryParamsDemo() {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams();
  const [paramName, setParamName] = useState("demo");
  const [paramValue, setParamValue] = useState("value");

  const currentValue = getQueryParam(paramName);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>URL Query Parameters Manager</Title>
      <Paragraph>
        Manage URL query parameters without page reload. Changes are reflected
        in the browser's address bar.
      </Paragraph>

      <Card title="Current URL">
        <Text code>{window.location.href}</Text>
      </Card>

      <Card title="Set Parameter">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Parameter name"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
            addonBefore="Name:"
          />
          <Input
            placeholder="Parameter value"
            value={paramValue}
            onChange={(e) => setParamValue(e.target.value)}
            addonBefore="Value:"
          />
          <Space>
            <Button
              type="primary"
              onClick={() => setQueryParam(paramName, paramValue)}
            >
              Set Parameter
            </Button>
            <Button danger onClick={() => removeQueryParam(paramName)}>
              Remove Parameter
            </Button>
          </Space>
        </Space>
      </Card>

      {currentValue && (
        <Alert
          message={`Current value of "${paramName}"`}
          description={<Text code>{currentValue}</Text>}
          type="info"
          showIcon
        />
      )}

      <Card title="Common Parameters">
        <Space wrap>
          <Button onClick={() => setQueryParam("page", "1")}>Set page=1</Button>
          <Button onClick={() => setQueryParam("sort", "asc")}>
            Set sort=asc
          </Button>
          <Button onClick={() => setQueryParam("filter", "active")}>
            Set filter=active
          </Button>
          <Button
            danger
            onClick={() => {
              removeQueryParam("page");
              removeQueryParam("sort");
              removeQueryParam("filter");
            }}
          >
            Clear All
          </Button>
        </Space>
      </Card>
    </Space>
  );
}

const meta: Meta = {
  title: "Hooks/useQueryParams",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# useQueryParams Hook

A hook for managing URL query parameters with React Router integration.

## Features
- Get query parameter values
- Set query parameters without page reload
- Remove query parameters
- TypeScript support
- React Router integration

## Usage

\`\`\`tsx
import { useQueryParams } from '@biznessforce/ui-lib';

function MyComponent() {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams();

  const page = getQueryParam('page');

  return (
    <div>
      <button onClick={() => setQueryParam('page', '2')}>
        Go to Page 2
      </button>
      <button onClick={() => removeQueryParam('page')}>
        Clear Page
      </button>
    </div>
  );
}
\`\`\`

## Methods

- **getQueryParam(name)**: Get the value of a query parameter
- **setQueryParam(name, value)**: Set a query parameter
- **removeQueryParam(name)**: Remove a query parameter
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InteractiveDemo: Story = {
  render: () => <QueryParamsDemo />,
};
