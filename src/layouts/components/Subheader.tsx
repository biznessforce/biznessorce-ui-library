import { Flex, Layout, Space } from "antd";
import React, { JSX } from "react";

const { Header: AntHeader } = Layout;

export type SubheaderProps = {
  leftSlot?: JSX.Element;
  rightSlot?: JSX.Element;
  bgColor?: string;
};

export function Subheader({ leftSlot, rightSlot, bgColor }: SubheaderProps) {
  return (
    <AntHeader
      style={{
        padding: 0,
        height: "48px",
        lineHeight: "48px",
        background: bgColor || "#f5f7f9",
        borderTop: "1px solid #ebedf3",
        borderBottom: "1px solid #dadfe3",
        boxShadow: "0 2px 6px 0 rgba(0,0,0,.05)",
        position: "sticky",
        top: "64px",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Flex justify="space-between" align="center" className="px-4 w-100">
        <Space>{leftSlot}</Space>
        <Space>{rightSlot}</Space>
      </Flex>
    </AntHeader>
  );
}

export default Subheader;
