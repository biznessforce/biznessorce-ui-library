import { CloudUploadOutlined, FileOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Space, Spin, Typography } from "antd";
import React, { useRef } from "react";

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
  const fileInputRef = useRef<any>(null);

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
      destroyOnClose={true}
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
          className="mb-5"
          message={error.msg}
          type={error.type as any}
          closable
        />
      )}
      <Typography.Text className={"py-2"}>
        {FILE_UPLOAD_MESSAGE}
      </Typography.Text>

      <div className={"content mt-2"}>
        <div
          className={
            "d-flex justify-content-center align-items-center border border-muted bg-light rounded-3 m-1"
          }
          style={{
            height: "180px",
            cursor: "pointer",
            borderStyle: "dashed !important",
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className={"text-center"}>
            {!selectedFile ? (
              <Space direction="vertical">
                <CloudUploadOutlined className="fs-3" />
                <Typography.Text>{DRAG_DROP_FILE_MESSAGE}</Typography.Text>
              </Space>
            ) : (
              <>
                <Space direction="vertical">
                  <FileOutlined className="fs-3" />
                  <Typography.Text>{selectedFile?.name}</Typography.Text>
                </Space>
              </>
            )}
            {errorMsg && (
              <Typography.Text className={"text-danger"}>
                {errorMsg}
              </Typography.Text>
            )}
            <input
              className={"file-input d-none"}
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
