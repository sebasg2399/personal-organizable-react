import styled from "@emotion/styled";
import { typography } from "../assets";

export const BoardLayout = styled.div<any>`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: ${(props) => props.bgColor};
  & .page-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    background: #fff;
  }
  & .page-main {
    min-height: 100%;
    padding: 2rem;
    flex-grow: 1;
    & h1 {
      font-family: ${typography.secondary};
    }
  }
`;