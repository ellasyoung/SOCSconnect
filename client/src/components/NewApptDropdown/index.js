import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaAngleRight,
  FaAngleDown,
  FaChartBar,
  FaCalendarWeek,
  FaSync
} from "react-icons/fa";
import {
  DropdownContainer,
  DropdownButton,
  DropdownContent,
  MenuItem
} from "./NewApptDropdownElements";
import { Link } from "react-router-dom"; 

const NewApptDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isRecurringOpen, setRecurringOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleRecurring = (e) => {
    e.stopPropagation(); 
    setRecurringOpen((prev) => !prev);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        New Appointment <FaAngleDown size="1em" style={{ marginLeft: "8px" }} />
      </DropdownButton>

      <DropdownContent $isOpen={isDropdownOpen}>
        <MenuItem onClick={toggleRecurring} $isHighlighted={isRecurringOpen}>
          <FaSync size="1em" /> Recurring Meeting
        </MenuItem>

        {isRecurringOpen && (
            <div style={{ display: "block"}}>
              <MenuItem as={Link} to="/recurring-weekly" className="sub">
                <FaCalendarWeek size="1em" style={{ marginLeft: "22px" }} /> Weekly
              </MenuItem>
              <MenuItem as={Link} to="/recurring-monthly" className="sub">
                <FaCalendarAlt size="1em" style={{ marginLeft: "22px" }} /> Monthly
              </MenuItem>
            </div>
          )}

        <MenuItem href="#" onClick={() => setRecurringOpen(false)}>
          <FaAngleRight size="1em" /> Single Meeting
        </MenuItem>

        <MenuItem href="#" onClick={() => setRecurringOpen(false)}>
          <FaChartBar size="1em" /> Meeting Time Poll
        </MenuItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default NewApptDropdown;

