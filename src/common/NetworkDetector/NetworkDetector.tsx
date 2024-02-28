import { Alert, Space, Typography } from "antd";
import React, { FC, ReactNode } from "react";

type NetworkDetectorProps = {
  children: ReactNode | ReactNode[];
};

/**
 * Network Detector Handling Alert
 */
const NetworkDetector: FC<NetworkDetectorProps> = ({ children }) => {
  const [state, setState] = React.useState({
    status: false,
    type: "online",
  });

  React.useEffect(() => {
    const handleConnectionChange = (event: { type: string }) => {
      if (event.type === "offline") {
        setState({ status: true, type: "offline" });
      }

      if (event.type === "online") {
        setState({ ...state, status: true, type: "online" });
        setTimeout(() => {
          const element: HTMLElement | null =
            document.querySelector(".error-popup");
          if (element) element["style"].top = "0px";
          setState({ ...state, status: false, type: "online" });
        }, 1000);
      }
    };
    window.addEventListener("offline", handleConnectionChange);
    window.addEventListener("online", handleConnectionChange);
  }, [state]);

  return (
    <>
      {children}
      {state.status && (
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "30rem",
            height: "40px",
            zIndex: 1401,
            borderRadius: "3px",
          }}
          className={`offline-popup d-flex justify-content-center align-items-center`}
        >
          <Alert
            type={state.type === "online" ? "success" : "warning"}
            message={
              state.type === "offline" ? (
                <Space>
                  <Typography.Text strong>Connection Lost</Typography.Text>
                  <Typography.Text>
                    Your'e not connected to Internet
                  </Typography.Text>
                </Space>
              ) : (
                <Space>
                  <Typography.Text strong>Back to Online</Typography.Text>
                  <Typography.Text>
                    Your'e connected to Internet
                  </Typography.Text>
                </Space>
              )
            }
            banner
          />
        </div>
      )}
    </>
  );
};

export default NetworkDetector;
