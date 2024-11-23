import styled from 'styled-components';

export const TimePickerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TimeInput = styled.input`
  width: ${(props) => props.width || '150px'};
  padding: 15px 60px 15px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  text-align: left;

  &:focus {
    border-color: #cd2222;
    box-shadow: 0 0 5px rgba(205, 34, 34, 0.5);
  }
`;

export const AmPmToggle = styled.button`
  position: absolute;
  right: 0px;
  height: 100%;
  border: 1px solid #ccc;
  top: 50%;
  transform: translateY(-50%);
  padding: 0px 15px;
  font-size: 14px;
  border-radius: 0px 5px 5px 0px;
  transition: background-color 0.1s ease;
  background-color: ${(props) => (props.active ? '#cd2222' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;

  border-top: 1px solid ${(props) => ((props.focused || props.active) ? '#cd2222' : '#ccc')};
  border-right: 1px solid ${(props) => ((props.focused || props.active) ? '#cd2222' : '#ccc')};
  border-bottom: 1px solid ${(props) => ((props.focused || props.active) ? '#cd2222' : '#ccc')};
  border-left: 1px solid #ccc;

  &:hover {
    background-color: #620707;
    color: #fff;
  }
`;