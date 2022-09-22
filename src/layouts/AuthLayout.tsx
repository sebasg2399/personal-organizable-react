import styled from "@emotion/styled";

export const AuthLayout = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 2rem;
  & header{
    display:flex;
    flex-flow: column;
    align-items:center;
    gap: 2rem;
  }
`;