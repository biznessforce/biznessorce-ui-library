import { Modal, Progress, Typography } from "antd";
import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

const TimeoutDialog = ({ timeoutSeconds }: { timeoutSeconds: number }) => (
  <>
    <Typography.Text className={"py-2"}>
      Your session is about to expire. Logging out in {timeoutSeconds}s seconds.
    </Typography.Text>

    <Progress
      type="line"
      percent={(timeoutSeconds / 30) * 100}
      strokeColor={twoColors}
      format={() => `${timeoutSeconds}s`}
    />
  </>
);

const EZIdleTimer: FC<{
  defaultTimeout: number;
  enabled: boolean;
  onLogout: () => void;
}> = ({ defaultTimeout, enabled, onLogout }) => {
  // console.log({ defaultTimeout, enabled });
  // const { closeDrawer } = useEzDrawer();

  // Set timeout values
  const timeout = defaultTimeout ? defaultTimeout * 60 * 1000 : 1000 * 60 * 60; // 1 hour
  //   const timeout = 1000 * 20 * 1; // 1 minute
  const promptTimeout = 1000 * 30; // 30 seconds

  // Modal open state
  const [open, setOpen] = useState(false);

  // Time before idle
  const [remaining, setRemaining] = useState(0);

  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt.
    // All events are disabled while the prompt is active.
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setOpen(true);
    setRemaining(promptTimeout);
  };

  const onIdle = () => {
    message(
      {
        action: "LOGOUT",
        message: "You have been idle for too long. Please log in again.",
      },
      true
    );
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    setOpen(false);
    setRemaining(0);
  };

  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()`
    // is true. Here you will also want to close your modal and perform
    // any active actions.
    setOpen(false);
    setRemaining(0);
  };

  const onMessage = (data: any) => {
    // closeDrawer(); // closing Drawer if any open before logging out
    onLogout();
  };

  const { getRemainingTime, isPrompted, activate, message } = useIdleTimer({
    timeout,
    promptBeforeIdle: promptTimeout,
    onPrompt,
    onIdle,
    onActive,
    onMessage,
    crossTab: true,
    disabled: !enabled,
  });

  const handleStillHere = () => {
    setOpen(false);
    activate();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log({ isPrompted: isPrompted() });
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime, isPrompted]);

  return (
    <Modal
      title="Session Timeout Notification"
      destroyOnClose={true}
      open={open}
      onCancel={handleStillHere}
      style={{ top: 0 }}
      footer={
        <>
          <button className="btn btn-sm btn-light mx-2" onClick={onIdle}>
            Logout
          </button>
          <button
            className="btn btn-sm btn-primary mx-2"
            onClick={handleStillHere}
          >
            Stay Connected
          </button>
        </>
      }
    >
      <TimeoutDialog timeoutSeconds={remaining} />
    </Modal>
  );
};

export default EZIdleTimer;
