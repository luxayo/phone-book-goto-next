import { ChangeEvent } from "react";

export const numericInput = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  if (!value || regex.test(value.toString())) {
    return value;
  }
};

export const nonSpecialCharacterInput = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const regex = /[~`!@#$%^&*()_={}'"[\]:;,.<>+\/?-]/;
  if (!value || !regex.test(value.toString())) {
    return value;
  }
};
