"use client";
import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import FloatingButton from "@components/floating-button.component";
import SearchBar from "@components/search-bar.component";
import {
  GetContactListQuery,
  useGetContactListLazyQuery,
} from "@api/generated";
import { useEffect, useState } from "react";

const Contact = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const [getContact, { loading, error }] = useGetContactListLazyQuery();

  const [phoneList, setPhoneList] = useState<GetContactListQuery | undefined>();

  useEffect(() => {
    if (!localStorage.getItem("phone")) {
      console.log("baru");
      getContact({
        variables: { limit: limit, offset: offset },
      }).then((response) => {
        localStorage.setItem("phone", JSON.stringify(response.data));
        setPhoneList(response.data);
      });
    } else {
      console.log("ambil");
      const data = localStorage.getItem("phone");
      if (data) setPhoneList(JSON.parse(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContactButton = (id: number) => {
    router.push(`/contact/${id}`);
  };

  const handleAddContactButton = () => {
    router.push("/contact/new");
  };

  const handleLoadMoreButton = () => {
    setOffset((prev) => prev + 1);
    getContact({
      variables: { limit: limit, offset: offset },
    }).then((response) => {
      if (
        phoneList !== undefined &&
        phoneList !== null &&
        response.data !== undefined
      ) {
        const temp = {
          contact: phoneList.contact
            .concat(response.data.contact)
            .filter(function filterPhones(this: any, { id }) {
              var key = id;
              return !this.has(key) && this.add(key);
            }, new Set()),
        };
        localStorage.setItem("phone", JSON.stringify(temp));
        setPhoneList(temp);
      }
    });
  };

  const renderPhoneNumber = (
    phones: {
      __typename?: "phone" | undefined;
      number: string;
    }[]
  ) => {
    if (phones !== undefined) {
      return phones.map((number, key) => <div key={key}>{number.number}</div>);
    }
    return <span>No Phone Number</span>;
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
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "auto",
          maxHeight: "92vh",
          maxWidth: "800px",
        }}
      >
        {phoneList ? (
          phoneList.contact
            .filter(
              (phone) =>
                phone.first_name.toLowerCase().includes(search) ||
                phone.last_name.toLowerCase().includes(search) ||
                (phone.phones !== undefined
                  ? phone.phones.find((number) =>
                      number.number.includes(search)
                    )
                  : false)
            )
            .map((item, key) => (
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
                  {renderPhoneNumber(item.phones)}
                </div>
                <Divider />
              </div>
            ))
        ) : (
          <span />
        )}

        <button onClick={handleLoadMoreButton}>Load More</button>
      </div>
      <FloatingButton onClick={handleAddContactButton} />
    </div>
  );
};

export default Contact;
