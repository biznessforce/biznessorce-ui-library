import { Col, Divider, Typography } from "antd";
import React from "react";

function FormColField({
  span,
  label,
  value,
  textColor,
  valueContainer,
  hideDivider,
  flex,
}: {
  span: number;
  label?: string;
  textColor?: string;
  value?: string | number | any;
  valueContainer?: JSX.Element;
  hideDivider?: boolean;
  flex?: boolean;
}) {
  return (
    <Col span={span} className="px-2 py-0">
      <div>
        {label && (
          <Typography.Text className="col text-left p-1 text-muted">
            {label}
          </Typography.Text>
        )}
        {!flex && <br />}

        {!valueContainer ? (
          <Typography.Text
            className={`col text-left p-1 font-weight-bold ${
              !textColor && "text-dark"
            } `}
            style={{ color: textColor && textColor }}
          >
            {value}
          </Typography.Text>
        ) : (
          <>{valueContainer}</>
        )}
        <br />
        {!hideDivider && (
          <Divider
            className="col text-left p-1 "
            style={{ margin: "10px 0px" }}
          />
        )}
      </div>
    </Col>
  );
}

export default FormColField;
