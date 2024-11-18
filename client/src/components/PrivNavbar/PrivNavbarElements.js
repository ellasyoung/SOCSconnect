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
  box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);

  @media screen and (max-width: 1100px) {
    justify-content: space-between;
    padding: 0 10px;
  }
`;

export const NavLogo = styled.img`
  width: 300px;
  height: auto;
  display: flex;

  @media screen and (max-width: 1200px) {
    width: 200px;
  }
`;

export const ProfLogo = styled.img`
  width: 45px;
  height: auto;
  display: flex;
  margin-left: 40px;
  margin-right: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(0.9);
  }
`;

export const Dropdown = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 80px;
  height: 250px;
  right: 0;
  background-color: white;
  width: 100%;
  padding: 0; /* Remove extra padding */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1100px) {
    display: flex;
    
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 50px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
}
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: 1100px) {
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

  @media screen and (max-width: 1100px){
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
export const ProfileDropdown = styled.div`
  position: absolute;
  top: 70%; 
  right: 0;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 150px;
  z-index: 10;
  border-radius: 10px;
`;


export const ButtonContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-left: 9%;

  @media screen and (max-width: 1100px) {
    gap: 20px;
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  color: #cd2222;
  font-size: 40px;
  margin-left: auto;
  gap: 5px;
  @media screen and (max-width: 1100px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 4px;
    background-color: black;
  }
`;





