import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import FloatingButton from "@components/floating-button.component";
import SearchBar from "@components/search-bar.component";
import {
  useAddContactWithPhonesMutation,
  useGetContactListQuery,
} from "@api/generated";

const Home = () => {
  const router = useRouter();

  const { loading, error, data } = useGetContactListQuery();
  const [addTodo, { data: aDASD, loading: ASDSA, error: ASDASD }] =
    useAddContactWithPhonesMutation();

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
        <SearchBar />
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
        {data ? (
          data.contact.map((item, key) => (
            <div
              css={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
              }}
              key={key}
            >
              <div
                css={{
                  boxSizing: "border-box",
                }}
              >
                {item.first_name}
              </div>
              <div
                css={{
                  boxSizing: "border-box",
                }}
              >
                {item.phones[0].number}
              </div>
              <Divider />
            </div>
          ))
        ) : (
          <span />
        )}
      </div>
      <FloatingButton onClick={handleAddContactButton} />
    </div>
  );
};

export default Home;
