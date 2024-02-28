import { Button, Result } from "antd";
import React, { FC } from "react";

const PageNotFound: FC<{ onBackClick: () => void }> = ({ onBackClick }) => {
  return (
    <Result
      className="w-100 h-100"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={onBackClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
