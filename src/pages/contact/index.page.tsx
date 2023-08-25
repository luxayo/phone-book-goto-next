import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import FloatingButton from "@components/floating-button.component";
import SearchBar from "@components/search-bar.component";
import {
  GetContactListQuery,
  useDeleteContactMutation,
  useGetContactListLazyQuery,
} from "@api/generated";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Contact = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const [getContact] = useGetContactListLazyQuery();

  const [removeContact, { loading, error }] = useDeleteContactMutation();

  const [phoneList, setPhoneList] = useState<GetContactListQuery | undefined>();
  const [phoneFavoriteList, setPhoneFavoriteList] = useState<number[]>([]);

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
    if (localStorage.getItem("favorite")) {
      const data = localStorage.getItem("favorite");
      if (data) {
        console.log("ambil fav");
        const favorite = JSON.parse(data) as number[];
        console.log(favorite);
        setPhoneFavoriteList(favorite);
      }
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

  const handleAddFavorite = (id: number) => {
    const favorite = [...phoneFavoriteList];
    favorite.push(id);
    setPhoneFavoriteList(favorite);
    console.log(favorite);
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };
  const handleRemoveFavorite = (id: number) => {
    const favorite = phoneFavoriteList;
    const filtered = favorite.filter((value) => value !== id);
    setPhoneFavoriteList(filtered);
    console.log(filtered);
    localStorage.setItem("favorite", JSON.stringify(filtered));
  };

  const handleDeleteContact = (id: number) => {
    removeContact({ variables: { id: id } })
      .then((response) => {
        const data = localStorage.getItem("phone");
        if (data) {
          const phone = JSON.parse(data) as GetContactListQuery;
          const filtered = phone.contact.filter((value) => value.id !== id);
          localStorage.setItem("phone", JSON.stringify({ contact: filtered }));
          setPhoneList({ contact: filtered });
        }
      })
      .catch((error) => alert(error.message));
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
        <p>Favorite</p>
        {phoneList && phoneFavoriteList.length > 0 ? (
          phoneList.contact
            .filter(
              (phone) =>
                phoneFavoriteList.includes(phone.id) &&
                (phone.first_name.toLowerCase().includes(search) ||
                  phone.last_name.toLowerCase().includes(search) ||
                  (phone.phones !== undefined
                    ? phone.phones.find((number) =>
                        number.number.includes(search)
                      )
                    : false))
            )
            .map((item, key) => (
              <div
                css={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                }}
                key={key}
              >
                <div
                  css={{
                    boxSizing: "border-box",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
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
                </div>
                <button onClick={() => handleRemoveFavorite(item.id)}>
                  <StarIcon />
                </button>
                <button onClick={() => handleDeleteContact(item.id)}>
                  <DeleteIcon />
                </button>
                <Divider />
              </div>
            ))
        ) : (
          <p> No Favorite Yet :&#40;</p>
        )}

        <p>Contact List</p>
        {phoneList ? (
          phoneList.contact
            .filter(
              (phone) =>
                !phoneFavoriteList.includes(phone.id) &&
                (phone.first_name.toLowerCase().includes(search) ||
                  phone.last_name.toLowerCase().includes(search) ||
                  (phone.phones !== undefined
                    ? phone.phones.find((number) =>
                        number.number.includes(search)
                      )
                    : false))
            )
            .map((item, key) => (
              <div
                css={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                }}
                key={key}
              >
                <div
                  css={{
                    boxSizing: "border-box",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
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
                </div>
                <button onClick={() => handleAddFavorite(item.id)}>
                  <StarOutlineIcon />
                </button>
                <button onClick={() => handleDeleteContact(item.id)}>
                  <DeleteIcon />
                </button>
                <Divider />
              </div>
            ))
        ) : (
          <p />
        )}

        <button onClick={handleLoadMoreButton}>Load More</button>
      </div>
      <FloatingButton onClick={handleAddContactButton} />
    </div>
  );
};

export default Contact;
