import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg";
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { FaTimes } from "react-icons/fa";

export const Bckgrnd = styled.div`
    width: 100%;
    min-height: 800px;
    position: relative;
    background: url(${HeroBackground});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const Container = styled.div`
    width: 100%;
    min-height: 740px;
    margin-top: 60px;
    padding-left: 150px;
    padding-right: 150px;
    display: flex;
    flex-direction: column;
    background-color: white;
    @media screen and (max-width: 900px){
      padding-left: 50px;
      padding-right: 50px;
    }
`;

export const Title = styled.h1`
    font-family: 'SunbornSansOne', sans-serif;
    color: #cd2222;
    font-size: 40px;
    margin-top: 100px;
`;

export const Dropdown = styled.div `
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 20px;
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
    align-items: center;
    transition: color 0.1s ease;
    
    &:hover{
        color: #cd2222;
    }

`;

export const DropdownContents = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')}; 
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
  font-size: 20px;
  transition: transform 0.3s ease;
`;

export const UpArrow = styled(FaAngleUp)`
  font-size: 20px;
  transition: transform 0.3s ease;
  font-color: black;
`;

export const RequestButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: #cd2222;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 30px;
  box-shadow: 1px 1px 5px rgba(98, 7, 7, 0.2);

  &:hover{
    background-color: #620707;
  }
  @media screen and (max-width: 600px){
    font-size: 14px;
  }
`;

export const UpdateButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: #cd2222;
  color: white;
  border: none;
  display:flex;
  align-items: center;
  text-align: left;
  padding: 30px;
  box-shadow: 1px 1px 5px rgba(98, 7, 7, 0.2);

  &:hover{
    background-color: #620707;
  }

  &.polls{
    text-decoration: none;
    height: 5px;
    width: 96%;
  }

  @media screen and (max-width: 600px){
    font-size: 14px;
  }
`;

export const HistoryButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;   
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  background-color: white; 
  color: #cd2222;
  border: 3px solid #cd2222;
  display: flex;
  align-items: center; 
  text-align: left;
  padding: 30px;
  box-shadow: 1px 1px 5px rgba(98, 7, 7, 0.2);

  &:hover{
    background-color: #620707;
    color: white;
    border: 3px solid #620707;
  }

  @media screen and (max-width: 600px){
    font-size: 14px;
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
  padding: 30px 50px;
  box-shadow: 8px 8px 10px rgba(98, 7, 7, 0.7);

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

  @media screen and (max-width: 580px){
    font-size: 25px;
  }
`;

export const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 20px;

  @media screen and (max-width: 900px){
    flex-direction: column;
  }
`;


export const ControlButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  color: white; 
  border-radius: 8px;
  border: none;
  cursor: pointer;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${(props) => props.width || "200px"};
  background-color: ${(props) => props.bgColor || "#cd2222"};
  box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);
  transition: background-color 0.2s ease;

  &:hover{
    background-color: ${(props) => props.hoverColor || "#620707" };
  }

  @media screen and (max-width: 900px){
    width: 100% !important;
    margin-bottom: 20px;
  }
  
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
  top: 10px;
  right: 0px;

  &:hover {
    color: #fff;
    background-color: #cd2222; 
    transform: scale(1.1) rotate(360deg); 
  }
`;