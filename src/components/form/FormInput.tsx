import styled from "@emotion/styled";
import { colors } from "../../assets";
import { typography } from "../../assets/typography";
type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: JSX.Element;
  onChange?: (e: any) => void;
  type?: string;
  defaultValue?: string;
};

const StyledFormInput = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
  & label {
    text-transform: uppercase;
    font-family: ${typography.primary};
    letter-spacing: 1.5px;
    font-size: 12px;
    color: ${colors.secondary["400"]};
  }
  & .input-container {
    background-color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 12px;
    width: 100%;
    border: 1px solid ${colors.secondary["200"]};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    gap: 11px;
    color: ${colors.secondary["300"]};
    & input {
      font-size: 1rem;
      width: 100%;
      border: none;
      outline: none;
      &::placeholder {
        color: ${colors.secondary["200"]};
      }
    }
  }
`;

export const FormInput = ({
  label,
  name,
  placeholder,
  onChange,
  icon,
  defaultValue = undefined,
  type = "text",
}: Props) => {


  return (
    <StyledFormInput>
      {label ? <label>{label}</label> : ""}
      <div className="input-container">
        {icon || ""}
        <input
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      </div>
    </StyledFormInput>
  );
};
