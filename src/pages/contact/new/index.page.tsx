import { useRouter } from "next/router";
import Divider from "@components/divider.component";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAddContactWithPhonesMutation } from "@api/generated";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

interface IFormInput {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

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
            onClick={handleBackButton}
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
            onClick={handleSaveButton}
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
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <input
            id="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
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
            placeholder="Last Name"
            aria-label="last-name"
          />
        </div>
        <Divider />
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
              onChange={formik.handleChange}
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
              placeholder="Phone"
              aria-label="phone"
            />
            {formik.values.phones.length > 1 ? (
              <button
                onClick={() =>
                  formik.values.phones.length > 1 && handleRemovePhone(phone)
                }
              >
                Remove Field Phone
              </button>
            ) : (
              <span />
            )}
          </div>
        ))}
        <button onClick={handleAddPhone}>Add Field Phone</button>
        <Divider />
      </div>
    </div>
  );
};

export default NewContact;
