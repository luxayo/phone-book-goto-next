import {
  useEditContactByIdMutation,
  useEditPhoneNumberMutation,
  useGetContactDetailQuery,
} from "@api/generated";
import Divider from "@components/divider.component";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useFormik } from "formik";

interface IFormInput {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

const ContactDetail = () => {
  const router = useRouter();
  const { contactId } = router.query;
  const parsedContactId = parseInt(
    typeof contactId === "string" ? contactId : ""
  );

  const [editContact, { loading: loadingContact }] =
    useEditContactByIdMutation();
  const [editPhoneNumber, { loading: loadingPhoneNumber }] =
    useEditPhoneNumberMutation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phones: [{ number: "" }],
    },
    onSubmit: (values) => {
      editContact({
        variables: {
          id: parsedContactId,
          _set: {
            first_name: formik.touched.first_name
              ? values.first_name
              : undefined,
            last_name: formik.touched.last_name ? values.last_name : undefined,
          },
        },
      })
        .then((response) => {
          router.replace(`/contact`);
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
    console.log(phones.length);
    phones.push({ number: "" });
    formik.setFieldValue("phones", phones);
  };

  const handleRemovePhone = (phone: { number: string }) => {
    formik.setFieldValue(
      "phones",
      formik.values.phones.filter((data) => data !== phone)
    );
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const {
    loading: queryLoading,
    error,
    data,
  } = useGetContactDetailQuery({
    variables: { id: parsedContactId },
  });

  useEffect(() => {
    if (
      data &&
      formik.values.first_name === "" &&
      formik.values.first_name === ""
    ) {
      formik.setFieldValue("first_name", data.contact_by_pk!.first_name);
      formik.setFieldValue("last_name", data.contact_by_pk!.last_name);
      formik.setFieldValue(
        "phones",
        data.contact_by_pk!.phones.map((data) => data.number)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) {
    router.replace("/404");
  }

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
        <Divider />

        <button onClick={handleAddPhone}>Add Field Phone</button>
      </div>
    </div>
  );
};

export default ContactDetail;
