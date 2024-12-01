import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg";
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

export const BckgrndBar = styled.div`
  width: 100%;
  height: 20px;
  background: url(${HeroBackground});
  background-size: cover;
`; 


export const OuterModal = styled.div`
    display: flex;
    margin-left: 50px;
    align-items: left;  
    flex-direction: column;
`;

export const Title = styled.h1`
    font-family: 'SunbornSansOne', sans-serif;
    color: #cd2222;
    font-size: 40px;
`;

export const Dropdown = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    margin-top: 10px;
    margin-bottom: 40px;
`;

export const DropdownTitle = styled.button`
    color: black; 
    font-family: 'SunbornSansOne', sans-serif; 
    font-size: 30px;
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
    gap: 10px;
    border: none;
    background-color: transparent;
    text-align: left;
  
    
    &:hover{
        color: #cd2222;
    }

`

export const DropdownContents = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};  /* Toggle visibility */
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const DropdownOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

export const DownArrow = styled(FaAngleDown)`
  font-size: 25px;
  transition: transform 0.3s ease;
`;

export const UpArrow = styled(FaAngleUp)`
  font-size: 25px;
  transition: transform 0.3s ease;
  font-color: black;
`;

export const RequestButton = styled.button`
  width: 95%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
  background-color: #cd2222;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 20px;

  &:hover{
    background-color: #620707;
  }
`;

export const UpdateButton = styled.button`
  width: 95%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
  background-color: #cd2222;
  color: white;
  border: none;
  display:flex;
  align-items: center;
  text-align: left;
  padding-left: 20px;

  &:hover{
  background-color: #620707;
  }
`;

export const HistoryButton = styled.button`
  width: 95%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  background-color: transparent; 
  color: black;
  border: 3px solid #cd2222;
  display: flex;
  align-items: center; 
  text-align: left;
  padding-left: 20px;

  &:hover{
    background-color: #620707;
    color: white;
    border: none;
  }
`;

export const PopupBackground = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  bottom: 0; 
  display: flex;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  flex-container: column;
`;

export const PopupContainer = styled.div`
  background: white;
  height: ${({height}) => height || "300px"};
  width: 780px;
  border: none;
  border-radius: 12px;
  position: relative;
  text-align: left;
  padding: 10px 20px 20px 30px;

  @media screen and (max-width: 900px){
    width: 500px;
  }

  @media screen and (max-width: 580px){
    width: 300px;
  }

`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-container: column;
  position: relative;
`;

export const PopupTitle = styled.h1`
  font-family: "SunbornSansOne", sans-serif;
  color: #cd2222;
  font-size: 30px;
  justify-content: space-between;

  @media screen and (max-width: 580px){
    font-size: 25px;
  }
`;

export const PopupCloseButton = styled.button`
  background-color: #cd2222;
  color: white;
  border-radius: 50%;
  border:none;
  height: 35px;
  width: 35px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer; 
  text-align: center;

  justify-content: center;
  flex-container: column;
  position: absolute;
  right: 10px;
  top:10px;
  

  @media screen and (max-width: 580px){
    height: 20px;
    width: 20px;
    font-size: 15px;
    display: flex;
    top: 20px;
  }
`;

export const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 20px;
`;


export const ControlButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  color: white; 
  border-radius: 12px;
  border: none;
  cursor: pointer;
  height: 40px; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${(props) => props.width || "200px"};
  background-color: ${(props) => props.bgColor || "#cd2222"};

  &:hover{
    background-color: ${(props) => props.hoverColor || "#620707" };
  }

  @media screen and (max-width: 900px){
    width: 100%;
    font-size: 12px;
  }
  
  @media screen and (max-width: 580px){
    width: 100%;
    font-size: 11px;
  }
`;

