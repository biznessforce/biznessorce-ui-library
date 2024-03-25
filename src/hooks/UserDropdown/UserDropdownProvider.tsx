import { constructErrorMessage } from "../../common";

import { Button, Form, Input, Modal } from "antd";
import { trim } from "lodash";
import { createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AxiosPromise } from "axios";
import React from "react";
import { useAPI } from "../useAPI";

export const UserDropdownContext = createContext({
  loggedUserName: null,
  dropdownMenu: { items: [] },
});

type DropdownProviderProps = {
  children: JSX.Element;
  account: { fullName: string; accountId: string };
  changePasswordAPI: () => AxiosPromise;
};

export const UserDropdownProvider = ({
  children,
  account,
  changePasswordAPI,
}: DropdownProviderProps) => {
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  function handleClose() {
    setShowPasswordChange(false);
    setStatus(null);
    form.resetFields();
  }

  const {
    onSubmit: createPassword,
    loading,
    submitted,
    status,
    setStatus,
  } = useAPI(
    changePasswordAPI,
    () => {
      setStatus({ type: "success", msg: "Change password completed" });
    },
    (e: any) => setStatus({ type: "error", msg: constructErrorMessage(e) })
  );

  const handleSubmit = () => {
    createPassword(
      account?.accountId,
      trim(form.getFieldValue("currentPassword")),
      trim(form.getFieldValue("confirmPassword"))
    );
  };

  const onSignOut = () => {
    history.push(`/logout?redirect=${location.pathname}`);
  };

  const items = [
    { key: "0", label: "My Profile" },
    {
      key: "1",
      label: "Change Password",
      onClick: () => setShowPasswordChange(true),
    },
    { key: "2", danger: true, label: "Sign Out", onClick: onSignOut },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contextValues: any = {
    loggedUserName: account?.fullName || "User",
    dropdownMenu: { items },
  };

  return (
    <UserDropdownContext.Provider value={contextValues}>
      {children}

      <Modal
        open={showPasswordChange}
        onCancel={handleClose}
        destroyOnClose={true}
        style={{ top: 0 }}
        width={600}
        title={"Change Password"}
        footer={
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={submitted}
              onClick={handleSubmit}
            >
              {loading && (
                <span className={"fa fa-spinner fa-spin font-size-sm"} />
              )}
              Submit
            </Button>
          </>
        }
      >
        <Form layout="vertical" form={form}>
          {status && (
            <div
              className={`mb-5 alert alert-${status?.type} alert-dismissible`}
            >
              <div className={"alert-text font-weight-bold"}>{status?.msg}</div>
            </div>
          )}
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Current Password is required" },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please Input Your Password" },
              {
                min: 7,
                message: "Password must be at least 7 characters",
              },
              {
                pattern: /(?=.*[A-Z])/,
                message: "Password must contain at least one uppercase letter",
              },
              {
                pattern: /(?=.*\d)/,
                message: "Password must contain at least one numeric digit",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "New Password and Confirm Password does not match"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </UserDropdownContext.Provider>
  );
};

export default UserDropdownProvider;
