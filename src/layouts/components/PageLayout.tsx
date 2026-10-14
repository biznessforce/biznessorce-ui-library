import { Layout as AntLayout } from "antd";
import React from "react";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";
import Subheader, { SubheaderProps } from "./Subheader";

const { Content } = AntLayout;

type PageLayoutProps = {
  children: JSX.Element;
  headerProps: HeaderProps;
  footerProps: FooterProps;
  subheaderProps: SubheaderProps & { showSubheader: boolean };
  bgColor?: string;
};

export function PageLayout({
  children,
  headerProps,
  footerProps,
  subheaderProps,
  bgColor,
}: PageLayoutProps) {
  return (
    <AntLayout style={{ marginLeft: 64 }}>
      <Header {...headerProps} />

      {/* Subheader */}
      {subheaderProps?.showSubheader && <Subheader {...subheaderProps} />}

      <AntLayout
        style={{
          padding: "18px 24px",
          backgroundColor: bgColor || "#ebeff3",
        }}
      >
        <Content>{children}</Content>
      </AntLayout>

      <Footer {...footerProps} />
    </AntLayout>
  );
}

export default PageLayout;
