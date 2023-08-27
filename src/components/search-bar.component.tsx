import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div
      css={{
        border: "1px solid #404040",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        width: "80%",
        maxWidth: "400px",
        padding: "5px 10px",
        marginRight: "8px",
      }}
    >
      <AiOutlineSearch css={{ fontSize: "1.2em" }} />
      <input
        {...props}
        css={{
          color: "inherit",
          font: "inherit",
          marginRight: "2.5px",
          marginLeft: "2.5px",
          flex: 1,
          padding: "5px 2px",
          border: "none",
          background: "none",
          display: "block",
          outline: "none",
        }}
        placeholder="Search"
        aria-label="search"
      />
    </div>
  );
};

export default SearchBar;
