import styled from "@emotion/styled";
import { colors } from "../../assets";

interface Props {
  bgColor: string;
  children?: any;
  onClick?: (event: any) =>void
}

const StyledBoardCard = styled.div<Props>`
  background-color: ${(props) => props.bgColor};
  width: 190px;
  height: 6rem;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-flow: column;
  cursor: pointer;
  justify-content: space-between;
`;

const BoardCardControl = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const BoardCard = ({ onClick, bgColor, children }: Props) => {
  return (
    <StyledBoardCard onClick={onClick} bgColor={bgColor}>
      
      {children}
    </StyledBoardCard>
  );
};
BoardCard.Control = BoardCardControl;
BoardCard.IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  & svg {
    color: ${colors.secondary["400"]};
  }
`;
