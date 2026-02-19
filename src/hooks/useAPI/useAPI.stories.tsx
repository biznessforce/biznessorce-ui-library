import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button, Space, Alert, Spin, Typography } from "antd";
import useAPI from "./useAPI";

const { Title, Paragraph, Text } = Typography;

// Mock API functions for demonstration
const mockSuccessAPI = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { message: "Success!", user: "John Doe" } }),
      1000,
    ),
  );

const mockErrorAPI = () =>
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject({
          response: {
            status: 500,
            data: { message: "Server error occurred" },
          },
        }),
      1000,
    ),
  );

const mockSlowAPI = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { message: "Slow response completed" } }),
      3000,
    ),
  );

// Demo component for useAPI hook
function UseAPIDemo() {
  const [result, setResult] = useState<any>(null);

  const { loading, status, onSubmit, setStatus } = useAPI(
    mockSuccessAPI,
    ({ resp }) => {
      setResult(resp.data);
      setStatus({ type: "success", msg: "Data loaded successfully!" });
    },
  );

  const handleClear = () => {
    setResult(null);
    setStatus(null);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>useAPI Hook Demo</Title>
      <Paragraph>
        Click the button below to trigger an API call. The hook manages loading
        states, success/error handling, and callbacks automatically.
      </Paragraph>

      <Space>
        <Button type="primary" onClick={onSubmit} loading={loading}>
          Fetch Data
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </Space>

      {loading && <Spin tip="Loading..." />}

      {status && (
        <Alert
          message={status.msg}
          type={status.type}
          showIcon
          closable
          onClose={() => setStatus(null)}
        />
      )}

      {result && (
        <Alert
          message="API Response"
          description={<pre>{JSON.stringify(result, null, 2)}</pre>}
          type="info"
        />
      )}
    </Space>
  );
}

// Error handling demo
function UseAPIErrorDemo() {
  const [result, setResult] = useState<any>(null);

  const { loading, status, onSubmit, setStatus } = useAPI(
    mockErrorAPI,
    ({ resp }) => {
      setResult(resp.data);
    },
    (errMsg) => {
      console.error("Error callback:", errMsg);
    },
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>Error Handling Demo</Title>
      <Paragraph>
        This demo shows how useAPI handles errors. Click to trigger a failed API
        call.
      </Paragraph>

      <Button type="primary" danger onClick={onSubmit} loading={loading}>
        Trigger Error
      </Button>

      {status && (
        <Alert
          message={status.msg}
          type={status.type}
          showIcon
          closable
          onClose={() => setStatus(null)}
        />
      )}
    </Space>
  );
}

// Global loader demo
function UseAPIGlobalLoaderDemo() {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState<{
    type: string;
    msg: string;
  } | null>(null);

  const { onSubmit } = useAPI(
    mockSlowAPI,
    () => {
      setGlobalError({ type: "success", msg: "Operation completed!" });
    },
    undefined,
    {
      showGlobalLoader: true,
      showGlobalError: true,
      onLoader: ({ isLoading }) => setGlobalLoading(isLoading),
      onThrowError: ({ type, msg }) => setGlobalError({ type, msg }),
    },
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>Global Loader Demo</Title>
      <Paragraph>
        This demo shows how to use global loader and error handlers. The hook
        can trigger application-wide loading states.
      </Paragraph>

      <Button type="primary" onClick={onSubmit} loading={globalLoading}>
        Fetch with Global Loader
      </Button>

      {globalLoading && (
        <Alert message="Global loading state active..." type="info" showIcon />
      )}

      {globalError && (
        <Alert
          message={globalError.msg}
          type={globalError.type as any}
          showIcon
          closable
          onClose={() => setGlobalError(null)}
        />
      )}
    </Space>
  );
}

const meta: Meta = {
  title: "Hooks/useAPI",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# useAPI Hook

A powerful hook for managing API calls with built-in loading states, error handling, and callbacks.

## Features
- Automatic loading state management
- Success and error callbacks
- Global loader integration
- Global error handler integration
- TypeScript support

## Usage

\`\`\`tsx
import { useAPI } from '@biznessforce/ui-lib';

const { loading, status, onSubmit, setStatus } = useAPI(
  APICall,
  successCallback,
  errorCallback,
  config
);
\`\`\`

## Parameters

- **APICall**: Function that returns an Axios promise
- **callback**: Success callback with response and setStatus
- **errCallback**: Error callback with error message
- **config**: Configuration object for global loader/error
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BasicUsage: Story = {
  render: () => <UseAPIDemo />,
};

export const ErrorHandling: Story = {
  render: () => <UseAPIErrorDemo />,
};

export const GlobalLoader: Story = {
  render: () => <UseAPIGlobalLoaderDemo />,
};
