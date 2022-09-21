import { Link } from "react-router-dom";
import { Button } from "../button";
import styled from "@emotion/styled";
import { FormInput } from "./FormInput";
import React, { useState } from "react";

type Props = {
  subject: "Login" | "Create Account";
  children: string | JSX.Element | JSX.Element[];
  to: string;
  onSubmit: (e: any) => void;
};

const StyledForm = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 2rem;
  & form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    width: 30rem;
    gap: 32px;
  }
  & button {
    width: 100%;
  }
  & .fields {
    display: flex;

    flex-flow: column;
    gap: 1rem;
    width: 100%;
  }
`;

export const Form = ({ children, subject, to, onSubmit }: Props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const ModifiedInputs = React.Children.map(children, (child: any) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onChange: handleChange } as any);
    }
    return child;
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(inputs);
  };
  return (
    <StyledForm>
      <header>
        <h2>{"{ organizable }"}</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>{subject}</h1>
        <div className="fields">{ModifiedInputs}</div>
        <Button text={subject} button_style="secondary" />
      </form>
      <footer>
        <Link to={to}>{subject === "Login" ? "Create Account" : "Login"}</Link>
      </footer>
    </StyledForm>
  );
};

Form.Input = FormInput;
