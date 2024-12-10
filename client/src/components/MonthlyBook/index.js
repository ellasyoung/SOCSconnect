import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";
import Footer from "../Footer";
import { AuthContext } from '../../auth/AuthProvider'; 
import { Bckgrnd, Container, Title, TextCol, CalendarCol, CalContainer, Button, Input, Submit, Line, Dim, ConfirmationModal, ModalText, ModalTitle, CloseButton } from '../WeeklyBook/WeeklyBookElements';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const calculateRecurringDates = (startDate, endDate, schedule) => {
  const recurringDates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (schedule.date) {
    let current = new Date(start);
    while (current <= end) {
      const nextDate = new Date(current.getFullYear(), current.getMonth(), parseInt(schedule.date));
      if (nextDate >= start && nextDate <= end) {
        recurringDates.push(nextDate);
      }
      current.setMonth(current.getMonth() + 1);
    }
  } else if (schedule.day && schedule.week) {
    const weekMapping = { first: 1, second: 2, third: 3, fourth: 4, last: -1 };
    const nthOccurrence = weekMapping[schedule.week.toLowerCase()];
    const dayIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(schedule.day.toLowerCase());

    let current = new Date(start);
    while (current <= end) {
      const nthDate = getNthDayOfMonth(current.getFullYear(), current.getMonth(), dayIndex, nthOccurrence);
      if (nthDate && nthDate >= start && nthDate <= end) {
        recurringDates.push(nthDate);
      }
      current.setMonth(current.getMonth() + 1);
    }
  }

  return recurringDates;
};

function getNthDayOfMonth(year, month, dayOfWeek, nth) {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  if (nth > 0) {
    let dayOffset = (dayOfWeek - firstDayOfWeek + 7) % 7;
    const nthDate = 1 + dayOffset + (nth - 1) * 7;
    const resultDate = new Date(year, month, nthDate);
    return resultDate.getMonth() === month ? resultDate : null;
  } else if (nth === -1) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfWeek = lastDayOfMonth.getDay();
    let dayOffset = (lastDayOfWeek - dayOfWeek + 7) % 7;
    const lastDate = new Date(lastDayOfMonth.setDate(lastDayOfMonth.getDate() - dayOffset));
    return lastDate.getMonth() === month ? lastDate : null;
  }

  return null;
}


const WeeklyBook = ({ meetingData, hostInfo }) => {
  const { isLoggedIn, email: loggedInEmail } = useContext(AuthContext); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [spotsLeft, setSpotsLeft] = useState(null);
  const [requesterEmail, setRequesterEmail] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  //const frontendUrl = process.env.REACT_APP_FRONTEND_URL;


  const [isConfirmed, setIsConfirmed] = useState(false);
  const toggleConfirmation = () => {
    setIsConfirmed(!isConfirmed);
    if (isConfirmed) {
      window.location.reload(); 
    }
  };

  const isDateTimePassed = (selectedDateString, selectedTimeString) => {

    const selectedDateTimeObj = new Date(selectedDateString);
    const [hour, minute] = selectedTimeString.split(/:/);
    selectedDateTimeObj.setHours(Number(hour));
    selectedDateTimeObj.setMinutes(Number(minute));
    
    const currentDateTimeObj = new Date();
   
    return currentDateTimeObj > selectedDateTimeObj;
   
  };

  const getAvailableSpots = (date) => {
    const bookingsForDate = meetingData.bookSlot.filter(
      (slot) => new Date(slot.date).toDateString() === new Date(date).toDateString()
    ).length;

    return Math.max(meetingData.maxNumParticipants - bookingsForDate, 0); 
  };

  const recurringDates = calculateRecurringDates(
    meetingData.schedule.startDate,
    meetingData.schedule.endDate,
    meetingData.schedule
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

  // Determine the first booking's month
  const firstBookingDate = recurringDates.length > 0 ? recurringDates[0] : new Date();

  const handleBook = async () => {
    if (!selectedDate) {
      alert('Please select a date before booking.');
      return;
    }

    const email = isLoggedIn ? loggedInEmail : requesterEmail;

    if (!isLoggedIn && (!email || !/\S+@\S+\.\S+/.test(email))) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/book-slot-monthly`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingId: meetingData._id,
          date: selectedDate,
          requesterEmail: email,
        }),
      });

      if (response.ok) {
        setSpotsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        toggleConfirmation();
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('An error occurred while booking the slot.');
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
            {meetingData.location && (
              <p>
                <b>Location:</b> {meetingData.location}
              </p>
            )}
            {meetingData.notes && (
              <p>
                <b>Things to note:</b> {meetingData.notes}
              </p>
            )}
            {!isLoggedIn && (
              <Line>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={requesterEmail}
                  onChange={(e) => setRequesterEmail(e.target.value)}
                />
                <Submit><FaAngleRight/></Submit>
              </Line>
            )}
            <Button onClick={handleBook} disabled={(!isLoggedIn && (!requesterEmail || !/\S+@\S+\.\S+/.test(requesterEmail))) || 
              isDateTimePassed(selectedDate, meetingData.schedule.startTime) || spotsLeft === 0}>
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
                  defaultActiveStartDate={firstBookingDate} // Start on the first booking's month
                />
              </CalContainer>
            </CalendarCol>
        </Container>
        
        {isConfirmed && (
          <Dim>
            <ConfirmationModal>
              <CloseButton onClick={toggleConfirmation} />
              <ModalTitle>Booking Confirmed!</ModalTitle>
              <ModalText>                
                  {`This meeting will occur on ${selectedDate.toDateString()} from ${new Date(`1970-01-01T${meetingData.schedule.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                   - ${new Date(`1970-01-01T${meetingData.schedule.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    with ${hostInfo.firstName} ${hostInfo.lastName}
                  `}
              </ModalText>
              <Button className='seeApts' as={Link} to="/my-appointments">See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/></Button>
            </ConfirmationModal>
        </Dim>
        )}

      </Bckgrnd>
      <Footer />
    </>
  );
};

export default WeeklyBook;