import {
  AddPhoneButton,
  ButtonText,
  ContactInput,
  ModalContainer,
  PhoneInputContainer,
  PhoneModalButton,
  PhoneModalContainer,
} from "@styles/contact-form.style";
import {
  GetContactListQuery,
  useAddNumberToContactMutation,
} from "@api/generated";
import React, { useState } from "react";

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitting: (isSubmitting: boolean) => void;
  id: number;
  setValue: any;
};

const AddPhoneNumberModal = (props: Props) => {
  const [PhoneNumberAdd, setPhoneNumberAdd] = useState("");
  const [addPhoneNumber, { loading }] = useAddNumberToContactMutation();
  const handlePhoneNumberAdd = () => {
    addPhoneNumber({
      variables: {
        contact_id: props.id,
        phone_number: PhoneNumberAdd,
      },
    })
      .then((response) => {
        const data = localStorage.getItem("contact");
        if (response.data !== undefined) {
          props.setValue({
            first_name:
              response.data?.insert_phone?.returning[0].contact?.first_name,
            last_name:
              response.data?.insert_phone?.returning[0].contact?.last_name,
            phones: response.data?.insert_phone?.returning[0].contact?.phones,
          });
          if (data !== null) {
            const parsed = JSON.parse(data) as GetContactListQuery;
            const dataIndex = parsed.contact.findIndex(
              (phone) => phone.id === props.id
            );
            parsed.contact[dataIndex] = {
              created_at: parsed.contact[dataIndex].created_at,
              first_name:
                response.data!.insert_phone!.returning[0].contact!.first_name,
              id: parsed.contact[dataIndex].id,
              last_name:
                response.data!.insert_phone!.returning[0].contact!.last_name,
              phones: response.data!.insert_phone!.returning[0].contact!.phones,
            };

            localStorage.setItem("contact", JSON.stringify(parsed));
            props.setSubmitting(true);
          }
        }

        props.setIsActive(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => {
    props.setIsActive(false);
  };

  return (
    <div css={ModalContainer(props.isActive)}>
      <div css={PhoneModalContainer}>
        <div css={PhoneInputContainer}>
          <input
            value={PhoneNumberAdd}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const regex =
                /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (!value || regex.test(value.toString())) {
                setPhoneNumberAdd(value);
              }
            }}
            css={ContactInput}
            placeholder="Phone"
            aria-label="phone"
          />
        </div>
        <button css={AddPhoneButton(false)} onClick={handlePhoneNumberAdd}>
          <span css={ButtonText}>Add Phone Number</span>
        </button>
      </div>

      <div css={PhoneModalContainer}>
        <button css={PhoneModalButton} onClick={handleClose}>
          <span css={ButtonText}>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default AddPhoneNumberModal;
