import styled from "@emotion/styled";
import { colors, typography } from "../../assets";
// import {IoMdMail} from "react-icons/io"
interface Props {
  text?: string;
  onClick?: any;
  button_style?: "primary" | "secondary" | "subtle";
  trailingIcon?: any;
  leadingIcon?: any;
  size?: "small" | "large" | "default";
  type?: "submit" | "button" | "reset";
}
interface buttonProps {
  button_style?: "primary" | "secondary" | "subtle";
  text?: string;
  size?: "small" | "large" | "default";
  type?: string;
}
const handleStyles = (props: buttonProps) => {
  let background, padding, fontSize, lineHeight;

  switch (props.button_style) {
    case "primary":
      background = colors.primary;
      break;
    case "secondary":
      background = colors.secondary;
      break;
    default:
      background = colors.primary;
      break;
  }
  switch (props.size) {
    case "small":
      padding = "6px 10px";
      fontSize = "12px";
      lineHeight = "16px";
      break;
    case "large":
      padding = "12px 24px";
      fontSize = "16px";
      lineHeight = "24px";
      break;
    default:
      padding = "8px 16px";
      fontSize = "14px";
      lineHeight = "20px";
      break;
  }
  return `
    background: ${background[300]};
    color: white;
    padding: ${padding};
    font-size: ${fontSize};
    & p{
      line-height: ${lineHeight}
    }
    &:hover{
      background: ${background[400]};
    }
    &:focus{
      box-shadow: 0px 0px 0px 2px #fff, 0px 0px 0px 4px ${
        background[300]
      }, 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    ${
      !props.text
        ? `padding: 11.33px;
      border-radius: 50%;
    `
        : ""
    }
  `;
};

const StyledButton = styled.button<buttonProps>`
  /* padding: 0.5rem 1rem; */
  border-radius: 0.25rem;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  & p {
    /* font-size: 14px; */
    font-weight: 500;
    font-family: ${typography.primary};
    text-transform: uppercase;
    letter-spacing: 1.25px;
  }
  ${(props) => handleStyles(props)}
`;

export const Button = ({
  text,
  onClick,
  button_style = "primary",
  leadingIcon,
  trailingIcon,
  type = "button",
  size = "default",
}: Props) => {
  return (
    <StyledButton
      type={type}
      size={size}
      text={text}
      onClick={onClick}
      button_style={button_style}
    >
      {leadingIcon || ""}
      {text ? <p>{text}</p> : ""}
      {trailingIcon || ""}
    </StyledButton>
  );
};
