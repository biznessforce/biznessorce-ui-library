import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Space, Typography, Card, Tag, Alert, Button } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import HasPermission from "./HasPermission";

const { Title, Paragraph, Text } = Typography;

// Demo component
function HasPermissionDemo() {
  const [userPermissions, setUserPermissions] = useState<string[]>([
    "read",
    "write",
  ]);

  const togglePermission = (permission: string) => {
    setUserPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>HasPermission Component Demo</Title>
      <Paragraph>
        Conditionally render components based on user permissions. Toggle
        permissions below to see how the component responds.
      </Paragraph>

      <Card title="Current Permissions">
        <Space wrap>
          {["read", "write", "delete", "admin"].map((permission) => (
            <Tag
              key={permission}
              color={userPermissions.includes(permission) ? "green" : "default"}
              icon={
                userPermissions.includes(permission) ? (
                  <UnlockOutlined />
                ) : (
                  <LockOutlined />
                )
              }
              style={{ cursor: "pointer" }}
              onClick={() => togglePermission(permission)}
            >
              {permission}
            </Tag>
          ))}
        </Space>
        <Paragraph type="secondary" style={{ marginTop: 16 }}>
          Click on a permission to toggle it
        </Paragraph>
      </Card>

      <Card title="Permission-Based Rendering">
        <Space direction="vertical" style={{ width: "100%" }}>
          <HasPermission
            permissions={["read"]}
            userPermissions={userPermissions}
          >
            <Alert
              message="Read Access"
              description="You can view this content because you have 'read' permission."
              type="info"
              showIcon
            />
          </HasPermission>

          <HasPermission
            permissions={["write"]}
            userPermissions={userPermissions}
          >
            <Alert
              message="Write Access"
              description="You can edit this content because you have 'write' permission."
              type="success"
              showIcon
            />
          </HasPermission>

          <HasPermission
            permissions={["delete"]}
            userPermissions={userPermissions}
          >
            <Alert
              message="Delete Access"
              description="You can delete this content because you have 'delete' permission."
              type="warning"
              showIcon
            />
          </HasPermission>

          <HasPermission
            permissions={["admin"]}
            userPermissions={userPermissions}
          >
            <Alert
              message="Admin Access"
              description="You have full administrative access!"
              type="error"
              showIcon
            />
          </HasPermission>
        </Space>
      </Card>

      <Card title="Multiple Permissions (AND)">
        <HasPermission
          permissions={["read", "write"]}
          userPermissions={userPermissions}
        >
          <Alert
            message="Full Editor Access"
            description="You can both read AND write because you have both permissions."
            type="success"
            showIcon
          />
        </HasPermission>
        {!userPermissions.includes("read") ||
        !userPermissions.includes("write") ? (
          <Alert
            message="Insufficient Permissions"
            description="You need both 'read' and 'write' permissions to see the editor."
            type="warning"
            showIcon
          />
        ) : null}
      </Card>

      <Card title="Action Buttons">
        <Space>
          <HasPermission
            permissions={["read"]}
            userPermissions={userPermissions}
          >
            <Button type="default">View</Button>
          </HasPermission>
          <HasPermission
            permissions={["write"]}
            userPermissions={userPermissions}
          >
            <Button type="primary">Edit</Button>
          </HasPermission>
          <HasPermission
            permissions={["delete"]}
            userPermissions={userPermissions}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </HasPermission>
        </Space>
      </Card>
    </Space>
  );
}

const meta: Meta = {
  title: "Permissions/HasPermission",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# HasPermission Component

A component for conditionally rendering content based on user permissions.
Useful for role-based access control (RBAC) in your application.

## Features
- Permission-based rendering
- Multiple permission checks (AND logic)
- TypeScript support
- Easy integration with auth systems

## Usage

\`\`\`tsx
import { HasPermission } from '@biznessforce/ui-lib';

function MyComponent() {
  const userPermissions = ['read', 'write'];

  return (
    <HasPermission permissions={['write']} userPermissions={userPermissions}>
      <Button>Edit</Button>
    </HasPermission>
  );
}
\`\`\`

## Props

- **permissions**: Array of required permissions
- **userPermissions**: Array of user's current permissions
- **children**: Content to render if user has permissions

## Logic

The component uses AND logic - the user must have ALL specified permissions
for the children to render.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InteractiveDemo: Story = {
  render: () => <HasPermissionDemo />,
};
