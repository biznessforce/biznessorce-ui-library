import type { Meta, StoryObj } from "@storybook/react";
import InfoFooter from "./InfoFooter";
import dayjs from "dayjs";

const meta: Meta<typeof InfoFooter> = {
  title: "Common/InfoFooter",
  component: InfoFooter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InfoFooter>;

export const SingleInfo: Story = {
  args: {
    info_1: {
      title: "Created by",
      userBy: "John Doe",
      date: dayjs("2024-01-15"),
    },
  },
};

export const DualInfo: Story = {
  args: {
    info_1: {
      title: "Created by",
      userBy: "John Doe",
      date: dayjs("2024-01-15"),
    },
    info_2: {
      title: "Modified by",
      userBy: "Jane Smith",
      date: dayjs("2024-02-10"),
    },
  },
};

export const WithoutDate: Story = {
  args: {
    info_1: {
      title: "Created by",
      userBy: "John Doe",
      date: null,
    },
  },
};

export const RecentModification: Story = {
  args: {
    info_1: {
      title: "Created by",
      userBy: "Alice Johnson",
      date: dayjs().subtract(30, "days"),
    },
    info_2: {
      title: "Last modified by",
      userBy: "Bob Wilson",
      date: dayjs().subtract(2, "hours"),
    },
  },
};
