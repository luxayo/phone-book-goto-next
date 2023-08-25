import AddIcon from "@mui/icons-material/Add";
import React from "react";

const FloatingButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <div
      css={{
        display: "flex",
        margin: "0 auto",
        marginBottom: "50px",
        maxWidth: "700px",
        position: "absolute",
        justifyContent: "flex-end",
        top: "90%",
        zIndex: "1000",
        width: "85%",
      }}
    >
      <button
        {...props}
        aria-label="add"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          outline: "0",
          border: "0",
          margin: "0",
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: "middle",
          textDecoration: "none",
          borderRadius: "50%",
          padding: 0,
          width: "50px",
          height: "50px",
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          color: "white",
          backgroundColor: "black",
        }}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default FloatingButton;
