import React from "react";
import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 4,
          },
        }}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default preview;
