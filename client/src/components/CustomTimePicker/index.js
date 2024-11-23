import React, { useState } from 'react';
import { TimePickerContainer, TimeInput, AmPmToggle } from "./TimePickerElements"

const CustomTimePicker = ({ onTimeChange, width }) => {
  const [time, setTime] = useState('');
  const [period, setPeriod] = useState('AM'); 
  const [isFocused, setIsFocused] = useState(false); 

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (/^[0-9:]*$/.test(value)) {
      setTime(value);
      onTimeChange(value, period);
    }
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    onTimeChange(time, newPeriod);
  };

  return (
    <TimePickerContainer>
      <TimeInput
        type="text"
        placeholder="hh:mm"
        value={time}
        onChange={handleTimeChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        width={width}
      />
      <AmPmToggle active={period === 'AM'} onClick={togglePeriod} focused={isFocused}>
        {period}
      </AmPmToggle>
    </TimePickerContainer>
  );
};

export default CustomTimePicker;
