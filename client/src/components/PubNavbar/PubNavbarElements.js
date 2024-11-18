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
  flex-direction: column;
  position: absolute;
  top: 80px;
  right: 0;
  background-color: white;
  width: 100%;
  padding: 0; /* Remove extra padding */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 900px) {
    display: flex;
    align-items: flex-start; /* Align items to the start (left) */
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
    margin-top: 30px;
  }
`;

export const NavLink = styled.a`
  color: black;
  font-size: 14px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-family: Arial;

  &:hover {
    text-decoration: underline;
    color: #cd2222;
  }

  @media screen and (max-width: 900px){
    width: 100%;
    text-align: left; 
    padding-top: 15px; 
    padding-bottom: 15px;
    padding-left: 9%;
    display: block; 

    &.top {
      padding-top: 30px;
    }

  }

`;


export const ButtonContainer = styled.div`
  display: flex;
  gap: 40px;

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
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  display: block;
  font-family: Arial;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);

  &.register:hover {
      background-color: #620707;
  }

  &.sign-in:hover {
      background-color: #620707;
  }

  &.register {
      background-color: black;
  }

  &.sign-in {
      background-color: #cd2222;
      margin-right: 30px;
  }

  @media screen and (max-width: 900px) {
    width: 76%;
    padding: 15px;
    margin-left: 9%;

    &.register {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    
    &.sign-in{
      margin-bottom: 30px;
    }
  }
`;

export const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  color: #cd2222;
  font-size: 40px;
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





