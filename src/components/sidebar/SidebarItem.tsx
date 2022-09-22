import styled from "@emotion/styled";
import { colors } from "../../assets";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: any;
  selected: boolean;
};

const StyledItem = styled(Link)<{ selected: boolean }>`
  display: flex;
  border-left: 4px solid white;
  width: 100%;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 11px;
  font-size: 1rem;
  color: ${colors.secondary["300"]};
  & svg {
    font-size: 18px;
  }

  ${(props) =>
    props.selected
      ? `
    background: ${colors.primary["100"]};
    border-left-color: ${colors.primary["500"]};
    color: black;`
      : ""}
`;

export const SidebarItem = ({ children, to, selected }: Props) => {
  return (
    <StyledItem selected={selected} to={to}>
      {children}
    </StyledItem>
  );
};
