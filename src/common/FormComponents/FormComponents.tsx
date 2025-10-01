import {
  Col,
  Divider,
  Flex,
  Form,
  Row,
  Space,
  Typography,
} from "antd";
import React, { JSX } from "react";

export const FormSectionHeader = ({
  title,
  titleComponent,
  leftAction,
  rightAction,
}: any) => {
  return (
    <Flex
      justify="space-between"
      className="w-100">
      <Space size={"middle"}>
        {titleComponent ? titleComponent : <></>}
        {title && (
          <Typography.Title
            level={5}
            className="mb-0">
            {title}
          </Typography.Title>
        )}
        <Space>{leftAction}</Space>
      </Space>
      <Space>{rightAction}</Space>
    </Flex>
  );
};

export const FormVerColAlign = ({
  name,
  label,
  formElement,
  formItemProps = {},
  span = 12,
}: any) => {
  return (
    <Col span={span}>
      {label}
      <Form.Item
        name={name}
        className="mt-1 mb-0"
        {...formItemProps}>
        {formElement}
      </Form.Item>
    </Col>
  );
};

export const FormHorColAlign = ({
  name,
  label,
  formElement,
  formItemProps = {},
  span = 12,
  elementSpan = 15,
}: any) => {
  const labelSpan = 24 - elementSpan - 1;
  return (
    <Col
      span={span}
      className="mb-3">
      <Row className="d-flex align-items-center">
        <Col span={labelSpan}>{label}</Col>
        <Col span={1}>:</Col>
        <Col span={elementSpan}>
          <Form.Item
            name={name}
            className="mb-0"
            {...formItemProps}>
            {formElement}
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

export const FormHorColView = ({
  label,
  colClassName = "mb-3",
  valueElement,
  span = 12,
  elementSpan = 15,
}: any) => {
  const labelSpan = 24 - elementSpan - 1;
  return (
    <Col
      span={span}
      className={colClassName}>
      <Row className="d-flex align-items-center">
        <Col span={labelSpan}>{label}</Col>
        <Col span={1}>:</Col>
        <Col span={elementSpan}>{valueElement}</Col>
      </Row>
    </Col>
  );
};

export function FormColField({
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
    <Col
      span={span}
      className="px-2 py-0">
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
            style={{ color: textColor && textColor }}>
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
