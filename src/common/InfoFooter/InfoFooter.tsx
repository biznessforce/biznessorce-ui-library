import { Space, Typography } from "antd";
import { Moment } from "moment";
import React from "react";

type InfoFooterProps = {
  info_1: {
    title: string;
    date: Moment | null;
    userBy: string;
  };
  info_2?: {
    title: string;
    date: Moment | null;
    userBy: string;
  };
};

const InfoFooter = ({ info_1, info_2 }: InfoFooterProps) => {
  return (
    <>
      <div className="mb-5">
        <Space>
          <Typography.Text strong className="text-muted">
            {info_1.title}
          </Typography.Text>
          <Typography.Text strong>{info_1.userBy}</Typography.Text>
          {info_1.date && (
            <Typography.Text strong>
              on {info_1.date.format("DD-MMM-YYYY, h:mm a")}
            </Typography.Text>
          )}
        </Space>

        {info_2 && (
          <Space>
            <Typography.Text strong className="text-muted">
              {info_2.title}
            </Typography.Text>
            <Typography.Text strong>{info_2.userBy}</Typography.Text>
            {info_2.date && (
              <Typography.Text strong>
                on {info_2.date.format("DD-MMM-YYYY, h:mm a")}
              </Typography.Text>
            )}
          </Space>
        )}
      </div>
    </>
  );
};

export default InfoFooter;
