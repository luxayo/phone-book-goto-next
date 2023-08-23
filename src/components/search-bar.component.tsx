import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div
      css={{
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "5px 10px",
      }}
    >
      <SearchIcon css={{ fontSize: "1.2em" }} />
      <input
        {...props}
        css={{
          font: "inherit",
          marginRight: "5px",
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
