import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Form, Input, Button, Space } from "antd";
import {
  FormSectionHeader,
  FormVerColAlign,
  FormHorColAlign,
  FormHorColView,
  FormColField,
} from "./FormComponents";

const meta: Meta = {
  title: "Common/Form Components",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const SectionHeader: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <FormSectionHeader title="Personal Information" />
      <FormSectionHeader title="Contact Details" />
      <FormSectionHeader title="Employment Information" />
    </Space>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <Form layout="vertical">
      <FormVerColAlign>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </FormVerColAlign>
      <FormVerColAlign>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </FormVerColAlign>
    </Form>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <Form>
      <FormSectionHeader title="User Details" />
      <FormHorColAlign>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="Enter email" />
        </Form.Item>
      </FormHorColAlign>
      <FormHorColAlign>
        <Form.Item label="First Name" name="firstName">
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="Enter last name" />
        </Form.Item>
      </FormHorColAlign>
    </Form>
  ),
};

export const ViewMode: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <FormSectionHeader title="Employee Information" />
      <FormHorColView>
        <FormColField label="Employee ID" value="EMP-001" />
        <FormColField label="Department" value="Engineering" />
      </FormHorColView>
      <FormHorColView>
        <FormColField label="Position" value="Senior Developer" />
        <FormColField label="Location" value="New York" />
      </FormHorColView>
      <FormHorColView>
        <FormColField label="Join Date" value="01-Jan-2020" />
        <FormColField label="Status" value="Active" />
      </FormHorColView>
    </Space>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <Form layout="vertical" style={{ maxWidth: 800 }}>
      <FormSectionHeader title="Personal Information" />
      <FormVerColAlign>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </FormVerColAlign>

      <FormSectionHeader title="Contact Information" />
      <FormHorColAlign>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone" />
        </Form.Item>
      </FormHorColAlign>

      <FormSectionHeader title="Address" />
      <Form.Item label="Street Address" name="address">
        <Input placeholder="Enter street address" />
      </Form.Item>
      <FormHorColAlign>
        <Form.Item label="City" name="city">
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item label="Postal Code" name="postalCode">
          <Input placeholder="Enter postal code" />
        </Form.Item>
      </FormHorColAlign>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  ),
};
