import React, { FC, ReactNode } from "react";
import { Button as AntButton, ButtonProps } from "antd";

interface Props extends ButtonProps {
  children: ReactNode | ReactNode[];
}

const Button: FC<Props> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};

export default Button;
