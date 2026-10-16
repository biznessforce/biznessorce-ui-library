import { Col, Divider, Flex, Form, Row, Space, Typography } from "antd";
import React from "react";
import { LEGACY_BOOTSTRAP } from "../legacyBootstrap";

export const FormSectionHeader = ({
  title,
  titleComponent,
  leftAction,
  rightAction,
}: any) => {
  return (
    <Flex justify="space-between" style={{ width: "100%" }}>
      <Space size={"middle"}>
        {titleComponent ? titleComponent : <></>}
        {title && (
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
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
  formItemProps,
  span = 12,
}: any) => {
  return (
    <Col span={span}>
      <Form.Item
        label={label}
        name={name}
        {...formItemProps}
        style={{ marginBottom: 0, ...formItemProps?.style }}
      >
        {formElement}
      </Form.Item>
    </Col>
  );
};

export const FormHorColAlign = ({
  name,
  label,
  formElement,
  span = 12,
  elementSpan = 15,
}: any) => {
  const labelSpan = 24 - elementSpan - 1;
  return (
    <Col span={span} style={{ marginBottom: 16 }}>
      <Row align="middle">
        <Col span={labelSpan}>{label}</Col>
        <Col span={1}>:</Col>
        <Col span={elementSpan}>
          <Form.Item name={name} style={{ marginBottom: 0 }}>
            {formElement}
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

export const FormHorColView = ({
  label,
  colClassName,
  valueElement,
  span = 12,
  elementSpan = 15,
}: any) => {
  const labelSpan = 24 - elementSpan - 1;
  return (
    // Default was className "mb-3"; a consumer colClassName replaced it, so it must still be able to.
    <Col
      span={span}
      className={colClassName}
      style={colClassName === undefined ? { marginBottom: 16 } : undefined}
    >
      <Row align="middle">
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
  valueContainer?: React.JSX.Element;
  hideDivider?: boolean;
  flex?: boolean;
}) {
  return (
    <Col span={span} style={{ paddingInline: 8, paddingBlock: 0 }}>
      <div>
        {label && (
          <Typography.Text
            style={{
              textAlign: "left",
              padding: 4,
              color: LEGACY_BOOTSTRAP.muted,
            }}
          >
            {label}
          </Typography.Text>
        )}
        {!flex && <br />}

        {!valueContainer ? (
          <Typography.Text
            style={{
              textAlign: "left",
              padding: 4,
              color: textColor || LEGACY_BOOTSTRAP.body,
            }}
          >
            {value}
          </Typography.Text>
        ) : (
          <>{valueContainer}</>
        )}
        <br />
        {!hideDivider && (
          <Divider style={{ margin: "10px 0px", padding: 4, textAlign: "left" }} />
        )}
      </div>
    </Col>
  );
}
