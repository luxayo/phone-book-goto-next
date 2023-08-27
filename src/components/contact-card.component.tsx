import { css } from "@emotion/react";

const ContactCardContainer = css({
  zIndex: "500",
  backgroundColor: "#404040",
  margin: "8px",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "80%",
  maxWidth: "400px",
});

const ContactContainer = css({
  cursor: "pointer",
  padding: "16px",
  borderRadius: "12px 12px 0 0",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const ContactName = css({
  fontSize: "18px",
  marginBottom: "8px",
});

const ContactPhone = css({ color: "#cccccc" });

const RemoveButton = css({
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flex: 1,
  backgroundColor: "#404040",
  border: "none",
  padding: "5px 10px",
  borderTop: "1px solid #333333",
  borderRadius: "0 0 12px 0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const FavoriteButton = css({
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flex: 3,
  backgroundColor: "#404040",
  border: "none",
  padding: "5px 10px",
  borderTop: "1px solid #333333",
  borderRight: "1px solid #333333",
  borderRadius: "0 0 0 12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const ButtonText = css({
  fontSize: ".7em",
  width: "100%",
  height: "auto",
  textAlign: "center",
});

type Props = {
  contact: {
    __typename?: "contact" | undefined;
    created_at: any;
    first_name: string;
    id: number;
    last_name: string;
    phones: {
      __typename?: "phone" | undefined;
      number: string;
    }[];
  };
  handleContactButton: (id: number) => void;
  handleAddFavorite: (id: number) => void;
  handleRemoveFavorite: (id: number) => void;
  handleDeleteContact: (id: number) => void;
  search: string;
  isFavorite?: boolean;
};

const ContactCard = (props: Props) => {
  const renderPhoneNumber = (
    phones: {
      __typename?: "phone" | undefined;
      number: string;
    }[]
  ) => {
    if (phones !== undefined && phones.length > 0) {
      if (props.search === "") {
        return <p css={ContactPhone}>{phones[0].number}</p>;
      }
      return phones
        .filter((phone) => phone.number.includes(props.search))
        .map((phone, key) => (
          <p css={ContactPhone} key={key}>
            {phone.number}
          </p>
        ));
    }
    return <p css={ContactPhone}>No Phone Number</p>;
  };

  return (
    <div
      key={props.contact.id}
      id={`card-container-${props.contact.id}`}
      css={ContactCardContainer}
    >
      <div
        css={ContactContainer}
        onClick={() => props.handleContactButton(props.contact.id)}
      >
        <h3 css={ContactName}>
          {props.contact.first_name} {props.contact.last_name}
        </h3>
        {renderPhoneNumber(props.contact.phones)}
      </div>
      <div css={{ display: "flex" }}>
        <button
          key={props.contact.id}
          id={`card-fav-button-${props.contact.id}`}
          css={FavoriteButton}
          onClick={() => {
            props.isFavorite
              ? props.handleRemoveFavorite(props.contact.id)
              : props.handleAddFavorite(props.contact.id);
          }}
        >
          {props.isFavorite ? (
            <span css={ButtonText}>Remove From Favorite</span>
          ) : (
            <span css={ButtonText}>Add To Favorite</span>
          )}
        </button>
        <button
          id={`card-delete-button-${props.contact.id}`}
          css={RemoveButton}
          onClick={() => props.handleDeleteContact(props.contact.id)}
        >
          <span css={ButtonText}>Delete Contact</span>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
