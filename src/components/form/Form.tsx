import styled from "@emotion/styled";
import { FormInput } from "./FormInput";
import React, { useState } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  onSubmit: (e: any) => void;
};

const StyledForm = styled.form`
  /* display: flex;
  /* min-height: 100vh; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-flow: column; */
  /* gap: 2rem;  */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    min-width: 30rem;
    gap: 1rem;
  & button {
    width: 100%;
  }
`;

export const Form = ({ children, onSubmit }: Props) => {
  const [inputs, setInputs] = useState({});
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const ModifiedInputs = React.Children.map(children, (child: any) => {
    if (React.isValidElement(child)) {
      if (child.type === FormInput) {
        return React.cloneElement(child, { onChange: handleChange } as any);
      }
    }
    return child;
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(inputs);
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      {ModifiedInputs}
    </StyledForm>
  );
};

Form.Input = FormInput;
