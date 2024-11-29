import styled from "styled-components";
import HeroBackground from "../../assets/images/hero-background.svg"; 

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
    @media screen and (max-width: 900px) {
        flex-direction: column;
        height: 65vh;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 740px;
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    background-color: white;
`;

export const CalendarCol = styled.div`
    width: 60%;
    padding-top: 80px;
    padding-right: 100px;
    background-color: white;
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 250px;
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

`;

export const CalContainer = styled.div`
    /* ~~~ container styles ~~~ */
    width: 700px;
    margin: auto;
    background-color: #fff;
    box-shadow: 1px 1px 10px rgba(98, 7, 7, 0.7);
    padding: 30px;
    border-radius: 10px;

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