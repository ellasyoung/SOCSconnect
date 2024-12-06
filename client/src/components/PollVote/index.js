import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Bckgrnd,
  Container,
  TextCol,
  Title,
  Line,
  Input,
  Button,
  CalendarCol,
  CalContainer,
  Checkbox,
  Dim,
  ConfirmationModal,
  CloseButton,
  ModalTitle,
  CheckCont,
  ScrollCont,
  ButtonCont,
  ConfTimes,
} from '../WeeklyBook/WeeklyBookElements';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from '../../auth/AuthProvider';
import Calendar from 'react-calendar'; 
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";

const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const groupVotesByDate = (allVotes) => {
    const groupedVotes = {};
    allVotes.forEach(vote => {
        const dateKey = vote.date.toDateString();
        if (!groupedVotes[dateKey]) {
            groupedVotes[dateKey] = [];
        }
        groupedVotes[dateKey].push({
            startTime: vote.startTime,
            endTime: vote.endTime,
            requesterEmail: vote.requesterEmail,
        });
    });
    return groupedVotes;
};


const PollVote = ({ meetingData, hostInfo }) => {

    const { isLoggedIn, email } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeOptions, setTimeOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [checkVotes, setCheckVotes] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [votesByDate, setVotesByDate] = useState({});
    const [confirmVotes, setConfirmVotes] = useState({});
    const [requesterEmail, setRequesterEmail] = useState('');
    const [voteCounts, setVoteCounts] = useState({});
    const [hasVotedBefore, setHasVotedBefore] = useState(false);

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

    const toggleCheckVotes = () => {
        setCheckVotes(!checkVotes);
    };

    const normalizeDate = (dateString) => {
        const [year, month, day] = dateString.split(/[-T]/);
        return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const pollDates = meetingData.pollOption.map(option => normalizeDate(option.date));

    const fetchVoteCount = async (date, startTime, endTime) => {
        //console.log(`http://localhost:5001/api/polls/${meetingData._id}/vote-count?date=${date}&startTime=${startTime}&endTime=${endTime}`);
        try {
            const response = await fetch(`http://localhost:5001/api/polls/${meetingData._id}/vote-count?date=${date}&startTime=${startTime}&endTime=${endTime}`);
            const data = await response.json();
            return data.voteCount;
        } catch (error) {
            console.error('Error fetching vote count:', error);
        }
    };

    const checkIfVoted = useCallback(async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch(`http://localhost:5001/api/polls/${meetingData._id}/check-vote?email=${email}`);
                const data = await response.json();
                setHasVotedBefore(data.hasVoted);
            } catch (error) {
                console.error('Error checking previous votes:', error);
            }
        }
    }, [isLoggedIn, meetingData, email]);
    
    useEffect(() => {
        checkIfVoted();
    }, [checkIfVoted]);
    
    

    const handleDateClick = async (value) => {
        if (selectedDate) {
            setVotesByDate(prev => ({
                ...prev,
                [selectedDate.toDateString()]: selectedOptions,
            }));
        }
    
        const selectedPoll = meetingData.pollOption.find(
            option => normalizeDate(option.date).toDateString() === value.toDateString()
        );
    
        if (selectedPoll) {
            setSelectedDate(value);
            setTimeOptions(selectedPoll.timeOptions);
            setSelectedOptions(votesByDate[value.toDateString()] || []);
    
            const counts = {};
            for (const option of selectedPoll.timeOptions) {
                const count = await fetchVoteCount(value.toISOString(), option.startTime, option.endTime);
                //console.log(count);
                counts[`${option.startTime}-${option.endTime}`] = count || 0;
            }
            setVoteCounts(counts);
        }
    };
    
    

    const handleCheck = () =>{
        const updatedVotesByDate = {
            ...votesByDate,
            [selectedDate.toDateString()]: selectedOptions,
        };
        const validVotes = Object.values(updatedVotesByDate).some(options => options.length > 0);
        if (!validVotes) {
            alert("Please select at least one date/time before submitting.");
            return;
        }
        setVotesByDate(updatedVotesByDate);
        const allVotes = Object.entries(updatedVotesByDate).flatMap(([date, options]) =>
            options.map(option => ({
                date: new Date(date),
                startTime: option.startTime,
                endTime: option.endTime,
                requesterEmail: email,
            }))
        );
        const groupedVotes = groupVotesByDate(allVotes); 
        setConfirmVotes(groupedVotes);
        //console.log(groupedVotes); 
        toggleCheckVotes();
    };

    const handleCheckboxChange = (timeSlot) => {
        setSelectedOptions(prev =>
        prev.includes(timeSlot)
            ? prev.filter(item => item !== timeSlot)
            : [...prev, timeSlot]
        );
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/polls/${meetingData._id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    votes: Object.entries(confirmVotes).flatMap(([date, times]) =>
                        times.map(time => ({
                            date,
                            startTime: time.startTime,
                            endTime: time.endTime,
                            requesterEmail: isLoggedIn ? email : requesterEmail,
                        }))
                    ),
                }),
            });
            if (response.ok) {
                toggleCheckVotes(); 
                toggleConfirmation();
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error submitting votes:', error);
            alert('An error occurred while submitting your votes.');
        }
    };
    

    return(
        <>
        {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
        <Bckgrnd>
            <Container>
                <TextCol>
                    <Title>{meetingData.title}</Title>
                    <p>
                        <b>With: </b>{hostInfo.firstName} {hostInfo.lastName}
                    </p>
                    {hasVotedBefore && (
                        <p style={{fontStyle: "italic", color: "#cd2222"}}>
                            You have already voted in this poll. Submitting again will override your previous votes.
                        </p>
                    )}
                    {!selectedDate && (
                        <>
                            <p style={{fontStyle: "italic", color: "#cd2222"}}>Select dates on the calendar to vote on times</p>
                        </>
                    )}
                    {selectedDate && (
                    <>
                        <h3>Time Options on {selectedDate.toDateString()}</h3>
                        {timeOptions.map((option, index) => {
                        const timeKey = `${option.startTime}-${option.endTime}`;
                        const voteCount = voteCounts[timeKey] || 0; 

                        return (
                            <CheckCont key={index}>
                                <Checkbox
                                    type="checkbox"
                                    id={`time-${index}`}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                <label htmlFor={`time-${index}`}>
                                    {formatTime(option.startTime)} - {formatTime(option.endTime)} ({voteCount} votes)
                                </label>
                            </CheckCont>
                        );
                    })}
                    </>
                    )}
                    <Button type='button' onClick={handleCheck}>Submit Votes</Button>
                </TextCol>
                <CalendarCol>
                    <CalContainer>
                    <Calendar
                        tileClassName={({ date }) =>
                        pollDates.some(d => d.toDateString() === date.toDateString())
                            ? 'recurring-date'
                            : null
                        }
                        onClickDay={handleDateClick}
                    />
                    </CalContainer>
                </CalendarCol>
            </Container>
        </Bckgrnd>

        {checkVotes && (
            <Dim>
                <ConfirmationModal className="confVotes">
                    <CloseButton onClick={toggleCheckVotes}/>
                    <ModalTitle className='confVotes'>Confirm Your Selections</ModalTitle>
                    <ScrollCont>
                    {Object.entries(confirmVotes).map(([date, times]) => (
                        <ConfTimes key={date}>
                            <h4 style={{margin: '0', padding:'0'}}>{date}</h4>
                            <ul style={{marginLeft: '25px', padding:'0', marginTop: '5px', marginBottom: '5px'}}>
                                {times.map((time, index) => (
                                    <li key={index}>
                                        {formatTime(time.startTime)} - {formatTime(time.endTime)}
                                    </li>
                                ))}
                            </ul>
                        </ConfTimes>
                    ))}
                    </ScrollCont>
                    <div style={{width: '100%'}}>
                        {isLoggedIn ? 
                        <ButtonCont>
                            <Button onClick={handleSubmit} className='pollSub'>Submit</Button>
                        </ButtonCont> : 
                        <ButtonCont className='needEmail'>
                             <Line className='pollSub'>
                                <Input
                                type="email"
                                placeholder="Enter your email"
                                value={requesterEmail}
                                onChange={(e) => setRequesterEmail(e.target.value)}
                                />
                            </Line>
                            <Button onClick={handleSubmit} className='pollSub2'>Submit</Button>
                        </ButtonCont> }
                    </div>
                </ConfirmationModal>
            </Dim>
        )}
        {isConfirmed && (
          <Dim>
            <ConfirmationModal>
              <CloseButton onClick={toggleConfirmation} />
              <ModalTitle>Poll Submitted!</ModalTitle>
              <Button className="seeApts" as={Link} to="/my-appointments">
                See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
              </Button>
            </ConfirmationModal>
          </Dim>
        )}
        </>
    );

};

export default PollVote;

