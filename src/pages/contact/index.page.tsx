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
import styled from "@emotion/styled";
import ContactCard from "@components/contact-card.component";
import { AiFillStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

export const ContactListContainer = styled.div`
  background-color: #1c1c1e;
  color: white;
  boxs-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 93vh;
  max-width: 500px;
`;

export const Button = styled.button`
  z-index: 500;
  background-color: #404040;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  margin: 8px 0;

  &:hover {
    background-color: #333333;
  }
`;

const Contact = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const [getContact] = useGetContactListLazyQuery();

  const [removeContact, { loading, error }] = useDeleteContactMutation();

  const [contactList, setContactList] = useState<
    GetContactListQuery | undefined
  >();
  const [contactFavoriteList, setContactFavoriteList] = useState<number[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("phone")) {
      console.log("baru");
      getContact({
        variables: { limit: limit, offset: offset },
      }).then((response) => {
        localStorage.setItem("phone", JSON.stringify(response.data));
        setContactList(response.data);
      });
    } else {
      console.log("ambil");
      const data = localStorage.getItem("phone");
      if (data) setContactList(JSON.parse(data));
    }
    if (localStorage.getItem("favorite")) {
      const data = localStorage.getItem("favorite");
      if (data) {
        console.log("ambil fav");
        const favorite = JSON.parse(data) as number[];
        console.log(favorite);
        setContactFavoriteList(favorite);
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
        contactList !== undefined &&
        contactList !== null &&
        response.data !== undefined
      ) {
        const temp = {
          contact: contactList.contact
            .concat(response.data.contact)
            .filter(function filterPhones(this: any, { id }) {
              var key = id;
              return !this.has(key) && this.add(key);
            }, new Set()),
        };
        localStorage.setItem("phone", JSON.stringify(temp));
        setContactList(temp);
      }
    });
  };

  const handleAddFavorite = (id: number) => {
    const favorite = [...contactFavoriteList];
    favorite.push(id);
    setContactFavoriteList(favorite);
    console.log(favorite);
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };
  const handleRemoveFavorite = (id: number) => {
    const favorite = contactFavoriteList;
    const filtered = favorite.filter((value) => value !== id);
    setContactFavoriteList(filtered);
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
          setContactList({ contact: filtered });
        }
      })
      .catch((error) => alert(error.message));
  };

  const contactSearchFilter = (contact: {
    __typename?: "contact" | undefined;
    created_at: any;
    first_name: string;
    id: number;
    last_name: string;
    phones: {
      __typename?: "phone" | undefined;
      number: string;
    }[];
  }) => {
    return (
      contact.first_name.toLowerCase().includes(search) ||
      contact.last_name.toLowerCase().includes(search) ||
      (contact.phones !== undefined
        ? contact.phones.find((number) => number.number.includes(search))
        : false)
    );
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
        paddingTop: "8px",
      }}
    >
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingBottom: "10px",
          maxWidth: "500px",
        }}
      >
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ContactListContainer>
        <p>Favorite</p>
        {contactList && contactFavoriteList.length > 0 ? (
          contactList.contact
            .filter(
              (contact) =>
                contactFavoriteList.includes(contact.id) &&
                contactSearchFilter(contact)
            )
            .map((contact, key) => (
              <ContactCard
                isFavorite
                key={contact.id}
                contact={contact}
                handleContactButton={handleContactButton}
                handleAddFavorite={handleAddFavorite}
                handleDeleteContact={handleDeleteContact}
                handleRemoveFavorite={handleRemoveFavorite}
                search={search}
              />
            ))
        ) : (
          <p> No Favorite Yet :&#40;</p>
        )}

        <p>Contact List</p>

        {contactList ? (
          contactList.contact
            .filter(
              (contact) =>
                !contactFavoriteList.includes(contact.id) &&
                contactSearchFilter(contact)
            )
            .map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                handleContactButton={handleContactButton}
                handleAddFavorite={handleAddFavorite}
                handleDeleteContact={handleDeleteContact}
                handleRemoveFavorite={handleRemoveFavorite}
                search={search}
              />
            ))
        ) : (
          <p> No Contact Yet :&#40;</p>
        )}
        <Button onClick={handleLoadMoreButton}>Load More Contact</Button>
      </ContactListContainer>

      <FloatingButton onClick={handleAddContactButton} />
    </div>
  );
};

export default Contact;
