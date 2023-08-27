import { GetContactListQuery } from "@api/generated";
import {
  AddPhoneButton,
  ButtonText,
  ModalContainer,
  PhoneInputContainer,
  PhoneModalContainer,
} from "@styles/contact-form.style";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  isActive: boolean;
  id: number;
};

const PhoneNotFound = (props: Props) => {
  const router = useRouter();

  const handleBackButton = () => {
    const data = localStorage.getItem("contact");
    if (data) {
      const parsed = JSON.parse(data) as GetContactListQuery;
      const filtered = {
        contact: parsed.contact.filter((phone) => phone.id !== props.id),
      } as GetContactListQuery;
      localStorage.setItem("contact", JSON.stringify(filtered));
    }
    router.push("/contact");
  };
  return (
    <div css={ModalContainer(props.isActive)}>
      <div css={PhoneModalContainer}>
        <div css={PhoneInputContainer}>
          <p css={{ textAlign: "center" }}>
            Phone Number has been deleted by someone like you :&#40;
          </p>
        </div>
        <button css={AddPhoneButton(false)} onClick={handleBackButton}>
          <span css={ButtonText}>Go to Contact</span>
        </button>
      </div>
    </div>
  );
};

export default PhoneNotFound;
