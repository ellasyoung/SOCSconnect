//Natalie Doehla
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

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

export const ProfileDropdown = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 8px 8px 10px rgba(98, 7, 7, 0.7);

  @media screen and (max-width: 700px) {
    width: 300px;
    margin-top: -100px;
  }
`;



export const LogoutBtn = styled.button`
  padding: 15px 30px;
  width: 300px;
  border: none;
  color: white;
  background-color: #cd2222;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  font-family: Arial;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color:  #620707;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }

  @media screen and (max-width: 700px) {
    width: 150px;
  }
`;

export const Dim = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 10;
`;

export const CloseButton = styled(FaTimes)`
  font-size: 24px; 
  color: #cd2222;
  background-color: white; 
  border-radius: 50%;
  padding: 8px; 
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  position: absolute;
  top: 25px;
  right: 25px;

  &:hover {
    color: #fff;
    background-color: #cd2222; 
    transform: scale(1.1) rotate(360deg); 
  }

  @media screen and (max-width: 700px) {
    top: 15px;
    right: 15px;
  }
`;


