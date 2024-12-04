import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 
import { FaTrash, FaEdit, FaTimes, FaPaperPlane } from "react-icons/fa";

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
    height: 135vh;
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

  @media screen and (max-width: 1030px) {
    height: 130vh;
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

export const Form = styled.form`
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`;

export const TitleCont = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 20px;
`;

export const TitleInput = styled.input`
  width: 90%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  border-radius: 5px;
  outline: none;
  font: Arial;
  margin-left: 30px;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }
`;

export const ColCont = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
`;

export const Col = styled.div`
    width: 40%; 
`;

export const Center = styled.div`
    width: 20%;
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 100%;
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
  gap: 10px;

  &:hover {
    background-color:  #620707;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }
`;

export const Dropdown = styled.div`
    border: 3px solid #cd2222;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    margin-bottom: 30px;
    width: 80%;
`;

export const DropTitle = styled.div`
    font-weight: bold;
    color: #cd2222;
    font-size: 18px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const Time = styled.p`
    font-size: 14px;
`;

export const Trash = styled(FaTrash)`
  font-size: 20px; 
  color: #cd2222;
  background-color: white; 
  border-radius: 50%;
  padding: 10px 10px; 
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-left: 15px;
  margin-top: 8px;

  &:hover {
    color: #fff;
    background-color: #cd2222; 
    transform: scale(1.1) rotate(360deg); 
  }
`;

export const Edit = styled(FaEdit)`
  font-size: 20px; 
  color: #cd2222;
  background-color: white; 
  border-radius: 20%;
  padding: 10px 10px; 
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-left: 15px;
  margin-top: 8px;

  &:hover {
    color: #fff;
    background-color: #cd2222; 
    transform: scale(1.1) rotate(360deg); 
  }
`;

export const DropRow = styled.div`
    display: flex;
    width: 100%;
`;

export const ConfirmationModal = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  box-shadow: 8px 8px 10px rgba(98, 7, 7, 0.7);

  @media screen and (max-width: 900px) {
    width: 600px;
    margin-top: -100px;
  }
  @media screen and (max-width: 700px) {
    width: 400px;
    height: 400px;
    margin-top: -100px;
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
  z-index: 20;
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

export const ModalTitle = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 50px;
  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`;

export const ModalText = styled.p`
  font-family: Arial, sans-serif;
  color: #000;
  font-size: 16px;
  line-height: 1.6;
  width: 450px;
  margin-top: -10px;

  &.label {
    width: auto;
    font-weight: bold;
    margin-right: 20px;
    margin-top: 18px;
  }

  @media screen and (max-width: 900px) {
    font-size: 14px;
    &.label {
      margin-top: 14px;
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 700px) {
    width: 320px;
    &.label {
      display: none;
    }
  }
`;

export const ModalLink = styled.a`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-right: 30px;

  border: 2px solid;
  border-color: #cd2222;
  color: #cd2222;
  border-radius: 5px;
  padding: 10px;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover{
    background-color: #cd2222;
    color: white;
  }

  @media screen and (max-width: 900px) {
    font-size: 14px;
    margin-right: 20px;
  }
  @media screen and (max-width: 700px) {
    font-size: 10px;
    margin-right: 20px;
    width: 200px;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledSendIcon = styled(FaPaperPlane)`
  font-size: 20px; 
  color: white;
  background-color: #cd2222; 
  border-radius: 5px;
  padding: 16px 16px 16px 14px; 
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-top: 30px;
  box-shadow: 3px 3px 5px rgba(98, 7, 7, 0.7);

  &:hover {
    color: #fff;
    transform: scale(1.1); 
  }

  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start; 
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  gap: 10px;  

  &.conf{
    gap: 0px; 
    margin-top: 20px;
  }
  
  @media screen and (max-width: 1030px) {
    width: 100%; 
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

  &.label{
    margin-bottom: 10px;
  }
`;

export const SendIcon = ({ link }) => {
  const handleCopyToClipboard = () => {
      if (!link) {
          alert("No link provided to copy.");
          return;
      }

      navigator.clipboard.writeText(link)
          .then(() => {
              alert("Link copied to clipboard!");
          })
          .catch((err) => {
              console.error("Failed to copy: ", err);
              alert("Failed to copy the link. Please try again.");
          });
  };

  return <StyledSendIcon onClick={handleCopyToClipboard} />;
};

export default SendIcon;

