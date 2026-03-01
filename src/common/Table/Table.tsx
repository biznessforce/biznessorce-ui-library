import { Table as AntTable } from "antd";
import React from "react";

export const Table = ({
  columns,
  dataSource,
  pagination,
  loading,
  scroll,
  ...props
}: any) => {
  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      loading={loading}
      scroll={scroll}
      {...props}
    />
  );
};
