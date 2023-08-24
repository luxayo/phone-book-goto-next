import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import FloatingButton from "@components/floating-button.component";
import SearchBar from "@components/search-bar.component";
import { useGetContactListQuery } from "@api/generated";
import { useEffect, useState } from "react";
import { usePhoneList } from "@/lib/local-storage.lib";

const Contact = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { loading, error, data, refetch } = useGetContactListQuery({
    variables: {
      limit: limit,
      offset: offset,
    },
  });

  const [phoneList, setPhoneList] = usePhoneList();

  useEffect(() => {
    if (data) {
      if (phoneList) {
        setPhoneList((prev) => prev?.contact.concat(data));
      } else {
        setPhoneList(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleContactButton = (id: number) => {
    router.push(`/contact/${id}`);
  };

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
              onClick={() => handleContactButton(item.id)}
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

export default Contact;
