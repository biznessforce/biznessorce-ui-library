import { hasPermissions } from "../../common";
import { Image, Layout, Menu } from "antd";
import { isBoolean, omit } from "lodash";
// import { useState } from "react";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";

const { Sider } = Layout;

type SidebarMenu = {
  key: string;
  label: string;
  icon: JSX.Element; // Assuming you are using JSX elements for icons
  title: string;
  permission: boolean | string[];
  children: OmittedPermissionSidebarMenu;
};

type SidebarMenuProps = {
  [key in string]: SidebarMenu;
};

type OmittedPermissionSidebarMenu = Omit<
  SidebarMenuProps[keyof SidebarMenuProps],
  "permission"
>;

type ReturnTypeGetItems = OmittedPermissionSidebarMenu[];

const getItems = (
  accPermission: string[],
  SidebarMenus: SidebarMenuProps,
  SUPER_ADMIN: string | null
): ReturnTypeGetItems => {
  return Object.values(SidebarMenus).flatMap((menu) => {
    if (
      Array.isArray(menu.permission) &&
      hasPermissions(menu.permission, accPermission, SUPER_ADMIN)
    ) {
      return [omit(menu, ["permission"])] as OmittedPermissionSidebarMenu[];
    } else if (isBoolean(menu.permission) && menu.permission) {
      return [omit(menu, ["permission"])] as OmittedPermissionSidebarMenu[];
    } else {
      return [] as OmittedPermissionSidebarMenu[];
    }
  });
};

export type SidebarProps = {
  menus: SidebarMenuProps;
  authorities: string[];
  SUPER_ADMIN: string | null;
  logoBgColor?: string;
  logo?: string;
};

export function Sidebar({
  menus,
  logoBgColor,
  authorities,
  SUPER_ADMIN,
  logo,
}: SidebarProps) {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = React.useState<string>("dashboard");

  useEffect(() => {
    const path = window.location.pathname.split("/");
    setSelectedMenu(path[1]);
  }, []);

  return (
    <Sider
      className="sidebar-menus"
      width={"64px"}
      collapsed
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        className="demo-logo-vertical d-flex justify-content-center align-items-center"
        style={{ height: "64px", background: logoBgColor || "#002140" }}
      >
        {logo && <Image src={logo} alt="logo" preview={false} />}
      </div>
      <Menu
        theme="dark"
        selectable
        selectedKeys={[selectedMenu]}
        onSelect={({ key }) => {
          setSelectedMenu(key);
          history.push(`/${key}`);
        }}
        mode="inline"
        items={getItems(authorities, menus, SUPER_ADMIN)}
      />
    </Sider>
  );
}

export default Sidebar;
