import styled from "@emotion/styled";
import { typography } from "../assets";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  title: string;
};

const StyledMainLayout = styled.main`
  background: #e5e5e5;
  width: 100%;
  padding: 3rem 2rem;
  font-family: ${typography.secondary};
  & h1 {
    font-family: ${typography.secondary};
  }
`;

export const MainLayout = ({ title, children }: Props) => {
  return (
    <StyledMainLayout>
      <h1>{title}</h1>
      {children}
    </StyledMainLayout>
  );
};
