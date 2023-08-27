import { css } from "@emotion/react";

export const ModalContainer = (isActive: boolean) => {
  return css({
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    inset: "0px",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "rgba(255,255,255)",
    zIndex: "1200",
    visibility: isActive ? "visible" : "hidden",
  });
};

export const PhoneModalContainer = css({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#404040",
  margin: "5px",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "80%",
  maxWidth: "400px",
});

export const PhoneModalButton = css({
  width: "100%",
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flex: 1,
  backgroundColor: "#404040",
  border: "none",
  padding: "10px",
  borderTop: "1px solid #333333",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

export const BaseContainer = css({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

export const HeaderContainer = css({
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  padding: "0 10px 5px 10px",
  maxWidth: "500px",
});
export const HeaderLeftContainer = css({
  boxSizing: "border-box",
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-start",
});

export const HeaderRightContainer = css({
  boxSizing: "border-box",
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
});

export const HeaderButton = (isEmpty: boolean) => {
  return css({
    cursor: "pointer",
    boxSizing: "border-box",
    pointerEvents: isEmpty ? "none" : "visible",
  });
};

export const HeaderButtonText = (isEmpty: boolean) => {
  return css({
    fontSize: "1em",
    color: isEmpty ? "#404040" : "white",
  });
};

export const ContactContainer = css({
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "auto",
  maxWidth: "500px",
  maxHeight: "93vh",
});

export const PhoneContainer = css({
  backgroundColor: "#404040",
  margin: "8px 0",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "80%",
});

export const PhoneInputContainer = css({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const ContactInput = css({
  color: "white",
  font: "inherit",
  margin: "5px",
  flex: 1,
  padding: "5px 2px",
  border: "none",
  background: "none",
  display: "block",
  outline: "none",
});

export const AddPhoneButton =(isEmpty : boolean)=> css({
  width: "100%",
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flex: 1,
  backgroundColor: "#404040",
  border: "none",
  padding: "10px",
  borderTop: "1px solid #333333",
  borderRadius: isEmpty ? "12px": "0 0 12px 12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

export const RemovePhoneButton = css({
  font: "inherit",
  color: "white",
  cursor: "pointer",
  display: "flex",
  backgroundColor: "transparent",
  border: "none",
  padding: "5px",
  borderRadius: "50%",
  transition: "color 0.2s",
  alignItems: "center",
  "&:hover": {
    color: "#333333",
  },
});

export const ButtonText = css({
  fontSize: ".7em",
  width: "100%",
  height: "auto",
  textAlign: "center",
});

export const ButtonIcon = css({
  fontSize: "1em",
  textAlign: "center",
});
