import styled from "styled-components";

export const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DateInput = styled.input`
  width: ${(props) => props.width || '200px'};
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif; 
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(205, 34, 34, 0.5);
  }
`;
