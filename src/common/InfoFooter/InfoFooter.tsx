import { Flex, Space, Typography } from "antd";
import { Dayjs } from "dayjs";
import React from "react";

type InfoFooterProps = {
  info_1: {
    title: string;
    date: Dayjs | null;
    userBy: string;
  };
  info_2?: {
    title: string;
    date: Dayjs | null;
    userBy: string;
  };
};

const InfoFooter = ({ info_1, info_2 }: InfoFooterProps) => {
  return (
    <>
      <Flex vertical className="my-3" gap={10}>
        <Space>
          <Typography.Text strong type="secondary">
            {info_1.title}
          </Typography.Text>
          <Typography.Text strong>{info_1.userBy}</Typography.Text>
          {info_1.date && (
            <Typography.Text strong>
              on {info_1.date.format("DD-MMM-YYYY, HH:mm")}
            </Typography.Text>
          )}
        </Space>

        {info_2 && (
          <Space>
            <Typography.Text strong type="secondary">
              {info_2.title}
            </Typography.Text>
            <Typography.Text strong>{info_2.userBy}</Typography.Text>
            {info_2.date && (
              <Typography.Text strong>
                on {info_2.date.format("DD-MMM-YYYY, HH:mm")}
              </Typography.Text>
            )}
          </Space>
        )}
      </Flex>
    </>
  );
};

export default InfoFooter;
