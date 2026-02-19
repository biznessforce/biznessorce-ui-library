import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Button,
  Space,
  Typography,
  Card,
  Input,
  Select,
  DatePicker,
  Alert,
} from "antd";
import {
  formatDate,
  convertMinstoHrs,
  getFlagEmoji,
  firstLetterCaps,
  uuidv4,
  toggleFullScreen,
} from "./utils";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;

// Date formatter demo
function FormatDateDemo() {
  const [date, setDate] = useState(dayjs());
  const [format, setFormat] = useState("DD-MMM-YYYY");

  return (
    <Card title="formatDate">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>
          Format dates using Day.js with customizable format strings.
        </Paragraph>
        <DatePicker value={date} onChange={(val) => val && setDate(val)} />
        <Input
          placeholder="Format string"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          addonBefore="Format:"
        />
        <Alert
          message="Formatted Result"
          description={<Text code>{formatDate(date, format)}</Text>}
          type="success"
        />
        <Paragraph type="secondary">
          Common formats: DD-MMM-YYYY, YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY HH:mm
        </Paragraph>
      </Space>
    </Card>
  );
}

// Time converter demo
function ConvertMinsToHrsDemo() {
  const [minutes, setMinutes] = useState(125);

  return (
    <Card title="convertMinstoHrs">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>Convert minutes to hours and minutes format.</Paragraph>
        <Input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          addonBefore="Minutes:"
        />
        <Alert
          message="Converted Result"
          description={<Text code>{convertMinstoHrs(minutes)}</Text>}
          type="success"
        />
      </Space>
    </Card>
  );
}

// Flag emoji demo
function GetFlagEmojiDemo() {
  const [countryCode, setCountryCode] = useState("US");

  return (
    <Card title="getFlagEmoji">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>Convert country code to flag emoji.</Paragraph>
        <Select
          value={countryCode}
          onChange={setCountryCode}
          style={{ width: 200 }}
          options={[
            { value: "US", label: "United States" },
            { value: "GB", label: "United Kingdom" },
            { value: "IN", label: "India" },
            { value: "CA", label: "Canada" },
            { value: "AU", label: "Australia" },
            { value: "DE", label: "Germany" },
            { value: "FR", label: "France" },
            { value: "JP", label: "Japan" },
          ]}
        />
        <Alert
          message="Flag Emoji"
          description={
            <span style={{ fontSize: 48 }}>{getFlagEmoji(countryCode)}</span>
          }
          type="success"
        />
      </Space>
    </Card>
  );
}

// First letter caps demo
function FirstLetterCapsDemo() {
  const [text, setText] = useState("hello world");

  return (
    <Card title="firstLetterCaps">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>Capitalize the first letter of a string.</Paragraph>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <Alert
          message="Capitalized Result"
          description={<Text code>{firstLetterCaps(text)}</Text>}
          type="success"
        />
      </Space>
    </Card>
  );
}

// UUID generator demo
function UuidGeneratorDemo() {
  const [uuid, setUuid] = useState(uuidv4());

  return (
    <Card title="uuidv4">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>Generate a random UUID v4.</Paragraph>
        <Button type="primary" onClick={() => setUuid(uuidv4())}>
          Generate New UUID
        </Button>
        <Alert
          message="Generated UUID"
          description={
            <Space>
              <Text code>{uuid}</Text>
              <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(uuid)}
              >
                Copy
              </Button>
            </Space>
          }
          type="success"
        />
      </Space>
    </Card>
  );
}

// Fullscreen demo
function FullscreenDemo() {
  return (
    <Card title="toggleFullScreen">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>Toggle fullscreen mode for the entire page.</Paragraph>
        <Button type="primary" onClick={toggleFullScreen}>
          Toggle Fullscreen
        </Button>
        <Alert
          message="Note"
          description="Press ESC to exit fullscreen mode"
          type="info"
        />
      </Space>
    </Card>
  );
}

const meta: Meta = {
  title: "Utilities/Functions",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Utility Functions

A collection of helpful utility functions for common operations.

## Available Functions

### Date & Time
- **formatDate(date, format)**: Format dates using Day.js
- **convertMinstoHrs(minutes)**: Convert minutes to "Xh Ym" format

### String Manipulation
- **firstLetterCaps(str)**: Capitalize first letter
- **getFlagEmoji(countryCode)**: Get flag emoji from country code

### Generators
- **uuidv4()**: Generate random UUID v4

### Browser
- **toggleFullScreen()**: Toggle fullscreen mode

### Other
- **constructErrorMessage(error)**: Format error messages
- **removeEmptyProps(obj)**: Remove empty properties from object
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DateFormatter: Story = {
  render: () => <FormatDateDemo />,
};

export const TimeConverter: Story = {
  render: () => <ConvertMinsToHrsDemo />,
};

export const FlagEmoji: Story = {
  render: () => <GetFlagEmojiDemo />,
};

export const StringCapitalization: Story = {
  render: () => <FirstLetterCapsDemo />,
};

export const UUIDGenerator: Story = {
  render: () => <UuidGeneratorDemo />,
};

export const FullscreenToggle: Story = {
  render: () => <FullscreenDemo />,
};
