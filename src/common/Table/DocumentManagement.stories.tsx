import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Table as AntTable,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Typography,
  Divider,
  Popconfirm,
  Tooltip,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  CloseOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// Import local components
import { Table } from "./Table";
import {
  FormSectionHeader,
  FormHorColAlign,
  FormVerColAlign,
  FormColField,
} from "../FormComponents";

const { Title, Text } = Typography;

const fullData = [
  {
    key: "1",
    createdBy: "amsadmin",
    createdTime: "2025-12-12T13:28:02.550Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2025-12-12T13:28:02.558Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "97e4b538-9a8a-4487-aae5-bd940eec4e1c",
    type: "Passport",
    docNo: "A08170406",
    validUntil: "2033-05-22",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "None",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "2",
    createdBy: "amsadmin",
    createdTime: "2025-12-12T13:28:02.590Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2025-12-12T13:28:02.602Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "ac403078-ac24-4301-a5fd-2f39af8ad9a8",
    type: "WorkPermit",
    docNo: "0 65046415",
    issuedDate: "2025-12-12",
    validUntil: "2027-11-26",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "None",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "3",
    createdBy: "amsadmin",
    createdTime: "2025-12-12T13:28:02.635Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2025-12-12T13:28:02.640Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "8f9c9682-c1d2-4444-b99a-fc3d3c99eb8c",
    type: "OPSOC",
    docNo: "1",
    validUntil: "2027-05-24",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "None",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "4",
    createdBy: "amsadmin",
    createdTime: "2026-02-17T11:18:54.594Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2026-02-17T11:18:54.600Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "09eef39a-0a9b-4508-acb7-b4ff14be8d2f",
    type: "Certificate",
    docNo: "B12560967",
    issuedDate: "2026-02-18",
    validUntil: "2027-03-11",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "None",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "5",
    createdBy: "amsadmin",
    createdTime: "2026-02-18T08:45:48.712Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2026-02-18T08:45:48.717Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "194e1d43-0e44-4617-9c97-26a11a01f1e4",
    type: "Certificate",
    docNo: "CERT001",
    issuedDate: "2026-02-05",
    validUntil: "2028-02-24",
    valNotReqd: true,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "None",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "6",
    createdBy: "amsadmin",
    createdTime: "2026-02-18T08:47:30.786Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2026-02-18T08:48:06.546Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "d9cbdc33-ca1b-422b-9d86-00a9f9da29e5",
    type: "CSOC",
    docNo: "CERT001",
    issuedDate: "2024-02-01",
    validUntil: "2026-02-17",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Expired", colorHex: "#ff5959" },
    alertLvl: "Escalate",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "7",
    createdBy: "amsadmin",
    createdTime: "2026-02-18T08:49:50.409Z",
    lastModifiedBy: "unknown",
    lastModTime: "2026-02-24T00:38:10.623Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "1eaba871-683b-4d00-8ab7-7a6d4a703552",
    type: "OPSOC",
    docNo: "OPSOC001",
    issuedDate: "2025-02-05",
    validUntil: "2026-02-28",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "Escalate",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "8",
    createdBy: "amsadmin",
    createdTime: "2026-02-18T08:53:09.415Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2026-02-18T08:53:09.422Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "835f8224-71b0-4077-8c8e-6c2bb6e322d1",
    type: "Passport",
    docNo: "PASS001",
    issuedDate: "2022-06-01",
    validUntil: "2026-03-20",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Valid", colorHex: "#2c5cc5" },
    alertLvl: "Warn",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
  {
    key: "9",
    createdBy: "amsadmin",
    createdTime: "2026-02-18T10:03:54.060Z",
    lastModifiedBy: "amsadmin",
    lastModTime: "2026-02-19T05:06:28.283Z",
    employeeId: "a6887681-80af-4a72-b19b-5c7385fa3549",
    docId: "2183c1e1-662f-46fc-bde8-27701d72a4c9",
    type: "CSOC",
    docNo: "CERT002",
    issuedDate: "2025-02-04",
    validUntil: "2026-02-18",
    valNotReqd: false,
    status: { name: "Valid", colorHex: "#2c5cc5" },
    valStatus: { name: "Expired", colorHex: "#ff5959" },
    alertLvl: "Escalate",
    employee: {
      idNo: "G8879318N",
      fullName: "Ali Md Mubarak",
      orgzAlias: "AMS Resources",
    },
  },
];

const meta: Meta<typeof Table> = {
  title: "Common/Table Patterns",
  component: Table,
  parameters: {
    layout: "padded",
  },
};

export default meta;

// --- Helper Components & Columns ---
const StatusTag = ({ status }: any) => (
  <Tag
    color={status?.colorHex || "#d9d9d9"}
    style={{
      borderRadius: "4px",
      border: "none",
      color: "#fff",
      fontWeight: 500,
    }}>
    {status?.name || "Unknown"}
  </Tag>
);

const formatDate = (date: string) =>
  date ? dayjs(date).format("DD-MMM-YYYY") : "";
const formatDateTime = (date: string) =>
  date ? dayjs(date).format("DD-MMM-YYYY HH:mm") : "";

const getSharedColumns = (
  isEditing: (r: any) => boolean,
  handlers: any,
) => [
  {
    title: "Doc Type/No",
    key: "docTypeNo",
    render: (_: any, r: any) => (
      <Space
        direction="vertical"
        size={0}>
        <Text
          strong
          style={{ color: "#1677ff" }}>
          {r.type}
        </Text>
        <Text
          type="secondary"
          style={{ fontSize: "12px" }}>
          {r.docNo}
        </Text>
      </Space>
    ),
  },
  {
    title: "Issued Date",
    dataIndex: "issuedDate",
    render: (t: string) => (
      <Text strong>{formatDate(t)}</Text>
    ),
  },
  {
    title: "Valid Until",
    dataIndex: "validUntil",
    render: (t: string) => (
      <Text strong>{formatDate(t)}</Text>
    ),
  },
  {
    title: "Status",
    dataIndex: "valStatus",
    render: (s: any) => <StatusTag status={s} />,
  },
  {
    title: "Alert",
    dataIndex: "alertLvl",
    render: () => (
      <SoundOutlined
        style={{ color: "#8c8c8c", fontSize: "18px" }}
      />
    ),
  },
  {
    title: "Last Modified By / Time",
    key: "modified",
    render: (_: any, r: any) => (
      <Space
        direction="vertical"
        size={0}>
        <Text strong>{r.lastModifiedBy}</Text>
        <Text
          type="secondary"
          style={{ fontSize: "12px" }}>
          {formatDateTime(r.lastModTime)}
        </Text>
      </Space>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    render: (_: any, r: any) => {
      const editing = isEditing(r);
      return editing ? (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handlers.onSave(r.key)}>
            Save
          </Button>
          <Button
            size="small"
            onClick={() => handlers.onCancel()}>
            Cancel
          </Button>
        </Space>
      ) : (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handlers.onEdit(r)}
            style={{ color: "#8c8c8c" }}
          />
          <Popconfirm
            title="Delete this document?"
            onConfirm={() => handlers.onDelete(r.key)}>
            <Button
              danger
              icon={<DeleteOutlined />}
              style={{ color: "#ff4d4f" }}
            />
          </Popconfirm>
        </Space>
      );
    },
  },
];

// --- 1. In-Cell Edit Pattern ---
export const InCellEdit: StoryObj<typeof Table> = {
  render: () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(fullData);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: any) =>
      record.key === editingKey;

    const handlers = {
      onEdit: (record: any) => {
        form.setFieldsValue({
          ...record,
          issuedDate: record.issuedDate
            ? dayjs(record.issuedDate)
            : null,
          validUntil: record.validUntil
            ? dayjs(record.validUntil)
            : null,
        });
        setEditingKey(record.key);
      },
      onCancel: () => {
        setEditingKey("");
        form.resetFields();
      },
      onSave: async (key: string) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex(
            (item) => item.key === key,
          );
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
              issuedDate:
                row.issuedDate?.format("YYYY-MM-DD"),
              validUntil:
                row.validUntil?.format("YYYY-MM-DD"),
              lastModTime: dayjs().toISOString(),
            });
            setData(newData);
            setEditingKey("");
          }
        } catch (errInfo) {
          console.log("Validate Failed:", errInfo);
        }
      },
      onDelete: (key: string) =>
        setData(data.filter((i) => i.key !== key)),
    };

    const columns = [
      {
        title: "Doc Type/No",
        key: "docTypeNo",
        render: (_: any, r: any) => (
          <Space
            direction="vertical"
            size={0}>
            <Text
              strong
              style={{ color: "#1677ff" }}>
              {r.type}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: "12px" }}>
              {r.docNo || "-"}
            </Text>
          </Space>
        ),
      },
      {
        title: "Issued Date",
        dataIndex: "issuedDate",
        render: (t: string) => (
          <Text strong>{formatDate(t) || "-"}</Text>
        ),
      },
      {
        title: "Valid Until",
        dataIndex: "validUntil",
        render: (t: string) => (
          <Text strong>{formatDate(t) || "-"}</Text>
        ),
      },
      {
        title: "Status",
        dataIndex: "valStatus",
        render: (s: any) => <StatusTag status={s} />,
      },
      {
        title: "Alert",
        render: () => (
          <SoundOutlined
            style={{ color: "#8c8c8c", fontSize: "18px" }}
          />
        ),
      },
      {
        title: "Last Modified By / Time",
        key: "modified",
        render: (_: any, r: any) => (
          <Space
            direction="vertical"
            size={0}>
            <Text strong>{r.lastModifiedBy}</Text>
            <Text
              type="secondary"
              style={{ fontSize: "12px" }}>
              {formatDateTime(r.lastModTime)}
            </Text>
          </Space>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        render: (_: any, r: any) => {
          const editing = isEditing(r);
          const disabled = !!editingKey && !editing;
          return (
            <Space>
              <Button
                disabled={disabled}
                icon={<EditOutlined />}
                onClick={() => handlers.onEdit(r)}
                type="default"
                size="small">
                Edit
              </Button>
              <Popconfirm
                title="Delete this document?"
                disabled={disabled}
                onConfirm={() => handlers.onDelete(r.key)}>
                <Button
                  disabled={disabled}
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                />
              </Popconfirm>
            </Space>
          );
        },
      },
    ];

    const expandedRowRender = (record: any) => {
      return (
        <div
          style={{
            background: "#fff",
            padding: "24px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
          }}>
          <Form
            form={form}
            layout="vertical">
            <Row gutter={24}>
              <FormVerColAlign
                label={
                  <Text strong>
                    <span style={{ color: "red" }}>*</span>{" "}
                    Doc Type
                  </Text>
                }
                name="type"
                span={8}
                formElement={
                  <Select
                    options={[
                      {
                        label: "Passport",
                        value: "Passport",
                      },
                      {
                        label: "Work Permit",
                        value: "WorkPermit",
                      },
                      { label: "CSOC", value: "CSOC" },
                      { label: "OPSOC", value: "OPSOC" },
                    ]}
                  />
                }
              />
              <FormVerColAlign
                label={
                  <Text strong>
                    <span style={{ color: "red" }}>*</span>{" "}
                    Doc No
                  </Text>
                }
                name="docNo"
                span={8}
                formElement={<Input placeholder="-" />}
              />
              <FormVerColAlign
                label={<Text strong>Issued Date</Text>}
                name="issuedDate"
                span={8}
                formElement={
                  <DatePicker style={{ width: "100%" }} />
                }
              />
            </Row>
            <Row
              gutter={24}
              style={{ marginTop: 16 }}>
              <FormVerColAlign
                label={<Text strong>Valid Until</Text>}
                name="validUntil"
                span={8}
                formElement={
                  <DatePicker style={{ width: "100%" }} />
                }
              />
              <FormVerColAlign
                label={<Text strong>Status</Text>}
                name={["valStatus", "name"]}
                span={8}
                formElement={
                  <Select
                    options={[
                      { label: "Valid", value: "Valid" },
                      {
                        label: "Expired",
                        value: "Expired",
                      },
                      {
                        label: "Expiring",
                        value: "Expiring",
                      },
                    ]}
                  />
                }
              />
              <Col
                span={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}>
                <Form.Item
                  name="valNotReqd"
                  valuePropName="checked"
                  style={{ margin: 0 }}>
                  <Space>
                    <Input type="checkbox" />{" "}
                    <Text>Do not Alert</Text>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify="end"
              style={{ marginTop: 24 }}>
              <Space>
                <Button
                  onClick={handlers.onCancel}
                  style={{ width: 100 }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    handlers.onSave(record.key)
                  }
                  style={{
                    width: 100,
                    background: "#1a3353",
                  }}>
                  Save
                </Button>
              </Space>
            </Row>
          </Form>
        </div>
      );
    };

    return (
      <Card
        title={
          <Space size="large">
            <Title
              level={4}
              style={{ margin: 0 }}>
              Documents{" "}
              <Tag
                color="error"
                style={{
                  borderRadius: "12px",
                  padding: "0 8px",
                  marginInlineStart: 4,
                }}>
                4
              </Tag>
            </Title>
            <Button
              icon={<PlusOutlined />}
              size="small"
              style={{ borderRadius: "4px" }}>
              + New Document
            </Button>
          </Space>
        }>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          expandable={{
            expandedRowRender,
            expandedRowKeys: editingKey ? [editingKey] : [],
            showExpandColumn: false,
          }}
        />
      </Card>
    );
  },
};

// --- 2. Modal Approach Pattern (The "Heavy" approach) ---
export const ModalApproach: StoryObj<typeof Table> = {
  render: () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(fullData);
    const [open, setOpen] = useState(false);
    const [editKey, setEditKey] = useState<string | null>(
      null,
    );

    const handleEdit = (record: any) => {
      form.setFieldsValue({
        ...record,
        issuedDate: record.issuedDate
          ? dayjs(record.issuedDate)
          : null,
        validUntil: record.validUntil
          ? dayjs(record.validUntil)
          : null,
      });
      setEditKey(record.key);
      setOpen(true);
    };

    const handleSave = async () => {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(
        (i) => i.key === editKey,
      );
      newData.splice(index, 1, {
        ...newData[index],
        ...row,
        issuedDate: row.issuedDate?.format("YYYY-MM-DD"),
        validUntil: row.validUntil?.format("YYYY-MM-DD"),
        lastModTime: new Date().toISOString(),
      });
      setData(newData);
      setOpen(false);
    };

    return (
      <Card title="Pattern 2: Modal (Overlay)">
        <Table
          dataSource={data}
          columns={getSharedColumns(() => false, {
            onEdit: handleEdit,
            onDelete: (key: any) =>
              setData(data.filter((i) => i.key !== key)),
          })}
          pagination={false}
        />

        <Modal
          title={<Title level={4}>Edit Document</Title>}
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleSave}
          width={600}
          okText="Update Document">
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: "24px" }}>
            <FormSectionHeader title="Document Details" />
            <Divider style={{ margin: "12px 0" }} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}>
              <FormVerColAlign
                label="Type"
                name="type"
                span={24}
                formElement={<Input />}
              />
              <FormVerColAlign
                label="Doc No"
                name="docNo"
                span={24}
                formElement={<Input />}
              />
              <FormVerColAlign
                label="Issued Date"
                name="issuedDate"
                span={24}
                formElement={
                  <DatePicker style={{ width: "100%" }} />
                }
              />
              <FormVerColAlign
                label="Valid Until"
                name="validUntil"
                span={24}
                formElement={
                  <DatePicker style={{ width: "100%" }} />
                }
              />
            </div>
          </Form>
        </Modal>
      </Card>
    );
  },
};

// --- 3. Inline Form Pattern (The "Context" approach) ---
export const InlineForm: StoryObj<typeof Table> = {
  render: () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(fullData);
    const [showForm, setShowForm] = useState(false);
    const [editKey, setEditKey] = useState<string | null>(
      null,
    );

    const handleEdit = (record: any) => {
      form.setFieldsValue({
        ...record,
        issuedDate: record.issuedDate
          ? dayjs(record.issuedDate)
          : null,
        validUntil: record.validUntil
          ? dayjs(record.validUntil)
          : null,
      });
      setEditKey(record.key);
      setShowForm(true);
    };

    const handleSave = async () => {
      const row = await form.validateFields();
      const newData = [...data];
      if (editKey) {
        const index = newData.findIndex(
          (i) => i.key === editKey,
        );
        newData.splice(index, 1, {
          ...newData[index],
          ...row,
          issuedDate: row.issuedDate?.format("YYYY-MM-DD"),
          validUntil: row.validUntil?.format("YYYY-MM-DD"),
          lastModifiedBy: "amsadmin",
          lastModTime: new Date().toISOString(),
        });
      } else {
        newData.unshift({
          ...row,
          key: Date.now().toString(),
          issuedDate: row.issuedDate?.format("YYYY-MM-DD"),
          validUntil: row.validUntil?.format("YYYY-MM-DD"),
          createdBy: "amsadmin",
          createdTime: new Date().toISOString(),
          lastModifiedBy: "amsadmin",
          lastModTime: new Date().toISOString(),
          valStatus: { name: "Valid", colorHex: "#2c5cc5" },
        });
      }
      setData(newData);
      handleClose();
    };

    const handleClose = () => {
      setShowForm(false);
      setEditKey(null);
      form.resetFields();
    };

    const columns = getSharedColumns(() => false, {
      onEdit: handleEdit,
      onDelete: (key: string) =>
        setData(data.filter((i) => i.key !== key)),
      onSave: () => {},
      onCancel: () => {},
    });

    return (
      <Card title="Pattern 3: Inline Form (Full UI)">
        {showForm ? (
          <div
            style={{
              background: "#f8f9fb",
              padding: "24px",
              borderRadius: "8px",
              border: "1px solid #e1e4e8",
              marginBottom: "24px",
            }}>
            <FormSectionHeader
              title={
                editKey
                  ? "Edit Document"
                  : "Add New Document"
              }
              rightAction={
                <Button
                  icon={<CloseOutlined />}
                  type="text"
                  onClick={handleClose}
                />
              }
            />
            <Divider style={{ margin: "16px 0" }} />
            <Form
              form={form}
              layout="vertical">
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "24px",
                  }}>
                  <FormVerColAlign
                    label="Document Type"
                    name="type"
                    span={24}
                    formElement={
                      <Select
                        options={[
                          {
                            label: "Passport",
                            value: "Passport",
                          },
                          {
                            label: "Work Permit",
                            value: "WorkPermit",
                          },
                          { label: "CSOC", value: "CSOC" },
                          {
                            label: "OPSOC",
                            value: "OPSOC",
                          },
                        ]}
                      />
                    }
                  />
                  <FormVerColAlign
                    label="Document Number"
                    name="docNo"
                    span={24}
                    formElement={
                      <Input placeholder="Enter document number" />
                    }
                  />
                  <FormVerColAlign
                    label="Issued Date"
                    name="issuedDate"
                    span={24}
                    formElement={
                      <DatePicker
                        style={{ width: "100%" }}
                      />
                    }
                  />
                  <FormVerColAlign
                    label="Valid Until"
                    name="validUntil"
                    span={24}
                    formElement={
                      <DatePicker
                        style={{ width: "100%" }}
                      />
                    }
                  />
                </div>

                <Space>
                  <Button
                    type="primary"
                    onClick={handleSave}
                    size="large"
                    style={{ paddingInline: "32px" }}>
                    {editKey
                      ? "Update Document"
                      : "Save Document"}
                  </Button>
                  <Button
                    onClick={handleClose}
                    size="large">
                    Cancel
                  </Button>
                </Space>
              </Space>
            </Form>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setShowForm(true)}
              style={{ borderRadius: "6px" }}>
              Add Document
            </Button>
          </div>
        )}

        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </Card>
    );
  },
};

// --- 4. Drill-Down Pattern ---
export const DrillDown: StoryObj<typeof Table> = {
  render: () => {
    const [view, setView] = useState<"list" | "edit">(
      "list",
    );
    const [selected, setSelected] = useState<any>(null);

    const handleEdit = (record: any) => {
      setSelected(record);
      setView("edit");
    };

    if (view === "edit") {
      return (
        <Card>
          <div style={{ marginBottom: 20 }}>
            <Button
              icon={<ArrowLeftOutlined />}
              type="link"
              onClick={() => setView("list")}
              style={{ padding: 0 }}>
              Back to Documents
            </Button>
          </div>

          <FormSectionHeader
            title={`Document: ${selected?.type || "New"}`}
            rightAction={
              <Space>
                <Button onClick={() => setView("list")}>
                  Cancel
                </Button>
                <Button type="primary">Save Changes</Button>
              </Space>
            }
          />
          <Divider />

          <Form layout="vertical">
            <div style={{ maxWidth: "800px" }}>
              <FormHorColAlign
                label="Doc Type"
                name="type"
                span={24}
                elementSpan={12}
                formElement={
                  <Input defaultValue={selected?.type} />
                }
              />
              <FormHorColAlign
                label="Doc No"
                name="docNo"
                span={24}
                elementSpan={12}
                formElement={
                  <Input defaultValue={selected?.docNo} />
                }
              />
              <FormHorColAlign
                label="Valid Until"
                name="validUntil"
                span={24}
                elementSpan={12}
                formElement={
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={
                      selected?.validUntil
                        ? dayjs(selected?.validUntil)
                        : null
                    }
                  />
                }
              />

              <div
                style={{
                  marginTop: "40px",
                  padding: "24px",
                  background: "#fafafa",
                  borderRadius: "8px",
                }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginTop: "16px",
                  }}>
                  <FormColField
                    label="Created By"
                    value={selected?.createdBy}
                    span={12}
                    hideDivider
                  />
                  <FormColField
                    label="Created Time"
                    value={formatDateTime(
                      selected?.createdTime,
                    )}
                    span={12}
                    hideDivider
                  />
                  <FormColField
                    label="Modified By"
                    value={selected?.lastModifiedBy}
                    span={12}
                    hideDivider
                  />
                  <FormColField
                    label="Modified Time"
                    value={formatDateTime(
                      selected?.lastModTime,
                    )}
                    span={12}
                    hideDivider
                  />
                </div>
              </div>
            </div>
          </Form>
        </Card>
      );
    }

    return (
      <Card
        title={
          <Title
            level={4}
            style={{ margin: 0 }}>
            Documents Library
          </Title>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleEdit({})}>
            Add
          </Button>
        }>
        <Table
          onRow={(r) => ({
            onClick: () => handleEdit(r),
            style: { cursor: "pointer" },
          })}
          dataSource={fullData}
          pagination={false}
          columns={getSharedColumns(() => false, {
            onEdit: handleEdit,
            onDelete: () => {},
            onSave: () => {},
            onCancel: () => {},
          })}
        />
      </Card>
    );
  },
};
