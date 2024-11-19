import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 

export const Bckgrnd = styled.div`
  width: 100%;
  height: 95vh;
  position: relative;
  background: url(${HeroBackground});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Col = styled.div`
`

export const OuterModal = styled.div`
  width: 70%;
  margin-top: -50px;
  height: 70vh;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const Form = styled.form`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

export const Input = styled.input`
  width: 300px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 330px;
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
`;

export const Text = styled.p`
  padding-top: 10px;
  font-size: 12px;
  font-style: italic;
  text-align: center;
`;