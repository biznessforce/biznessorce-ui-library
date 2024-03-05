import React from "react";

const ProgressLine = ({
  visualParts = [{ percentage: "0%", color: "white" }],
  classes,
  styles,
}: any) => {
  return (
    <>
      <div
        className={classes}
        style={{ display: "flex", height: "5px", ...styles }}
      >
        {visualParts.map((item: any, index: number) => {
          return (
            <div
              key={index}
              style={{ width: item.percentage, backgroundColor: item.color }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProgressLine;
