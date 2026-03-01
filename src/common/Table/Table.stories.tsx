import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Common/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

export const Default: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
  },
};

export const Loading: Story = {
  args: {
    columns: columns,
    dataSource: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns,
    dataSource: [],
  },
};
