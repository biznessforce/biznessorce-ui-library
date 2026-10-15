import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Button, Space, Typography, Card, Input, Alert } from "antd";
import { useQueryParams } from "./useQueryParams";

const { Title, Paragraph, Text } = Typography;

// Demo component for query params
function QueryParamsDemo() {
  const query = useQueryParams();
  const navigate = useNavigate();
  const [paramName, setParamName] = useState("demo");
  const [paramValue, setParamValue] = useState("value");

  const updateParam = (value: string | null) => {
    const next = new URLSearchParams(query);
    if (value === null) next.delete(paramName);
    else next.set(paramName, value);
    navigate({ search: next.toString() });
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <Title level={4}>URL Query Parameters</Title>
      <Paragraph>
        <Text code>useQueryParams()</Text> returns the current location's{" "}
        <Text code>URLSearchParams</Text> and re-renders when the router location changes.
      </Paragraph>

      <Card size="small">
        <Space orientation="vertical" style={{ width: "100%" }}>
          <Input
            addonBefore="Name"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
          <Input
            addonBefore="Value"
            value={paramValue}
            onChange={(e) => setParamValue(e.target.value)}
          />
          <Space>
            <Button type="primary" onClick={() => updateParam(paramValue)}>
              Set
            </Button>
            <Button onClick={() => updateParam(null)}>Remove</Button>
          </Space>
        </Space>
      </Card>

      <Alert
        title={`Current value of "${paramName}"`}
        description={query.get(paramName) ?? "(not set)"}
        type="info"
        showIcon
      />
      <Text type="secondary">Search: ?{query.toString()}</Text>
    </Space>
  );
}

const meta: Meta = {
  title: "Hooks/useQueryParams",
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/?demo=value"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# useQueryParams Hook

Returns the current location's query string as \`URLSearchParams\` (memoised on
\`location.search\`). Must be rendered inside a react-router router.

## Usage

\`\`\`tsx
import { useQueryParams } from '@biznessforce/ui-lib';

function MyComponent() {
  const query = useQueryParams();
  const page = query.get('page');
  return <span>Page {page}</span>;
}
\`\`\`

To change the query string, navigate with the router (e.g. \`navigate({ search })\`).
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
