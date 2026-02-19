import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Table, Input, Space, Typography, Card, Tag } from "antd";
import { COUNTRIES } from "../data";
import { getFlagEmoji } from "../Utils/utils";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

// Countries explorer component
function CountriesExplorer() {
  const [searchText, setSearchText] = useState("");

  const filteredCountries = COUNTRIES.filter((country) => {
    const search = searchText.toLowerCase();
    return (
      country.en_short_name.toLowerCase().includes(search) ||
      country.alpha_2_code.toLowerCase().includes(search) ||
      country.alpha_3_code.toLowerCase().includes(search) ||
      country.nationality.toLowerCase().includes(search)
    );
  });

  const columns = [
    {
      title: "Flag",
      dataIndex: "alpha_2_code",
      key: "flag",
      width: 60,
      render: (code: string) => (
        <span style={{ fontSize: 24 }}>{getFlagEmoji(code)}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "en_short_name",
      key: "en_short_name",
      sorter: (a: any, b: any) =>
        a.en_short_name.localeCompare(b.en_short_name),
    },
    {
      title: "Code",
      dataIndex: "alpha_2_code",
      key: "alpha_2_code",
      width: 80,
      render: (code: string) => <Tag>{code}</Tag>,
    },
    {
      title: "Dial Code",
      dataIndex: "dial_code",
      key: "dial_code",
      width: 100,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4}>Countries Dataset Explorer</Title>
      <Paragraph>
        Browse and search through the complete countries dataset. This data
        includes country names, codes, dial codes, and nationalities.
      </Paragraph>

      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Search
            placeholder="Search by name, code, dial code, or nationality"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
          />
          <Text type="secondary">
            Showing {filteredCountries.length} of {COUNTRIES.length} countries
          </Text>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredCountries}
        rowKey="code"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} countries`,
        }}
        scroll={{ y: 500 }}
      />

      <Card title="Usage Example">
        <Paragraph>
          <Text code>
            {`import { COUNTRIES } from '@biznessforce/ui-lib';

// Use in a Select component
<Select
  options={COUNTRIES.map(country => ({
    value: country.code,
    label: \`\${getFlagEmoji(country.code)} \${country.name}\`
  }))}
/>`}
          </Text>
        </Paragraph>
      </Card>
    </Space>
  );
}

const meta: Meta = {
  title: "Utilities/Countries Dataset",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Countries Dataset

A comprehensive dataset of countries with their codes, dial codes, and nationalities.

## Features
- 250+ countries
- ISO country codes
- International dial codes
- Nationality names
- Searchable and sortable

## Data Structure

Each country object contains:
- **name**: Country name
- **code**: ISO 3166-1 alpha-2 code
- **dial_code**: International dialing code
- **nationality**: Demonym/nationality

## Usage

\`\`\`tsx
import { COUNTRIES } from '@biznessforce/ui-lib';

// Find a country
const usa = COUNTRIES.find(c => c.code === 'US');

// Use in Select
<Select
  options={COUNTRIES.map(country => ({
    value: country.code,
    label: country.name
  }))}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Explorer: Story = {
  render: () => <CountriesExplorer />,
};
