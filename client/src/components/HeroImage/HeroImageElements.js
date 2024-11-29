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
    flex-direction: row;
    @media screen and (max-width: 900px) {
        flex-direction: column;
        height: 65vh;
    }
`;

export const BirdComputer = styled.img`
    width: 27%;
    height: auto;
    padding-right: 5%;
    margin-top: -30px;
    @media screen and (max-width: 900px) {
        width: 50%;
    }
`;

export const HeroDescription = styled.div`
    width: 53%;
    padding-left: 7%;
    margin-top: -70px;
    @media screen and (max-width: 900px) {
        display: none;
    }
`;

export const Title = styled.h1`
  font-family: 'SunbornSansOne', sans-serif;
  color: white;
  text-shadow: 2px 2px 5px rgba(98, 7, 7, 0.8);

  &.line1{
    font-size: 50px;
    margin-bottom: 0px;
  }
  &.line2{
    font-size: 64px;
    margin-top: 0px;
  }

  @media screen and (max-width: 1420px) {
    &.line1{
        font-size: 35px;
    }
    &.line2{
        font-size: 54px;
    }
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const Title2 = styled.h2`
  font-family: Arial, sans-serif;
  color: white;
  text-shadow: 2px 2px 2px rgba(98, 7, 7, 0.6);
  font-size: 20px;
  font-weight: bold;
  margin-top: -40px;

  @media screen and (max-width: 1420px) {
    margin-top: -30px;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }

`;

export const Blurb = styled.p`
  width: 80%;
  font-family: Arial, sans-serif;
  color: white;
  text-shadow: 2px 2px 2px rgba(98, 7, 7, 0.2);
  font-size: 16px;
  line-height: 1.5;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const Button = styled.a`
    padding: 15px 30px;
    border: none;
    color:  #620707;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
    display: block;
    font-family: Arial;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
    background-color: white;
    width: 250px;
    margin-top: 30px;
    box-shadow: 4px 4px 5px rgba(98, 7, 7, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: white;
        background-color: #620707;
        box-shadow: 4px 4px 5px rgba(255, 255, 255, 0.7);
    }

    &.mobile-button {
      display: none;
    }

    @media screen and (max-width: 900px) {
      &.mobile-button {
        margin-top: 40px;
        display: flex;
      }
    }
`;