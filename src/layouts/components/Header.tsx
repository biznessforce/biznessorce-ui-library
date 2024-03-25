import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Space,
  Tooltip,
  Typography,
  theme,
} from "antd";
import React from "react";
import { toggleFullScreen } from "../../common";

const { Header: AntHeader } = Layout;

export type HeaderProps = {
  title: string | React.ReactNode;
  toolSlot: React.ReactNode;
  onActivityClick: () => void;
  loggedUserName: string;
  dropdownMenu: MenuProps;
};

export function Header({
  title = "",
  toolSlot,
  onActivityClick,
  loggedUserName,
  dropdownMenu,
}: HeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isFullScreen, setFullScreen] = React.useState(document.fullscreen);

  React.useEffect(() => {
    document.onfullscreenchange = () => setFullScreen(document.fullscreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AntHeader
      style={{
        padding: 0,
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Flex justify="space-between" align="center" className="h-100 w-100 px-4">
        <Space>
          {typeof title === "string" ? (
            <Typography.Title level={5} className="mb-0 fw-semibold">
              {title}
            </Typography.Title>
          ) : (
            <>{title}</>
          )}

          <Space className="ms-2">{toolSlot}</Space>
        </Space>
        <Space>
          <Tooltip title="Recent Activity" placement="bottom">
            <Button type="default" onClick={onActivityClick}>
              <Typography.Text>Recent Activity</Typography.Text>
            </Button>
          </Tooltip>
          <Tooltip
            title={isFullScreen ? "Exit Fullscreen" : "Expand to fullscreen"}
          >
            <Button
              icon={
                !isFullScreen ? (
                  <FullscreenOutlined />
                ) : (
                  <FullscreenExitOutlined />
                )
              }
              onClick={toggleFullScreen}
            />
          </Tooltip>
          <Dropdown menu={dropdownMenu} trigger={["click"]}>
            <Button type="text" style={{ height: "45px" }}>
              <Space>
                <Typography.Text>Hi, {loggedUserName}</Typography.Text>
                <Avatar>
                  <UserOutlined />
                </Avatar>
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </Flex>
    </AntHeader>
  );
}

export default Header;
