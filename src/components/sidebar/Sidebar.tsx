import styled from "@emotion/styled";
import { HiOutlineViewBoards } from "react-icons/hi";
import { GoArchive } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { SidebarItem } from "./SidebarItem";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../../assets";
import { useContext } from "react";
import { UserContext } from "../../context";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const StyledSidebar = styled.aside`
  width: 240px;
  height: 100vh;
  display: flex;
  gap: 0.25rem;
  flex-flow: column;
  justify-content: space-between;
  & header {
    padding: 12px 1rem;
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 24px;
  }
  & main {
    width: 100%;
  }
  & footer {
    justify-self: flex-end;
    height: 4rem;
    border-top: 2px solid ${colors.primary["400"]};
    cursor: pointer;
    & a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 11px;
    }
    & p {
      color: ${colors.primary["400"]};
    }
  }
`;

export const Sidebar = ({ children }: Props) => {
  const { pathname } = useLocation();
  const userContext = useContext(UserContext);
  const Logout = () => {
    userContext.LogOut();
  };
  return (
    <StyledSidebar>
      <main>
        <Link to="/myboards">
          <header>
            <h2>{"{ organizable }"}</h2>
          </header>
        </Link>
        <div>
          <Sidebar.Item
            selected={pathname === "/myboards"}
            to="/myboards"
          >
            <HiOutlineViewBoards />
            <p>My Boards</p>
          </Sidebar.Item>
          <Sidebar.Item
            selected={pathname === "/closedboards"}
            to="/closedboards"
          >
            <GoArchive />
            <p>Closed Boards</p>
          </Sidebar.Item>
          <Sidebar.Item selected={pathname === "/myprofile"} to="/myprofile">
            <CgProfile />
            <p>My Profile</p>
          </Sidebar.Item>
        </div>
      </main>
      <footer onClick={Logout}>
        <Link to="/login">
          <BiLogOut size={"1.5rem"} />
          <p>Log out</p>
        </Link>
      </footer>
    </StyledSidebar>
  );
};
Sidebar.Item = SidebarItem;
