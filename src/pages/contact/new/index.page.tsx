import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import FloatingButton from "@components/floating-button.component";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NewContact = () => {
  const router = useRouter();

  const handleAddContactButton = () => {
    router.push("/contact/new");
  };

  return (
    <div
      css={{
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingBottom: "10px",
          maxWidth: "800px",
        }}
      >
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <div
            css={{
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <ArrowBackIcon
              css={{
                fontSize: "2em",
              }}
            />
          </div>
        </div>
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            css={{
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <CheckIcon
              css={{
                fontSize: "2em",
              }}
            />
          </div>
        </div>
      </div>
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowX: "auto",
          maxWidth: "800px",
        }}
      >
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            css={{
              boxSizing: "border-box",
              width: "20%",
            }}
          >
            Lucio
          </div>
          <div
            css={{
              boxSizing: "border-box",
              width: "80%",
            }}
          >
            <input
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
        </div>
        <Divider />
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "pointer",
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
    </div>
  );
};

export default NewContact;
