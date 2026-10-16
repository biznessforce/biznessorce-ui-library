/**
 * Global Error Handling Alert
 */
import { Alert, Space, Typography } from "antd";
import React, { FC } from "react";
import { LEGACY_BOOTSTRAP } from "../legacyBootstrap";

// const connector = connect(
//   ({ config }) => ({
//     globalError: Object(config.globalError),
//   }),
//   { updateGlobalError }
// );

const GlobalErrorHandler: FC<{
  children: React.ReactNode | React.ReactNode[];
  globalError: { type: "success" | "danger"; msg: string };
  updateGlobalError: (value: undefined) => void;
}> = ({ children, globalError, updateGlobalError }) => {
  React.useEffect(() => {
    if (globalError.type === "success") {
      setTimeout(() => {
        updateGlobalError(undefined);
      }, 2000);
    }
  }, [globalError.type, updateGlobalError]);

  return (
    <>
      {children}
      {globalError && globalError?.msg && (
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="error-popup"
        >
          {globalError?.msg && (
            <Alert
              type={
                globalError?.type === "danger"
                  ? "error"
                  : globalError?.type || "error"
              }
              banner
              closable
              onClose={() => {
                setTimeout(() => {
                  updateGlobalError(undefined);
                }, 1000);
              }}
              title={
                <Space>
                  <Typography.Paragraph
                    style={{
                      maxWidth: "50rem",
                      marginBottom: 0,
                      color: LEGACY_BOOTSTRAP.danger,
                    }}
                    ellipsis
                  >
                    {globalError?.msg}
                  </Typography.Paragraph>
                </Space>
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default GlobalErrorHandler;
