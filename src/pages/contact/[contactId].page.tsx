import {
  GetContactListQuery,
  useEditContactByIdMutation,
  useEditPhoneNumberMutation,
  useGetContactDetailQuery,
} from "@api/generated";
import Divider from "@components/divider.component";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import PhoneNotFound from "@components/phone-not-found.component";
import AddPhoneNumberModal from "@components/add-phone-number-modal.component";
import {
  AddPhoneButton,
  BaseContainer,
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
} from "@styles/contact-form.style";
import { useWarnIfUnsavedChanges } from "@lib/form.lib";
import LoadingModal from "@components/loading-modal.component";
import ConfirmationModal from "@components/confirmation-modal.component";

const ContactDetail = () => {
  const router = useRouter();

  const { contactId } = router.query;

  const parsedContactId = parseInt(
    typeof contactId === "string" ? contactId : ""
  );

  const [isNotFound, setIsNotFound] = useState(false);
  const [isAddingPhoneNumber, setIsAddingPhoneNumber] = useState(false);

  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [phoneInitialValues, setphoneInitialValues] = useState({
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  });

  const [editContact, { loading: loadingEditContact }] =
    useEditContactByIdMutation();

  const [editPhoneNumber, { loading: loadingEditPhoneNumber }] =
    useEditPhoneNumberMutation();

  const handleSavePhoneNumber = (newPhone: string, phone: string) => {
    editPhoneNumber({
      variables: {
        pk_columns: {
          number: phone,
          contact_id: parsedContactId,
        },
        new_phone_number: newPhone,
      },
    })
      .then((response) => {
        const data = localStorage.getItem("contact");
        if (data) {
          const contact = JSON.parse(data) as GetContactListQuery;
          const index = contact.contact.findIndex(
            (contact) =>
              contact.id === response.data!.update_phone_by_pk!.contact!.id
          );
          contact.contact[index].phones =
            response.data!.update_phone_by_pk!.contact!.phones;
          localStorage.setItem("contact", JSON.stringify(contact));
          const updated = phoneInitialValues.phones.map((initial) => {
            if (initial.number === phone) {
              return { ...initial, number: newPhone };
            }
            return initial;
          });
          setphoneInitialValues((prev) => ({ ...prev, phones: updated }));
        }
        router.replace(`/contact`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const {
    loading: loadingGetContact,
    error,
    data,
  } = useGetContactDetailQuery({
    variables: { id: parsedContactId },
  });

  const formik = useFormik({
    initialValues: phoneInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        values.first_name !== formik.initialValues.first_name ||
        values.last_name !== formik.initialValues.last_name
      ) {
        editContact({
          variables: {
            id: parsedContactId,
            _set: {
              first_name: formik.touched.first_name
                ? values.first_name
                : undefined,
              last_name: formik.touched.last_name
                ? values.last_name
                : undefined,
            },
          },
        })
          .then((response) => {
            const data = localStorage.getItem("contact");
            if (data) {
              const contact = JSON.parse(data) as GetContactListQuery;
              const index = contact.contact.findIndex(
                (contact) =>
                  contact.id === response.data!.update_contact_by_pk!.id
              );
              contact.contact[index].first_name =
                response.data!.update_contact_by_pk!.first_name;
              contact.contact[index].last_name =
                response.data!.update_contact_by_pk!.last_name;
              localStorage.setItem("contact", JSON.stringify(contact));
            }
            setConfirmationText("Contact Successfully Updated");
            setConfirmationModal(true);
          })
          .catch((error) => {
            setConfirmationText("Contact Update Unsuccessful");
            setConfirmationModal(true);
          });
      }

      if (formik.touched.phones) {
        for (let index = 0; index < values.phones.length; index++) {
          if (
            values.phones[index].number !==
            formik.initialValues.phones[index].number
          )
            handleSavePhoneNumber(
              values.phones[index].number,
              formik.initialValues.phones[index].number
            );
        }
      }
    },
  });

  const handleBackButton = () => {
    router.push("/contact");
  };

  const handleSaveContact = () => {
    formik.handleSubmit();
  };

  const handleAddPhone = () => {
    setIsAddingPhoneNumber(true);
  };

  useEffect(() => {
    if (data !== undefined) {
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

  useWarnIfUnsavedChanges(!formik.isSubmitting && formik.dirty, () => {
    return confirm("Discard Changes ?");
  });
  if (loadingGetContact) {
    return <LoadingModal isActive />;
  }

  if (error) {
    router.replace("/404");
  }

  return (
    <div css={BaseContainer}>
      <ConfirmationModal
        handleConfirm={() => setConfirmationModal(false)}
        confirmOnly={true}
        isActive={confirmationModal}
        text={confirmationText}
      />
      <LoadingModal isActive={loadingEditContact || loadingEditPhoneNumber} />
      <PhoneNotFound isActive={isNotFound} id={parsedContactId} />
      <AddPhoneNumberModal
        isActive={isAddingPhoneNumber}
        setSubmitting={formik.setSubmitting}
        setIsActive={setIsAddingPhoneNumber}
        setValue={formik.setValues}
        id={parsedContactId}
      />
      <div css={HeaderContainer}>
        <div css={HeaderLeftContainer}>
          <div css={HeaderButton(false)} onClick={handleBackButton}>
            <p css={HeaderButtonText(false)}>Close</p>
          </div>
        </div>
        <div css={HeaderRightContainer}>
          <div css={HeaderButton(false)} onClick={handleSaveContact}>
            <p css={HeaderButtonText(false)}>Done</p>
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
            </div>
          ))}
          <button
            css={AddPhoneButton(formik.values.phones.length < 1)}
            onClick={handleAddPhone}
          >
            <span css={ButtonText}>Add Phone Field</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
