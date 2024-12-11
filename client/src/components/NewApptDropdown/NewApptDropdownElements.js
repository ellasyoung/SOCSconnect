//Ella Young
import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: Arial;
`;

export const DropdownButton = styled.button`
    background-color: #cd2222;    
    padding: 15px 30px;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    font-family: Arial;
    font-weight: bold;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);

    @media screen and (max-width: 1100px) {
      width: 86%;
    }

    &:hover {
        background-color: #620707;
    }
`;

export const DropdownContent = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  width: 205px;
`;

export const MenuItem = styled.a`
  position: relative; 
  padding: 16px 16px;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ $isHighlighted }) => ($isHighlighted ? "#cd2222" : "black")};

  &.sub{
    padding: 10px 16px;
  }

  &:hover {
    background-color: #cd2222;
    color: white;
  }
`;