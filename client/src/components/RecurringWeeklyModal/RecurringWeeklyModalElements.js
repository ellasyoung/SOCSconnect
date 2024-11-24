import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 

export const Bckgrnd = styled.div`
  width: 100%;
  min-height: 800px;
  height: 95vh;
  position: relative;
  background: url(${HeroBackground});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1030px) {
    height: 120vh;
  }
`;

export const ModalContainer = styled.div`
  width: 90%;
  height: 95%;
  position: relative;
  margin-top: 100px;
`;

export const UpperModal = styled.div`
  width: 300px;  
  height: 45px;  
  background-color: white;
  border-radius: 15px 15px 0 0;  
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 1;
  border: 5px solid #cd2222;
`;

export const InnerModal = styled.div`
  width: 100%; 
  height: 92%; 
  background-color: white;
  border-radius: 0 15px 15px 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 0;
  border: 5px solid #cd2222;
  border-bottom: none;
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 20px;
  margin-bottom: 20px;
  width: 100px;

  display: flex;
  align-items: center;
  
    
`;

export const Form = styled.form`
  width: 80%;
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;  
  justify-content: space-between;
  gap: 20px; 
  
  @media screen and (max-width: 1030px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start; 
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  gap: 10px;  
  
  @media screen and (max-width: 1030px) {
    width: 100%; 
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 10px;

  @media screen and (max-width: 1030px) {
    width: 100%; 
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  width: 50%;

  @media screen and (max-width: 1030px) {
    width: 100%; 
    margin-top: 0px;
  }
`

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
  width: 100%;
  padding: 15px;
  font-size: 16px;
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: white; 
  font: Arial;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  @media screen and (max-width: 1525px) {
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    width: 150px;
    font-size: 12px;
  }
`;

export const TitleInput = styled.input`
  width: 500px;
  height: 26px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  border-radius: 5px;
  outline: none;
  font: Arial;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  @media screen and (max-width: 550px) {
    width: 300px;
  }

  @media screen and (max-width: 500px) {
    width: 300px;
    font-size: 12px;
  }
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 300px;
  height: 50px;
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
  margin-top: 45px;

  &:hover {
    background-color:  #620707;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }

  @media screen and (max-width: 1030px) {
    width: 100%; 
    margin-top: 0px;
  }
`;

export const Text = styled.p`
  padding-bottom: 5px;
  font-size: 20px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  color: #cd2222;
  margin-bottom: 10px;
`;
