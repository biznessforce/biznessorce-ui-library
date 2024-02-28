import React, { FC } from "react";

import DEV_IMAGE_PATH from "../../assets/images/development.webp";
import USER_FIND_IMAGE_PATH from "../../assets/images/user-find.png";
import ERROR_IMAGE_PATH from "../../assets/images/service-error.png";

export const NO_DATA_CONTAINER_MESSAGES = {
  NO_DATA: {
    key: "nodata",
    title: "No resuls found",
    description:
      "Try adjusting your search or filter to find what your'e looking for!",
  },
  SELECT: {
    key: "select",
    title: "Select a record",
    description: "Please select a record to view details",
  },
  LOADING: {
    key: "loading",
    title: "Loading...",
    description: "Please wait while we load the data",
  },
  DEV: {
    key: "dev",
    title: "We're doing some work on this page",
    description: "We're making improvements to this page. Check back soon!",
  },
  ERROR: {
    key: "error",
    title: "Something went wrong",
    description: "We're working to fix the problem as soon as we can.",
  },
};

export type DATA_CONTAINER_TYPES =
  | "loading"
  | "error"
  | "nodata"
  | "select"
  | "dev";

type DataContainerProps = {
  type: DATA_CONTAINER_TYPES;
  title?: string;
  size?: "sm" | "md" | "lg";
  desc?: string;
  baseClass?: string;
  onClick?: () => void;
};

const DataContainer: FC<DataContainerProps> = ({
  type,
  title,
  desc,
  baseClass,
  size = "sm",
  onClick,
}) => {
  const SVGstyle: { width?: string } = {};

  SVGstyle.width =
    size === "sm"
      ? "120px"
      : size === "md"
      ? "150px"
      : type !== NO_DATA_CONTAINER_MESSAGES.DEV.key
      ? "unset"
      : "180px";

  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100 h-100 ${
        baseClass || ""
      }`}
    >
      <div className="not-found-container">
        <div
          className="not-found-image-container"
          style={{ textAlign: "center" }}
        >
          {type === NO_DATA_CONTAINER_MESSAGES.DEV.key ? (
            <img src={DEV_IMAGE_PATH} style={SVGstyle} alt={"development"} />
          ) : (
            <>
              {type === NO_DATA_CONTAINER_MESSAGES.ERROR.key && (
                <img
                  src={ERROR_IMAGE_PATH}
                  style={SVGstyle}
                  alt={"service-error"}
                />
              )}
            </>
          )}

          {type !== NO_DATA_CONTAINER_MESSAGES.ERROR.key &&
            type !== NO_DATA_CONTAINER_MESSAGES.DEV.key && (
              <img
                src={USER_FIND_IMAGE_PATH}
                style={{
                  width: "240px",
                  maxHeight: "100%",
                  height: "auto",
                  ...SVGstyle,
                }}
              />
            )}
        </div>

        <div className="py-10">
          <div className="message text-center">
            {/* Data Not Found Content */}
            {type === NO_DATA_CONTAINER_MESSAGES.NO_DATA.key && (
              <>
                <h3>{NO_DATA_CONTAINER_MESSAGES.NO_DATA.title}</h3>
                <p className="text-muted">
                  {desc || NO_DATA_CONTAINER_MESSAGES.NO_DATA.description}
                </p>
              </>
            )}
            {/* No data selected Content */}
            {type === NO_DATA_CONTAINER_MESSAGES.SELECT.key && (
              <>
                <h3>{title || NO_DATA_CONTAINER_MESSAGES.SELECT.title}</h3>
                <p className="text-muted">
                  {desc || NO_DATA_CONTAINER_MESSAGES.SELECT.description}
                </p>
              </>
            )}
            {/* Loading Content */}
            {type === NO_DATA_CONTAINER_MESSAGES.LOADING.key && (
              <>
                <h3>{NO_DATA_CONTAINER_MESSAGES.LOADING.title}</h3>
                <p className="text-muted">
                  {NO_DATA_CONTAINER_MESSAGES.LOADING.description}!
                </p>
              </>
            )}
            {/* Loading Content */}
            {type === NO_DATA_CONTAINER_MESSAGES.DEV.key && (
              <>
                <h3>{NO_DATA_CONTAINER_MESSAGES.DEV.title}</h3>
                <p className="text-muted">
                  {NO_DATA_CONTAINER_MESSAGES.DEV.description}
                </p>
              </>
            )}
            {/* Error Content */}
            {type === NO_DATA_CONTAINER_MESSAGES.ERROR.key && (
              <>
                {!desc ? (
                  <>
                    <h3>{NO_DATA_CONTAINER_MESSAGES.ERROR.title}</h3>
                    <p className="text-muted">
                      {NO_DATA_CONTAINER_MESSAGES.ERROR.description}
                    </p>
                  </>
                ) : (
                  <p className={"text-danger"}>{desc}</p>
                )}
                {onClick && (
                  <button className="btn btn-sm btn-primary" onClick={onClick}>
                    Retry
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataContainer;
