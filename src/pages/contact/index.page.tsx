import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import {
  GetContactListQuery,
  useDeleteContactMutation,
  useGetContactListLazyQuery,
} from "@api/generated";
import FloatingButton from "@components/floating-button.component";
import SearchBar from "@components/search-bar.component";
import ContactCard from "@components/contact-card.component";
import LoadingModal from "@components/loading-modal.component";
import ConfirmationModal from "@components/confirmation-modal.component";

const BaseContainer = css({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const ContactListContainer = css({
  backgroundColor: "#1c1c1e",
  color: "white",
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "auto",
  maxHeight: "93vh",
  maxWidth: "500px",
});

const SearchBarContainer = css({
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  paddingTop: "8px",
  paddingBottom: "8px",
  maxWidth: "500px",
});

const LoadButton = css({
  zIndex: "500",
  backgroundColor: "#404040",
  border: "none",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  margin: "8px 0",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const Contact = () => {
  const router = useRouter();

  const [limit, setLimit] = useState(10);

  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationId, setConfirmationId] = useState(0);

  const [firstLoad, setFirstLoad] = useState(true);

  const [contactList, setContactList] = useState<
    GetContactListQuery | undefined
  >();
  const [contactFavoriteList, setContactFavoriteList] = useState<number[]>([]);

  const [getContact, { loading: loadingGetContact }] =
    useGetContactListLazyQuery();

  const [removeContact, { loading: loadingDeleteContact }] =
    useDeleteContactMutation();

  useEffect(() => {
    if (!localStorage.getItem("contact")) {
      getContact({
        variables: { limit: limit, offset: offset },
      })
        .then((response) => {
          localStorage.setItem("contact", JSON.stringify(response.data));
          setContactList(response.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      const localContact = localStorage.getItem("contact");
      if (localContact) {
        setContactList(JSON.parse(localContact));
      }
    }

    if (localStorage.getItem("favorite")) {
      const localFavorite = localStorage.getItem("favorite");
      if (localFavorite) {
        const favorite = JSON.parse(localFavorite) as number[];
        setContactFavoriteList(favorite);
      }
    }
    if (firstLoad) {
      setFirstLoad(false);
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
        const contact = {
          contact: contactList.contact
            .concat(response.data.contact)
            .filter(function filterPhones(this: any, { id }) {
              var key = id;
              return !this.has(key) && this.add(key);
            }, new Set()),
        };
        localStorage.setItem("contact", JSON.stringify(contact));
        setContactList(contact);
      }
    });
  };

  const handleAddFavorite = (id: number) => {
    const favorite = [...contactFavoriteList];
    favorite.push(id);
    setContactFavoriteList(favorite);
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };

  const handleRemoveFavorite = (id: number) => {
    const favorite = contactFavoriteList;
    const filtered = favorite.filter((value) => value !== id);
    setContactFavoriteList(filtered);
    localStorage.setItem("favorite", JSON.stringify(filtered));
  };

  const handleOpenModal = (id: number) => {
    setConfirmationId(id);
    setConfirmationModal(true);
  };

  const handleCloseModal = () => {
    setConfirmationModal(false);
  };

  const handleDeleteContact = () => {
    removeContact({ variables: { id: confirmationId } })
      .then((response) => {
        const data = localStorage.getItem("contact");
        if (data) {
          const contact = JSON.parse(data) as GetContactListQuery;
          const filtered = contact.contact.filter(
            (value) => value.id !== confirmationId
          );
          localStorage.setItem(
            "contact",
            JSON.stringify({ contact: filtered })
          );
          setContactList({ contact: filtered });
          setConfirmationModal(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
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

  if (firstLoad) {
    return <LoadingModal isActive />;
  }

  return (
    <div css={BaseContainer}>
      <ConfirmationModal
        handleConfirm={handleDeleteContact}
        handleCancel={handleCloseModal}
        isActive={confirmationModal}
        text={"Delete Contact ?"}
      />
      <LoadingModal isActive={loadingGetContact || loadingDeleteContact} />
      <div css={SearchBarContainer}>
        <SearchBar onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      </div>
      <div css={ContactListContainer}>
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
                key={key}
                contact={contact}
                handleContactButton={handleContactButton}
                handleAddFavorite={handleAddFavorite}
                handleDeleteContact={handleOpenModal}
                handleRemoveFavorite={handleRemoveFavorite}
                search={search}
              />
            ))
        ) : (
          <p>No Favorite Yet :&#40;</p>
        )}

        <p>Contact List</p>

        {contactList ? (
          contactList.contact
            .filter(
              (contact) =>
                !contactFavoriteList.includes(contact.id) &&
                contactSearchFilter(contact)
            )
            .map((contact, key) => (
              <ContactCard
                key={key}
                contact={contact}
                handleContactButton={handleContactButton}
                handleAddFavorite={handleAddFavorite}
                handleDeleteContact={handleOpenModal}
                handleRemoveFavorite={handleRemoveFavorite}
                search={search}
              />
            ))
        ) : (
          <p>No Contact Yet :&#40;</p>
        )}
        <button css={LoadButton} onClick={handleLoadMoreButton}>
          Load More Contact
        </button>
      </div>

      <FloatingButton onClick={handleAddContactButton} />
    </div>
  );
};

export default Contact;
