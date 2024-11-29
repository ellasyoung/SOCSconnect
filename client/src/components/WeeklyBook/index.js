import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";
import Footer from "../Footer";
import { AuthContext } from '../../auth/AuthProvider'; 
import { Bckgrnd, Container, Title, TextCol, CalendarCol, CalContainer, Button } from './WeeklyBookElements';
import { FaAngleRight } from "react-icons/fa";

const calculateRecurringDates = (startDate, endDate, dayOfWeek) => {
  const recurringDates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(dayOfWeek.toLowerCase());

  let current = new Date(start);

  while (current <= end) {
    if (current.getDay() === dayIndex) {
      recurringDates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1); 
  }

  return recurringDates;
};

const WeeklyBook = ({ meetingData, hostInfo }) => {
  const { isLoggedIn } = useContext(AuthContext); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [spotsLeft, setSpotsLeft] = useState(null);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const toggleConfirmation = () => {
    setIsConfirmed(!isConfirmed);
  };

  const getAvailableSpots = (date) => {
    const bookingsForDate = meetingData.bookSlot.filter(
      (slot) => new Date(slot.date).toDateString() === new Date(date).toDateString()
    ).length;

    return Math.max(meetingData.maxNumParticipants - bookingsForDate, 0); // Ensure non-negative value
  };

  const recurringDates = calculateRecurringDates(
    meetingData.schedule.startDate,
    meetingData.schedule.endDate,
    meetingData.schedule.dayOfWeek
  );

  const isRecurringDate = (date) => {
    return recurringDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date) => {
    if (isRecurringDate(date)) {
      setSelectedDate(date);
      setSpotsLeft(getAvailableSpots(date));
    }
  };

  return (
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      <Bckgrnd>
        <Container>
          <TextCol>
            <Title>{meetingData.title}</Title>
            <p>
              <b>With: </b>{hostInfo.firstName} {hostInfo.lastName}
            </p>
            <p>
              <b>Start Time:</b> {new Date(`1970-01-01T${meetingData.schedule.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p>
              <b>End Time:</b> {new Date(`1970-01-01T${meetingData.schedule.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p>
                <b>Selected Date:</b> {selectedDate ? selectedDate.toDateString() : "please select a date"}
            </p>
            <p>
                <b>Spots Left:</b> {selectedDate ? `${spotsLeft} / ${meetingData.maxNumParticipants}` : "please select a date to see the number of spots available"}
            </p>
            <Button>
              Book
              <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
            </Button>
          </TextCol>
          <CalendarCol>
              <CalContainer>
                <Calendar
                  value={selectedDate}
                  onClickDay={handleDateClick}
                  tileClassName={({ date, view }) => 
                    view === 'month' && isRecurringDate(date) ? 'recurring-date' : null
                  }
                />
              </CalContainer>
            </CalendarCol>
        </Container>
      </Bckgrnd>
      <Footer />
    </>
  );
};


export default WeeklyBook;
