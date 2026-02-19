import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    version: "1.0.0",
    buildStamp: new Date("2026-02-17T12:00:00"),
    rightTools: [],
  },
};

export const WithRightTools: Story = {
  args: {
    version: "2.1.5",
    buildStamp: new Date("2026-02-17T15:30:00"),
    rightTools: [
      { link: "https://docs.biznessforce.com", label: "Documentation" },
      { link: "https://support.biznessforce.com", label: "Support" },
      { link: "https://status.biznessforce.com", label: "Status" },
    ],
  },
};

export const ProductionExample: Story = {
  args: {
    version: "3.2.1",
    buildStamp: new Date(),
    rightTools: [
      { link: "/privacy", label: "Privacy Policy" },
      { link: "/terms", label: "Terms of Service" },
      { link: "/help", label: "Help Center" },
    ],
  },
};
