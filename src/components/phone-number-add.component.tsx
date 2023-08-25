import {
  GetContactListQuery,
  useAddNumberToContactMutation,
} from "@api/generated";
import React, { useState } from "react";

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setValue: any;
};

const PhoneNumberAdd = (props: Props) => {
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
        const data = localStorage.getItem("phone");
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

            localStorage.setItem("phone", JSON.stringify(parsed));
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
    <div
      css={{
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        inset: "0px",
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "rgba(255,255,255)",
        zIndex: "1200",
        visibility: props.isActive ? "visible" : "hidden",
      }}
    >
      <div
        css={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowX: "auto",
          maxWidth: "300px",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <input
          value={PhoneNumberAdd}
          onChange={(e) => setPhoneNumberAdd(e.target.value)}
        />
        <button onClick={handlePhoneNumberAdd}>Add Phone Number</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PhoneNumberAdd;
