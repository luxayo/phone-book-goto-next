import { Router, useRouter } from "next/router";
import Divider from "@components/divider.component";
import { AiFillDelete } from "react-icons/ai";
import {
  GetContactListQuery,
  useAddContactWithPhonesMutation,
} from "@api/generated";
import { useFormik } from "formik";
import {
  AddPhoneButton,
  BaseContainer,
  ButtonIcon,
  ButtonText,
  ContactContainer,
  ContactInput,
  HeaderButton,
  HeaderButtonText,
  HeaderContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
  PhoneContainer,
  PhoneInputContainer,
  RemovePhoneButton,
} from "@styles/contact-form.style";
import { useWarnIfUnsavedChanges } from "@lib/form.lib";
import { useState } from "react";
import ConfirmationModal from "@components/confirmation-modal.component";
import LoadingModal from "@components/loading-modal.component";

const NewContact = () => {
  const router = useRouter();

  const [addContact, { loading, data }] = useAddContactWithPhonesMutation();

  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isExist, setIsExist] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phones: [{ number: "" }],
    },
    onSubmit: (values) => {
      const data = localStorage.getItem("contact");
      let findIndex = -1;
      if (data) {
        const contact = JSON.parse(data) as GetContactListQuery;
        findIndex = contact.contact.findIndex(
          (item) =>
            item.first_name.toLowerCase() === values.first_name.toLowerCase() &&
            item.last_name.toLowerCase() === values.last_name.toLowerCase()
        );
      }
      if (findIndex !== -1) {
        setConfirmationText("Contact Already Exist");
        setIsExist(true);
        setConfirmationModal(true);
      } else {
        const filtered = values.phones.filter((data) => data.number !== "");
        addContact({ variables: { ...values, phones: filtered } })
          .then((response) => {
            if (data) {
              const contact = JSON.parse(data) as GetContactListQuery;
              const date = new Date();
              contact.contact.push({
                created_at: date.toISOString(),
                first_name:
                  response.data!.insert_contact!.returning[0].first_name,
                id: response.data!.insert_contact!.returning[0].id,
                last_name:
                  response.data!.insert_contact!.returning[0].last_name,
                phones: response.data!.insert_contact!.returning[0].phones,
              });
              localStorage.setItem("contact", JSON.stringify(contact));
            }
            setConfirmationText("Contact Successfully Inserted");
            setConfirmationModal(true);
          })
          .catch((error) => {
            setConfirmationText("Contact Insert Unsuccessful");
            setConfirmationModal(true);
          });
      }
    },
  });

  const handleCloseModal = () => {
    setConfirmationModal(false);
    if (!isExist) {
      router.replace(`/contact/${data?.insert_contact?.returning[0].id}`);
    }
    setIsExist(false);
  };

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

  useWarnIfUnsavedChanges(!formik.isSubmitting && formik.dirty, () => {
    return confirm("Discard Changes ?");
  });

  return (
    <div css={BaseContainer}>
      <ConfirmationModal
        handleConfirm={handleCloseModal}
        confirmOnly={true}
        isActive={confirmationModal}
        text={confirmationText}
      />
      <LoadingModal isActive={loading} />
      <div css={HeaderContainer}>
        <div css={HeaderLeftContainer}>
          <div css={HeaderButton(false)} onClick={handleBackButton}>
            <p css={HeaderButtonText(false)}>Close</p>
          </div>
        </div>
        <div css={HeaderRightContainer}>
          <div css={HeaderButton(isEmpty())} onClick={handleSaveButton}>
            <p css={HeaderButtonText(isEmpty())}>Done</p>
          </div>
        </div>
      </div>
      <div css={ContactContainer}>
        <div css={PhoneContainer}>
          <div css={PhoneInputContainer}>
            <input
              id="first_name"
              value={formik.values.first_name}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                // regex to prevent special character
                const regex = /[~`!@#$%^&*()_={}'"[\]:;,.<>+\/?-]/;
                if (!value || !regex.test(value.toString())) {
                  formik.setFieldValue(`first_name`, value);
                }
              }}
              css={ContactInput}
              placeholder="First Name"
              aria-label="first-name"
            />
          </div>
          <Divider />
          <div css={PhoneInputContainer}>
            <input
              id="last_name"
              value={formik.values.last_name}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                // regex to prevent special character
                const regex = /[~`!@#$%^&*()_={}'"[\]:;,.<>+\/?-]/;
                if (!value || !regex.test(value.toString())) {
                  formik.setFieldValue(`last_name`, value);
                }
              }}
              css={ContactInput}
              placeholder="Last Name"
              aria-label="last-name"
            />
          </div>
        </div>
        <div css={PhoneContainer}>
          {formik.values.phones.map((phone, index) => (
            <div css={PhoneInputContainer} key={index}>
              <input
                id={`phones.${index}.number`}
                value={phone.number}
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;
                  // regex to prevent other than numeric
                  const regex =
                    /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                  if (!value || regex.test(value.toString())) {
                    formik.setFieldValue(`phones.${index}.number`, value);
                  }
                }}
                css={ContactInput}
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
                <></>
              )}
            </div>
          ))}
          <button css={AddPhoneButton(false)} onClick={handleAddPhone}>
            <span css={ButtonText}>Add Phone Field</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
