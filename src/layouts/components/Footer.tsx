import { formatDate } from "../../common";
import { Flex, Space, Typography, Layout, theme } from "antd";
import React from "react";
import { LEGACY_BOOTSTRAP } from "../../common/legacyBootstrap";

const { Footer: AntFooter } = Layout;

export type FooterProps = {
  version: string;
  buildStamp: Date;
  rightTools?: { link: string; label: string }[];
};

export function Footer({ version, buildStamp, rightTools = [] }: FooterProps) {
  const today = new Date().getFullYear();
  const { token } = theme.useToken();

  const customFontSize = {
    fontSize: "0.80rem",
  };

  return (
    <AntFooter
      style={{
        background: token.colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        border: `1px solid ${LEGACY_BOOTSTRAP.border}`,
        paddingInline: token.padding,
        paddingBlock: token.paddingXXS,
      }}
    >
      <Flex gap={"small"}>
        <Typography.Text type="secondary" style={customFontSize}>
          &copy; {today.toString()}
        </Typography.Text>

        <Typography.Link
          href="https://biznessforce.com"
          target="_blank"
          style={customFontSize}
        >
          Biznessforce
        </Typography.Link>

        <Typography.Text type="secondary" style={customFontSize}>
          - v{version} -{formatDate(buildStamp, "DD-MMM-YYYY HH:mm")}
        </Typography.Text>
      </Flex>

      <Space size={"middle"}>
        {rightTools.map((tools) => (
          <Typography.Link
            key={tools.label}
            href={tools.link}
            style={customFontSize}
          >
            {tools.label}
          </Typography.Link>
        ))}
      </Space>
    </AntFooter>
  );
}

export default Footer;
