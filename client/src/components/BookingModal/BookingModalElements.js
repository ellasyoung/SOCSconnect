import styled from "styled-components";
import ClockBackground from "../../assets/images/clock-background.svg"; 

export const Bckgrnd = styled.div`
  width: 100%;
  height: 95vh;
  position: relative;
  background: url(${ClockBackground});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OuterModal = styled.div`
  width: 60%;
  margin-top: -50px;
  height: 40vh;
  min-height: 270px;
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
  width: 90%;
  height: 80%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 40px;

  @media screen and (max-width: 900px){
    text-align: center;
  }

  @media screen and (max-width: 550px){
    text-align: center;
    font-size: 30px
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
 
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
  position: relative
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #cd2222;
  border-radius: 5px;
  outline: none;

  &#url{
    width: 400px;
  }

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  @media screen and (max-width: 900px){
    &#url{
      width: 325px;
    }
  }

  @media screen and (max-width: 720px) {
    width: 300px;
    font-size:10px;
    &#url{
      width: 155px;
    }
  }

  @media screen and (max-width 550px){
    font-size: 7px;
  }
`;

