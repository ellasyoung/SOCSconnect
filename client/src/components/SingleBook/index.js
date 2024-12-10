import React, { useState, useContext, useEffect } from 'react';
import {
  Bckgrnd,
  Container,
  TextCol,
  Title,
  Line,
  Input,
  Submit,
  Button,
  CalendarCol,
  CalContainer,
  Dim,
  ConfirmationModal,
  CloseButton,
  ModalTitle,
  ModalText,
} from '../WeeklyBook/WeeklyBookElements';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from '../../auth/AuthProvider';
import Calendar from 'react-calendar'; 
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";

const SingleDayBook = ({ meetingData, hostInfo }) => {
  const { isLoggedIn, email: loggedInEmail } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [spotsLeft, setSpotsLeft] = useState(null);
  const [requesterEmail, setRequesterEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const normalizeDate = (dateString, timeString) => {
    const [year, month, day] = dateString.split(/[-T]/);
    const [hour, minute] = timeString.split(/:/);
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  };

  useEffect(() => {
    setSelectedDate(normalizeDate(meetingData.date, meetingData.startTime));
    const bookingsForDate = meetingData.bookings.length;
    setSpotsLeft(Math.max(meetingData.maxNumParticipants - bookingsForDate, 0));
  }, [meetingData]);

  const toggleConfirmation = () => {
    setIsConfirmed(!isConfirmed);
    if (isConfirmed) {
      window.location.reload(); 
    }
  };


  const isDateTimePassed = (selectedDateTime) => {
    if (!selectedDateTime) return false;
  
    const currentDateTimeObj = new Date();
    const selectedDateTimeObj = new Date(selectedDateTime);
    
    return currentDateTimeObj > selectedDateTimeObj;
   
  };
  
  const handleBook = async () => {
    const email = isLoggedIn ? loggedInEmail : requesterEmail;

    if (!isLoggedIn && (!email || !/\S+@\S+\.\S+/.test(email))) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/book-slot-single`, {
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
              <b>Date:</b> {selectedDate ? selectedDate.toDateString() : "Loading..."}
            </p>
            <p>
              <b>Start Time:</b> {new Date(`1970-01-01T${meetingData.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p>
              <b>End Time:</b> {new Date(`1970-01-01T${meetingData.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
            <p>
              <b>Spots Left:</b> {`${spotsLeft} / ${meetingData.maxNumParticipants}`}
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
            <Button onClick={handleBook} disabled={spotsLeft === 0 || isDateTimePassed(selectedDate)}>
              Book
              <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
            </Button>
          </TextCol>
          <CalendarCol>
            <CalContainer>
              <Calendar
                value={selectedDate}
                tileDisabled={() => true} 
                tileClassName={({ date, view }) => 
                  view === 'month' && selectedDate? (selectedDate.toDateString() === date.toDateString() ? 'selected-date' : null) : null
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
                {`This meeting is scheduled for ${selectedDate.toDateString()} from ${new Date(`1970-01-01T${meetingData.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(`1970-01-01T${meetingData.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} with ${hostInfo.firstName} ${hostInfo.lastName}.`}
              </ModalText>
              <Button className="seeApts" as={Link} to="/my-appointments">
                See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
              </Button>
            </ConfirmationModal>
          </Dim>
        )}
      </Bckgrnd>
    </>
  );
};

export default SingleDayBook;
