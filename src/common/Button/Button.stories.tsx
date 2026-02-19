import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "primary", "dashed", "link", "text"],
    },
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    danger: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Dashed: Story = {
  args: {
    type: "dashed",
    children: "Dashed Button",
  },
};

export const Loading: Story = {
  args: {
    type: "primary",
    loading: true,
    children: "Loading Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const Danger: Story = {
  args: {
    type: "primary",
    danger: true,
    children: "Danger Button",
  },
};

export const Large: Story = {
  args: {
    type: "primary",
    size: "large",
    children: "Large Button",
  },
};

export const Small: Story = {
  args: {
    type: "primary",
    size: "small",
    children: "Small Button",
  },
};
