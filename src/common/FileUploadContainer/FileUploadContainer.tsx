import { CloudUploadOutlined, FileOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Space, Spin, Typography } from "antd";
import React, { useRef } from "react";
import { LEGACY_BOOTSTRAP } from "../legacyBootstrap";

export const FILE_UPLOAD_ACCEPT_FORMAT =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
export const FILE_UPLOAD_VALID_TYPES = ["text/csv", "application/vnd.ms-excel"];
export const INVLAID_FILE_TYPE_MESSAGE =
  "Invalid file type. Please upload a valid file.";
export const FILE_UPLOAD_MESSAGE = "Upload CSV file to import data's";
export const DRAG_DROP_FILE_MESSAGE =
  "Drag and drop file here or click to upload";

type FileImportTypes = {
  title: string;
  visible: boolean;
  isLoading: boolean;
  error: { type: "success" | "error"; msg: string };
  onCloseHandle: () => void;
  onSubmitHandle: (selectedFile: File) => void;
  accept?: string;
  validTypes?: string[];
  children?: React.ReactNode | React.ReactNode[];
};

const FileUploadContainer = ({
  onCloseHandle,
  onSubmitHandle,
  isLoading,
  error,
  accept = FILE_UPLOAD_ACCEPT_FORMAT,
  validTypes = FILE_UPLOAD_VALID_TYPES,
  ...props
}: FileImportTypes) => {
  const fileInputRef = useRef(undefined) as unknown as React.MutableRefObject<HTMLInputElement>;

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    return () => {
      setSelectedFile(null);
      setErrorMsg("");
    };
  }, []);

  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (validateFile(files[0])) {
      setErrorMsg("");
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
      setErrorMsg(INVLAID_FILE_TYPE_MESSAGE);
    }
  };

  const validateFile = (file: File): boolean => {
    return !validTypes?.length ? true : validTypes.indexOf(file?.type) !== -1;
  };

  const fileInputClicked = () => {
    fileInputRef?.current.click();
  };

  const fileSelected = () => {
    if (fileInputRef?.current.files) handleFiles(fileInputRef?.current.files);
  };

  const onSubmit = () => {
    if (selectedFile && validateFile(selectedFile))
      onSubmitHandle(selectedFile);
  };

  return (
    <Modal
      onCancel={onCloseHandle}
      style={{ top: 0 }}
      width={600}
      destroyOnHidden={true}
      open={props.visible}
      {...props}
      footer={
        <>
          <Button onClick={onCloseHandle} type="default">
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={
              !selectedFile ||
              !validateFile(selectedFile) ||
              error?.type === "success"
            }
            onClick={onSubmit}
            htmlType="submit"
          >
            <Space align="center">
              {isLoading && <Spin size="small" />}
              Submit
            </Space>
          </Button>
        </>
      }
    >
      {error && error.msg && (
        <Alert
          style={{ marginBottom: 48 }}
          title={error.msg}
          type={error.type as any}
          closable
        />
      )}
      <Typography.Text style={{ paddingBlock: 8 }}>
        {FILE_UPLOAD_MESSAGE}
      </Typography.Text>

      <div style={{ marginTop: 8 }}>
        <div
          style={{
            height: "180px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Bootstrap `.border` (!important, solid): the old inline "dashed !important" was invalid and never applied.
            border: `1px solid ${LEGACY_BOOTSTRAP.border}`,
            background: LEGACY_BOOTSTRAP.light,
            borderRadius: 8,
            margin: 4,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          {/* Icon, file name and validation message stacked vertically (user request 2026-10-16). */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              textAlign: "center",
            }}
          >
            {!selectedFile ? (
              <Space orientation="vertical">
                <CloudUploadOutlined style={{ fontSize: 28 }} />
                <Typography.Text>{DRAG_DROP_FILE_MESSAGE}</Typography.Text>
              </Space>
            ) : (
              <>
                <Space orientation="vertical">
                  <FileOutlined style={{ fontSize: 28 }} />
                  <Typography.Text>{selectedFile?.name}</Typography.Text>
                </Space>
              </>
            )}
            {errorMsg && (
              <Typography.Text
                style={{ color: LEGACY_BOOTSTRAP.danger }}
              >
                {errorMsg}
              </Typography.Text>
            )}
            <input
              style={{ display: "none" }}
              accept={accept}
              type={"file"}
              onChange={fileSelected}
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadContainer;
