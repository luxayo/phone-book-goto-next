import { AiOutlinePlus } from "react-icons/ai";
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
        maxWidth: "450px",
        position: "absolute",
        justifyContent: "flex-end",
        top: "85%",
        width: "85%",
      }}
    >
      <button
        {...props}
        aria-label="add"
        css={{
          zIndex: "1000",
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
          backgroundColor: "#404040",
          "&:hover": {
            backgroundColor: "#333333",
          },
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default FloatingButton;
