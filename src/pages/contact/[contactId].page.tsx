import { useRouter } from "next/router";
import React from "react";

const ContactDetail = () => {
  const router = useRouter();
  const { SPMId } = router.query;
  return <div>ContactDetail</div>;
};

export default ContactDetail;
