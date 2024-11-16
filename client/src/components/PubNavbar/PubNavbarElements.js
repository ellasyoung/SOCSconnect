import styled from "styled-components";

export const Nav = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 12;
  position: sticky;
  top: 0;
  font-size: 18px;
  background-color: white;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    justify-content: space-between;
    padding: 0 10px;
  }
`;

export const NavLogo = styled.img`
  width: 300px;
  height: auto;
  display: flex;

  @media screen and (max-width: 1100px) {
    width: 200px;
  }
`;

export const Dropdown = styled.div`
  display: none;
  align-items: center;
  margin-left: auto;
  gap: 50px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 10px;
    background-color: white;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    align-items: left;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 50px;

  @media screen and (max-width: 900px) {
    display: none;
  }
}
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  color: black;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-family: Arial;

  &:hover {
    text-decoration: underline;
    color: #cd2222;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 900px) {
    gap: 20px;
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  padding: 15px 30px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: block;
  font-family: Arial;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }

  &.register {
    background-color: black;
  }

  &.sign-in {
    background-color: #cd2222;
  }

  @media screen and (max-width: 900px) {
    width: 75%;
    padding: 15px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
`;

export const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  color: #cd2222;
  font-size: 50px;
  gap: 5px;
  @media screen and (max-width: 900px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 4px;
    background-color: black;
  }
`;





