import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import {
  AiOutlineCheck,
  AiOutlineArrowLeft,
  AiFillDelete,
} from "react-icons/ai";
import { useAddContactWithPhonesMutation } from "@api/generated";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { css } from "@emotion/react";

const ContactContainer = css({
  backgroundColor: "#404040",
  margin: "8px 0",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "100%",
});

const AddPhoneButton = css({
  width: "100%",
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flex: 1,
  backgroundColor: "#404040",
  border: "none",
  padding: "5px 10px",
  borderTop: "1px solid #333333",
  borderRadius: "0 0 12px 12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const RemovePhoneButton = css({
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  backgroundColor: "transparent",
  border: "none",
  padding: "5px",
  borderRadius: "50%",
  transition: "color 0.2s",
  alignItems: "center",
  "&:hover": {
    color: "#333333",
  },
});

const ButtonText = css({
  fontSize: ".7em",
  width: "100%",
  height: "auto",
  textAlign: "center",
});

const ButtonIcon = css({
  fontSize: "1em",
  textAlign: "center",
});

const NewContact = () => {
  const router = useRouter();

  const [addContact, { loading }] = useAddContactWithPhonesMutation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phones: [{ number: "" }],
    },
    onSubmit: (values) => {
      const data = values.phones.filter((data) => data.number !== "");
      addContact({ variables: { ...values, phones: data } })
        .then((response) => {
          router.replace(
            `/contact/${response.data?.insert_contact?.returning[0].id}`
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  const handleBackButton = () => {
    router.push("/contact");
  };

  const handleSaveButton = () => {
    formik.handleSubmit();
  };

  const handleAddPhone = () => {
    const phones = formik.values.phones;
    phones.push({ number: "" });
    formik.setFieldValue("phones", phones);
  };
  const handleRemovePhone = (phone: { number: string }) => {
    formik.setFieldValue(
      "phones",
      formik.values.phones.filter((data) => data !== phone)
    );
    console.log(formik.values.phones.length);
  };

  const isEmpty = () => {
    if (
      formik.values.first_name === "" &&
      formik.values.last_name === "" &&
      formik.values.phones.findIndex((phone) => phone.number.length > 0) === -1
    )
      return true;

    return false;
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
          maxWidth: "500px",
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
            onClick={handleBackButton}
          >
            <p
              css={{
                fontSize: "1em",
              }}
            >
              Close
            </p>
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
              pointerEvents: isEmpty() ? "none" : "visible",
            }}
            onClick={handleSaveButton}
          >
            <p
              css={{
                fontSize: "1em",
                color: isEmpty() ? "#404040" : "white",
              }}
            >
              Done
            </p>
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
          maxWidth: "500px",
        }}
      >
        <div css={ContactContainer}>
          <div
            css={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <input
              id="first_name"
              value={formik.values.first_name}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /[~`!@#$%^&*()_={}'"[\]:;,.<>+\/?-]/;
                if (!value || !regex.test(value.toString())) {
                  formik.setFieldValue(`first_name`, value);
                }
              }}
              css={{
                color: "white",
                font: "inherit",
                margin: "5px",
                flex: 1,
                padding: "5px 2px",
                border: "none",
                background: "none",
                display: "block",
                outline: "none",
              }}
              placeholder="First Name"
              aria-label="first-name"
            />
          </div>
          <Divider />
          <div
            css={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <input
              id="last_name"
              value={formik.values.last_name}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /[~`!@#$%^&*()_={}'"[\]:;,.<>+\/?-]/;
                if (!value || !regex.test(value.toString())) {
                  formik.setFieldValue(`last_name`, value);
                }
              }}
              css={{
                color: "white",
                font: "inherit",
                margin: "5px",
                flex: 1,
                padding: "5px 2px",
                border: "none",
                background: "none",
                display: "block",
                outline: "none",
              }}
              placeholder="Last Name"
              aria-label="last-name"
            />
          </div>
          <Divider />
        </div>
        <div css={ContactContainer}>
          {formik.values.phones.map((phone, index) => (
            <div
              css={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              key={index}
            >
              <input
                id={`phones.${index}.number`}
                value={phone.number}
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;
                  const regex =
                    /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                  if (!value || regex.test(value.toString())) {
                    formik.setFieldValue(`phones.${index}.number`, value);
                  }
                }}
                css={{
                  color: "white",
                  font: "inherit",
                  margin: "5px",
                  flex: 1,
                  padding: "5px 2px",
                  border: "none",
                  background: "none",
                  display: "block",
                  outline: "none",
                }}
                placeholder="Phone"
                aria-label="phone"
              />
              {formik.values.phones.length > 1 ? (
                <button
                  css={RemovePhoneButton}
                  onClick={() =>
                    formik.values.phones.length > 1 && handleRemovePhone(phone)
                  }
                >
                  <AiFillDelete css={ButtonIcon} />
                </button>
              ) : (
                <span />
              )}
            </div>
          ))}
          <button css={AddPhoneButton} onClick={handleAddPhone}>
            <span css={ButtonText}>Add Phone Field</span>
          </button>
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default NewContact;
