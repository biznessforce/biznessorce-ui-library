import { get } from "lodash";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { EzDrawerContext } from "./EzdrawerProvider";

const useEzDrawer = () => {
  const { visible, closeDrawer, openDrawer, drawerContent, drawerProps } =
    useContext(EzDrawerContext);

  const dispatch = useDispatch();

  const openDispatchDrawer = (
    Component: React.ReactNode | React.JSX.Element,
    dispatchFunction: any,
    itemId: string,
    config: any
  ) => {
    dispatch(
      dispatchFunction(itemId, (data: any) => {
        // antd 6: destroyOnClose -> destroyOnHidden. Map a caller's legacy key so
        // destroyOnClose: false still wins over the default.
        const { destroyOnClose, ...drawerConfig } = config?.drawerConfig ?? {};
        const drawerProps = {
          placement: "right",
          destroyOnHidden: destroyOnClose ?? true,
          ...drawerConfig,
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
