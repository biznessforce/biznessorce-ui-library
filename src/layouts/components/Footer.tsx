import { formatDate } from "../../common";
import { Flex, Space, Typography, Layout } from "antd";
import React from "react";

const { Footer: AntFooter } = Layout;

export type FooterProps = {
  version: string;
  buildStamp: Date;
  rightTools?: { link: string; label: string }[];
};

export function Footer({
  version,
  buildStamp,
  rightTools = [],
}: FooterProps) {
  const today = new Date().getFullYear();

  const customFontSize = {
    fontSize: "0.80rem",
  };

  return (
    <AntFooter className="bg-white d-flex justify-content-between border px-3 py-1">
      <Flex gap={"small"}>
        <Typography.Text
          type="secondary"
          style={customFontSize}>
          &copy; {today.toString()}
        </Typography.Text>

        <Typography.Link
          className=""
          href="https://biznessforce.com"
          target="_blank"
          style={customFontSize}>
          Biznessforce
        </Typography.Link>

        <Typography.Text
          type="secondary"
          style={customFontSize}>
          - v{version} -
          {formatDate(buildStamp, "DD-MMM-YYYY HH:mm")}
        </Typography.Text>
      </Flex>

      <Space size={"middle"}>
        {rightTools.map((tools) => (
          <Typography.Link
            key={tools.label}
            className=""
            href={tools.link}
            style={customFontSize}>
            {tools.label}
          </Typography.Link>
        ))}
      </Space>
    </AntFooter>
  );
}

export default Footer;
