import React from 'react';
import {DatePickerContainer, DateInput } from "./DatePickerElements"

const CustomDatePicker = ({ value, onDateChange, width }) => {
  return (
    <DatePickerContainer>
      <DateInput
        type="date"
        value={value || ''}
        onChange={(e) => onDateChange(e.target.value)}
        width={width}
      />
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
