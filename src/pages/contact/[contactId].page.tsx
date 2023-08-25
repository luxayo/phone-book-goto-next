import {
  useEditContactByIdMutation,
  useEditPhoneNumberMutation,
  useGetContactDetailQuery,
} from "@api/generated";
import Divider from "@components/divider.component";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import PhoneNotFound from "@components/phone-not-found.component";
import PhoneNumberAdd from "@components/phone-number-add.component";

const ContactDetail = () => {
  const router = useRouter();
  const { contactId } = router.query;
  const parsedContactId = parseInt(
    typeof contactId === "string" ? contactId : ""
  );

  const [isNotFound, setIsNotFound] = useState(false);
  const [isAddingPhoneNumber, setIsAddingPhoneNumber] = useState(false);

  const [phoneInitialValues, setphoneInitialValues] = useState({
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  });

  const [editContact, { loading: loadingContact }] =
    useEditContactByIdMutation();
  const [editPhoneNumber, { loading: loadingPhoneNumber }] =
    useEditPhoneNumberMutation();

  const formik = useFormik({
    initialValues: phoneInitialValues,
    enableReinitialize: true,
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
          alert("ok contact");
          // router.replace(`/contact`);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  const handleBackButton = () => {
    router.push("/contact");
  };

  const handleSaveContact = () => {
    formik.handleSubmit();
    router.push("/contact");
  };

  const handleAddPhone = () => {
    setIsAddingPhoneNumber(true);
  };

  const handleSavePhoneNumber = (phone: { number: string }, index: number) => {
    editPhoneNumber({
      variables: {
        pk_columns: {
          number: formik.initialValues.phones[index].number,
          contact_id: parsedContactId,
        },
        new_phone_number: phone.number,
      },
    })
      .then((response) => {
        alert("ok phone");
        // router.replace(`/contact`);
      })
      .catch((error) => {
        alert(error.message);
      });
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
      if (data.contact_by_pk !== null && data.contact_by_pk !== undefined) {
        setphoneInitialValues({
          first_name: data.contact_by_pk.first_name,
          last_name: data.contact_by_pk.last_name,
          phones: data.contact_by_pk.phones,
        });
      } else {
        setIsNotFound(true);
      }
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
      <PhoneNotFound isActive={isNotFound} id={parsedContactId} />
      <PhoneNumberAdd
        isActive={isAddingPhoneNumber}
        setIsActive={setIsAddingPhoneNumber}
        setValue={formik.setValues}
        id={parsedContactId}
      />
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
            onClick={handleSaveContact}
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
            onBlur={handleSaveContact}
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
            onBlur={handleSaveContact}
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
              onBlur={() => {
                handleSavePhoneNumber(phone, index);
              }}
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
          </div>
        ))}
        <button onClick={handleAddPhone}>Add Field Phone</button>
        <Divider />
      </div>
    </div>
  );
};

export default ContactDetail;
