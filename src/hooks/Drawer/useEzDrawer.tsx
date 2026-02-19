import { get } from "lodash";
import { JSX, useContext } from "react";
import { useDispatch } from "react-redux";
import { EzDrawerContext } from "./EzdrawerProvider";

const useEzDrawer = () => {
  const { visible, closeDrawer, openDrawer, drawerContent, drawerProps } =
    useContext(EzDrawerContext);

  const dispatch = useDispatch();

  const openDispatchDrawer = (
    Component: React.ReactNode | JSX.Element,
    dispatchFunction: any,
    itemId: string,
    config: any
  ) => {
    dispatch(
      dispatchFunction(itemId, (data: any) => {
        const drawerProps = {
          placement: "right",
          destroyOnClose: true,
          ...config?.drawerConfig,
        };

        if (config?.titleKey) {
          drawerProps.title = get(data, config.titleKey);
        }

        openDrawer(Component, { ...drawerProps });
      })
    );
  };

  return {
    visible,
    closeDrawer,
    openDrawer,
    openDispatchDrawer,
    drawerContent,
    drawerProps,
  };
};

export default useEzDrawer;
