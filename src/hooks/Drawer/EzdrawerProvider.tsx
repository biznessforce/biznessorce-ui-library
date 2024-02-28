import { DrawerProps } from "antd";
import React, { ReactNode, createContext, useCallback } from "react";

export const EzDrawerContext = createContext({
  visible: false,
  drawerProps: {},
  drawerContent: null,
  openDrawer: (
    drawerContent: ReactNode | ReactNode[],
    drawerProps: DrawerProps
  ) => null,
  closeDrawer: () => null,
});

const EzDrawerProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [visible, setVisible] = React.useState(false);
  const [drawerProps, setDrawerProps] = React.useState({});
  const [drawerContent, setDrawerContent] = React.useState<
    ReactNode | ReactNode[]
  >();

  const openDrawer = (
    drawerContent: ReactNode | ReactNode[],
    drawerProps: DrawerProps
  ) => {
    closeDrawer();
    setDrawerProps(drawerProps);
    setDrawerContent(drawerContent);
    setVisible(true);
  };
  const closeDrawer = () => setVisible(false);

  const contextValue: any = {
    visible,
    drawerContent,
    drawerProps,
    openDrawer: useCallback(
      (drawerContent: ReactNode | ReactNode[], drawerProps: DrawerProps) =>
        openDrawer(drawerContent, drawerProps),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    closeDrawer: useCallback(() => closeDrawer(), []),
  };

  return (
    <EzDrawerContext.Provider value={contextValue}>
      {children}
    </EzDrawerContext.Provider>
  );
};

export default EzDrawerProvider;
