import { GetContactListQuery } from "@api/generated";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  isActive: boolean;
  id: number;
};

const PhoneNotFound = (props: Props) => {
  const router = useRouter();

  const handleBackButton = () => {
    const data = localStorage.getItem("phone");
    if (data) {
      const parsed = JSON.parse(data) as GetContactListQuery;
      const filtered = {
        contact: parsed.contact.filter((phone) => phone.id !== props.id),
      } as GetContactListQuery;
      localStorage.setItem("phone", JSON.stringify(filtered));
    }
    router.push("/contact");
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
        <p>Phone Number has been deleted by someone like you :&#40;</p>
        <button onClick={handleBackButton}>Go to Contact</button>
      </div>
    </div>
  );
};

export default PhoneNotFound;
