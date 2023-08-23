import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const handleAddContactButton = () => {
    // router.push("/contact/new");
  };

  return (
    <div
      css={{
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "800px",
      }}
    >
      <div
        css={{
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingBottom: "10px",
        }}
      >
        <div
          css={{
            border: "1px solid black",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "2% 3%",
          }}
        >
          <input
            css={{
              font: "inherit",
              marginRight: "5px",
              flex: 1,
              padding: "5px 2px",
              border: 0,
              background: "none",
              display: "block",
            }}
            placeholder="Search"
            aria-label="search"
          />
          <SearchIcon css={{ fontSize: "1.2em" }} />
        </div>
      </div>
      <div
        css={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            css={{
              boxSizing: "border-box",
            }}
          >
            Lucio
          </div>
          <div
            css={{
              boxSizing: "border-box",
            }}
          >
            0821
          </div>
        </div>
        <div
          css={{
            display: "flex",
            flexShrink: 0,
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "rgba(0,0,0,0.12)",
            borderBottomWidth: "thin",
          }}
        />
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            css={{
              boxSizing: "border-box",
            }}
          >
            Lucio
          </div>
          <div
            css={{
              boxSizing: "border-box",
            }}
          >
            0821
          </div>
        </div>
      </div>
      <button
        aria-label="add"
        onClick={handleAddContactButton}
        css={{
          display: "inline-flex",
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
          transition:
            "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderRadius: "50%",
          padding: 0,
          width: "60px",
          height: "60px",
          zIndex: "1050",
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          color: "white",
          backgroundColor: "#1976d2",
          position: "absolute",
          right: 15,
          bottom: 15,
        }}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default Home;
