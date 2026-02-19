import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import NoDataContainer from "./NoDataContainer";

const meta: Meta<typeof NoDataContainer> = {
  title: "Common/NoDataContainer",
  component: NoDataContainer,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NoDataContainer>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    description: "No employees found. Try adjusting your filters.",
  },
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: 600,
        height: 400,
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <NoDataContainer description="No data available for the selected date range" />
    </div>
  ),
};
