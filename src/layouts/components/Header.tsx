import {
  ArrowLeftOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toggleFullScreen } from "../../common";
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
import { useHistory } from "react-router-dom";

const { Header: AntHeader } = Layout;

export type HeaderProps = {
  title: string;
  toolSlot: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onActivityClick: () => void;
  loggedUserName: string;
  dropdownMenu: MenuProps;
};

export function Header({
  title = "",
  toolSlot,
  showBackButton = false,
  onBackClick,
  onActivityClick,
  loggedUserName,
  dropdownMenu,
}: HeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory();

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
          {showBackButton && (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                onBackClick ? onBackClick() : history.goBack();
              }}
            />
          )}
          <Typography.Title level={5} className="mb-0 fw-medium">
            {title}
          </Typography.Title>
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
