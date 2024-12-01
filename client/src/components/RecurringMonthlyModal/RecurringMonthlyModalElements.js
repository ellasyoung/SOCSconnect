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
    height: 147vh;
  }
`;

export const Select = styled.select`
  width: 100%;
  font-size: 16px;
  height: 56px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  
  font: Arial;
  text-align: left;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23000" d="M2 4L0 0h4z"/></svg>') no-repeat;
  background-size: 10px;
  background-position: right 15px center; 

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(98, 7, 7, 0.5);
  }

  @media screen and (max-width: 1525px) {
    width: 80%;
  }

  @media screen and (max-width: 400px) {
    width: 50%;
    font-size: 12px;
  }
`
