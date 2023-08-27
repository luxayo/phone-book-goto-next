import {
  AddPhoneButton,
  ButtonText,
  ModalContainer,
  PhoneModalButton,
  PhoneModalContainer,
} from "@styles/contact-form.style";

type Props = {
  handleConfirm: () => void;
  handleCancel?: () => void;
  confirmOnly?: boolean;
  isActive: boolean;
  text: string;
};

const ConfirmationModal = (props: Props) => {
  return (
    <div css={ModalContainer(props.isActive)}>
      <div css={PhoneModalContainer}>
        <p css={{ textAlign: "center" }}>{props.text}</p>
        <button css={AddPhoneButton(false)} onClick={props.handleConfirm}>
          <span css={ButtonText}>Confirm</span>
        </button>
      </div>

      {props.confirmOnly ? (
        <></>
      ) : (
        <div css={PhoneModalContainer}>
          <button css={PhoneModalButton} onClick={props.handleCancel}>
            <span css={ButtonText}>Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
