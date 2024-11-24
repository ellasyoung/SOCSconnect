import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 

export const Bckgrnd = styled.div`
  width: 100%;
  min-height: 1000px;
  height: 115vh;
  position: relative;
  background: url(${HeroBackground});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormGroup = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  @media screen and (max-width: 775px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const OuterModal = styled.div`
  width: 70%;
  min-height: 800px;
  height: 95vh;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 775px) {
    height: 100vh;
  }
`;

export const InnerModal = styled.div`
  width: 95%;
  height: 90%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 40px;
  margin-bottom: 50px;
  @media screen and (max-width: 775px) {
    font-size: 30px;
  }
   @media screen and (max-width: 575px) {
    font-size: 20px;
  }
`;

export const Title2 = styled.h2`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 20px;
  margin-right: 20px;
  @media screen and (max-width: 775px) {
    margin-right: 0px;
  }
`;


export const Input = styled.input`
  width: 415px;
  padding: 15px;
  height: 26px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &#startTime{
    width: 150px;
  }

  &#endTime{
    width: 150px;
  }

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  @media screen and (max-width: 775px) {
    width: 200px;
    &#startTime{
      width: 200px;
    }
    &#endTime{
      width: 200px;
    }
  }

`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 415px;
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
  margin-top: 30px;
  box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.4);

  &:hover {
    background-color:  #620707;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }

  @media screen and (max-width: 775px) {
    width: 200px;
  }

`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  width: 415px;
  @media screen and (max-width: 775px) {
    flex-direction: column;
    width: 200px;
    margin-top: 0px;
    margin-left: -30px;
  }
`;

export const TitleInput = styled.input`
  width: 100%;
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
`;