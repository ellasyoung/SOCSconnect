import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";
import Footer from "../Footer";
import { AuthContext } from '../../auth/AuthProvider'; 
import { Bckgrnd, Container, Title, TextCol, CalendarCol, CalContainer, Button, Input, Submit, Line, Dim, ConfirmationModal, ModalText, ModalTitle, CloseButton } from './WeeklyBookElements';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const { isLoggedIn, email: loggedInEmail } = useContext(AuthContext); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [spotsLeft, setSpotsLeft] = useState(null);
  const [requesterEmail, setRequesterEmail] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const toggleConfirmation = () => {
    setIsConfirmed(!isConfirmed);
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
      const response = await fetch(`${backendUrl}/api/book-slot-weekly`, {
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
        //alert('Booking successful!');
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
            <Button onClick={handleBook} disabled={!isLoggedIn && (!requesterEmail || !/\S+@\S+\.\S+/.test(requesterEmail))}>
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
