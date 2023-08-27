import { keyframes } from "@emotion/react";
import { ModalContainer } from "@styles/contact-form.style";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  isActive: boolean;
};

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {    
    transform: rotate(1turn);
  }
`;

const LoadingModal = (props: Props) => {
  return (
    <div css={ModalContainer(props.isActive)}>
      <div
        css={{
          border: "2px solid white",
          borderRightColor: "transparent",
          borderRadius: "100%",
          display: "inline-block",
          position: "relative",
          overflow: "hidden",
          textIndent: "-9999px",
          width: "18px",
          height: "18px",
          verticalAlign: "middle",
          margin: "20px 10px 40px",
          animation: `${spinner} .8s linear infinite`,
        }}
      />
    </div>
  );
};

export default LoadingModal;
