import React from "react";

const Divider = () => {
  return (
    <div
      css={{
        display: "flex",
        flexShrink: 0,
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "#333333",
        borderBottomWidth: "thin",
      }}
    />
  );
};

export default Divider;
