//Cienna Gin-Naccarato
import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 
import { FaTimes } from "react-icons/fa";

export const Bckgrnd = styled.div`
    width: 100%;
    height: 800px;
    position: relative;
    background: url(${HeroBackground});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    @media screen and (max-width: 1100px) {
        height: 1200px;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 740px;
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    @media screen and (max-width: 1100px) {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        height: 1140px;
    }
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: #cd2222;
  font-size: 40px;
`;

export const TextCol = styled.div`
    padding-left: 100px;
    padding-top: 80px;
    padding-right: 50px;
    width: 40%;
    @media screen and (max-width: 1100px) {
        width: 50%;
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 50px;
    }
     @media screen and (max-width: 630px) {
        width: 70%;
    }
`;

export const CalendarCol = styled.div`
    width: 60%;
    padding-top: 80px;
    padding-right: 100px;
    @media screen and (max-width: 1100px) {
        width: 100%;
        padding-right: 0px;
        padding-top: 0px;
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
  display: flex;
  justify-content: center;
  align-itmes: center;

  &:hover {
    background-color:  #620707;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.7);
  }
  
  &:disabled { 
    background-color: #c3c4c3; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  
  }

  &.seeApts{
    width: 250px;
    margin-top: 20px;
  }

  &.pollSub{
    margin-top: 0px;
  }

  &.pollSub2{
    margin-top: 0px;
    width: auto;
  }

`;

export const Submit = styled.button`
    padding: 15px;
    border: none;
    color: white;
    background-color: #cd2222;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    font-family: Arial;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-itmes: center;
    margin-left: 10px;

  &:hover {
    background-color:  #620707;
  }

`;

export const Input = styled.input`
  width: 250px;
  padding: 15px;
  font-size: 16px;
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

export const Line = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &.pollSub{
      margin-top: 0px;
    }
`;

export const CalContainer = styled.div`
    /* ~~~ container styles ~~~ */
    width: 700px;
    margin: auto;
    background-color: #fff;
    box-shadow: 1px 1px 10px rgba(98, 7, 7, 0.7);
    padding: 30px;
    border-radius: 10px;

    @media screen and (max-width: 1300px) {
        width: 500px;
    }

    @media screen and (max-width: 630px) {
        width: 350px;
    }

    /* ~~~ navigation styles ~~~ */
    .react-calendar__navigation {
        display: flex;

        .react-calendar__navigation__label {
            font-family: 'SunbornSansOne', sans-serif;
            font-weight: bold;
            font-size: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #cd2222;
            color: white;
            transition: background-color 0.3s ease;
            &:hover {
                background-color: #620707;
                color: white;
                border: 2px solid #620707;
            }
        }

        .react-calendar__navigation__arrow {
            flex-grow: 0.333;
            font-size: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #cd2222;
            color: white;
            transition: background-color 0.3s ease;
            transition: border 0.3s ease;
            &:hover {
                background-color: #620707;
                color: white;
                border: 2px solid #620707;
            }
        }
    }

    /* ~~~ label styles ~~~ */
    .react-calendar__month-view__weekdays {
        margin-top: 15px;
        text-align: center;
        text-transform: uppercase;

        abbr[title] {
            text-decoration: none;
        }
    }

    .react-calendar__month-view__weekdays__weekday{
        text-decoration: none;
    }

    /* ~~~ button styles ~~~ */
    button {
        font-size: 16px;
        font-weight: bold;
        margin: 3px;
        background-color: white;
        border: 2px solid #cd2222;
        border-radius: 3px;
        color: #cd2222;
        padding: 5px 0;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #cd2222;
            color: white;
        }

        &.recurring-date{
            background-color: #cd2222;
            color: white;
            transition: background-color 0.3s ease;
            transition: border 0.3s ease;
            &:hover {
                background-color: #620707;
                border: 2px solid #620707;
            }
        }

        &.selected-date{
          color: white;
        }
    }

    /* ~~~ day grid styles ~~~ */
    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 
        margin-top: 10px;
        
        .react-calendar__tile {
            max-width: initial !important;
            margin-top: 10px;
            width: 90%;
            margin-left: 5%;
        }

        .react-calendar__tile--range {
            background-color: #620707;
            border: 2px solid #620707;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
        }
    }

    /* ~~~ neighboring month & weekend styles ~~~ */
    .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.3;
    }

    /* ~~~ other view styles ~~~ */
    .react-calendar__year-view__months, .react-calendar__decade-view__years, .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: 20% 20% 20% 20% 20%;

        &.react-calendar__year-view__months {
        grid-template-columns: 33.3% 33.3% 33.3%;
        }
        
        .react-calendar__tile {
            max-width: initial !important;
        }
    }
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

  &.confVotes{
    height: 600px;
  }

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

  &.confVotes{
    font-size: 30px;
    position: absolute;
    top: 25px;
  }

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

export const Checkbox = styled.input`

  cursor: pointer;
  transform: scale(1.0);
  margin-right: 15px;
  width: 25px; 
  height: 25px; 
  appearance: none; 
  -webkit-appearance: none; 
  border: 1px solid #000;
  border-radius: 4px; 
  background-color: white;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  &:checked{
    background-color: #cd2222;
  }

  &:checked::before {
    content: '✓'; 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px; 
    color: white; 
  }
`;

export const CheckCont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ScrollCont = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  height: 350px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 30px;
  box-shadow: inset 0 0 5px rgba(98, 7, 7, 0.5);
`;

export const ButtonCont = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  justify-content: center;
  align-items; center;
  &.needEmail{
    justify-content: space-between;
  }
`;

export const ConfTimes = styled.div`
  text-align: left;
  border: 3px solid #cd2222;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 25px;
  width: 70%;
`;