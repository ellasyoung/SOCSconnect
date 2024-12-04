import styled from "styled-components";
import { FaTimes, FaTrash } from "react-icons/fa";

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
  z-index: 20;
`;

export const ConfirmationModal = styled.div`
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  box-shadow: 8px 8px 10px rgba(98, 7, 7, 0.7);

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
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 30px;
  position: absolute;
  top: 15px;
  left: 35px;
`;

export const Form = styled.form`
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
`;

export const Times = styled.div`
    height: 280px;
    margin-bottom: 20px;
    overflow-y: scroll;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start; 
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  gap: 10px;

  &.date{
    margin-bottom: 20px;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: black;
  width: 200px;  
  margin-right: 10px;  
`;

export const Input = styled.input`
  width: 250px;
  padding: 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: white; 
  font: Arial;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    align-items: center; 
    justify-content: space-between;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 15px 30px;
  width: 86%;
  border: none;
  color: white;
  background-color: #620707;
  font-size: 14px;
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
  gap: 10px;

  &:hover {
    background-color: black;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }

  &.sub{
    width: 280px;
    background-color: #cd2222;
    &:hover {
        background-color: #620707;
        box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
    }
  }
`;

export const Trash = styled(FaTrash)`
  font-size: 30px; 
  color: #cd2222;
  background-color: white; 
  border-radius: 50%;
  margin-right: 25px;
  margin-left: -20px;
  margin-top: 10px;
  padding: 6px 14px; 
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #cd2222; 
    transform: scale(1.1) rotate(360deg); 
  }
`;