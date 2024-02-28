import { CloseOutlined } from "@ant-design/icons";
import { firstLetterCaps } from "../../common";
import { Button, Drawer, DrawerProps, Typography } from "antd";
import { CSSProperties } from "react";
import useEzDrawer from "./useEzDrawer";
import React from "react";

const Ezdrawer = () => {
  const { visible, drawerContent, closeDrawer, drawerProps } = useEzDrawer();

  const { title, ...restProps } = drawerProps as DrawerProps;

  let closeButtonStyles: CSSProperties = {
    position: "absolute",
    top: 0,
  };

  if (restProps?.placement === "left") {
    closeButtonStyles = {
      ...closeButtonStyles,
      right: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  } else if (restProps?.placement === "right") {
    closeButtonStyles = {
      ...closeButtonStyles,
      left: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
  }

  const constructTitle = () => {
    if (typeof title === "string") {
      return (
        <Typography.Text
          className="mb-0 mr-4 mt-4"
          style={{ width: 250 }}
          ellipsis={{ tooltip: title }}
        >
          {firstLetterCaps(title)}
        </Typography.Text>
      );
    } else {
      return <div className="mt-4">{title}</div>;
    }
  };

  if (title) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    restProps["title"] = constructTitle();
  }

  return (
    <Drawer
      open={visible}
      onClose={closeDrawer}
      styles={{ body: { padding: "5px" } }}
      closable={false}
      {...restProps}
    >
      <Button
        type="primary"
        size="small"
        icon={<CloseOutlined />}
        onClick={closeDrawer}
        style={closeButtonStyles}
      />

      {drawerContent}
    </Drawer>
  );
};

export default Ezdrawer;
