import React, { useState, useEffect, useContext } from "react";
import {
    Bckgrnd,
    Container,
    Title, 
    Dropdown, 
    DropdownTitle, 
    DropdownContents,
    DownArrow,
    UpArrow,
    RequestButton, 
    UpdateButton, 
    HistoryButton, 
    PopupBackground,
    PopupContainer,
    PopupHeader,
    PopupTitle,
    PopupFooter,
    ControlButton,
    CloseButton,
  
} from './PrivAppointments';

import { FaBell, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../../auth/AuthProvider';

const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const normalizeDate = (dateString) => {
    const [year, month, day] = dateString.split(/[-T]/);
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

const PrivAppointments = () => {
    
    const [RequestsDropdownOpen, setRequestsDropdownOpen] = useState(false);
    const [UpcomingDropdownOpen, setUpcomingDropdownOpen] = useState(false);
    const [HistoryDropdownOpen, setHistoryDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({title: "", height: "", buttons:[]});
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [pastMeetings, setPastMeetings] = useState([]);

    const toggleRequestsDropdown = () => setRequestsDropdownOpen(!RequestsDropdownOpen); 
    const toggleUpcomingDropdown = () => setUpcomingDropdownOpen(!UpcomingDropdownOpen);
    const toggleHistoryDropdown = () => setHistoryDropdownOpen(!HistoryDropdownOpen);


    const { email } = useContext(AuthContext)


    const fetchUserDetails = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return "Unknown User";
        }

        try {
            const response = await fetch(`http://localhost:5001/api/user-info/${userId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch user details, status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.firstName && data.lastName) {
                return `${data.firstName} ${data.lastName}`;
            } else {
                throw new Error('User data is incomplete');
            }

            } catch (error) {
                console.error("Error fetching user details:", error);
                return "Unknown User"; 
        }
    };

    const getUserEmailInfo = async (email) => {
        try {
            const response = await fetch(`http://localhost:5001/api/user-info?email=${encodeURIComponent(email)}`);
    
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
    
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error('Error fetching user info:', error.message);
            throw error;
        }
    };

    
    useEffect(() => {
        const fetchRequestsWithNames = async () => {
            if (email) {
                try {
                    const response = await fetch(
                            `http://localhost:5001/api/priv-appointments/incoming-requests?requesterEmail=${encodeURIComponent(email)}`
                        );
                        const requests = await response.json();
    
                        const requestsWithNames = await Promise.all(
                            requests.map(async (request) => {
                                const requesterName = await fetchUserDetails(request.requesterId);
                              
                                const hostName = await fetchUserDetails(request.hostId);
                                
                                return {
                                    ...request,
                                    requesterName,
                                    hostName,
                                };
                           })
                        );

                        setIncomingRequests(requestsWithNames);
                    } catch (error) {
                        console.error("Error fetching requests:", error);
                    }
                }
            };
    
            fetchRequestsWithNames();
        }, [email]);

    useEffect(() => {
        const fetchMeetingsWithNames = async () => {
            if (email) {
                try {
                   
                    const response = await fetch(
                        `http://localhost:5001/api/priv-appointments/meetings?requesterEmail=${encodeURIComponent(email)}`
                    );
                    const { upcomingMeetings, pastMeetings } = await response.json();
    
                    const processMeeting = async (meeting) => {
                        let requesterName = null;
                        let hostName = null;
    
                        if (meeting.bookings) {
                            requesterName = await getUserEmailInfo(meeting.bookings[0].requesterEmail);
                            hostName = await fetchUserDetails(meeting.hostId);
                        }
    
                        if(meeting.requesterEmail) {             
                            requesterName = await getUserEmailInfo(meeting.requesterEmail); 
                            hostName = await fetchUserDetails(meeting.hostId);
                        }
    
                        return {
                            ...meeting,
                            requesterName,
                            hostName,
                        };
                    };
    
                    const processedUpcomingMeetings = await Promise.all(
                        upcomingMeetings.map(processMeeting)
                    );
    
                    const processedPastMeetings = await Promise.all(
                        pastMeetings.map(processMeeting)
                    );
    
                    setUpcomingMeetings(processedUpcomingMeetings);
                    setPastMeetings(processedPastMeetings);
                } catch (error) {
                    console.error("Error fetching meetings:", error);
                }
            }
        };
    
        fetchMeetingsWithNames();
    }, [email]);
    

    const openPopup = (data) => {
        setPopupData(data)
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    
    return (
        <>
        <Bckgrnd>
        <Container>
            <Title>My Appointments</Title>
            
            <Dropdown>
                <DropdownTitle onClick={toggleRequestsDropdown}>
                    Requests
                    {RequestsDropdownOpen ? <UpArrow /> : <DownArrow />}
                </DropdownTitle>

                <DropdownContents show={RequestsDropdownOpen}>
                    {incomingRequests.length > 0 ? (
                        incomingRequests.map((request, index) => (
                            request.mine ? ( 
                                <RequestButton 
                                    className="mine"
                                    key={request._id} 
                                    onClick={() =>
                                        openPopup({
                                            title: "Meeting Request Made", 
                                            height: "auto",
                                            buttons: [],
                                            requestDetails: request 
                                        })
                                    }
                                >
            
                                    <div style={{display: "flex", justifyContent:"space-between", width:"100%", alignItems: "center" }}>
                                        <span style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                            <FaArrowRight size={22} style={{ marginRight: "30px" }}/>
                                            {`Request made with ${request.hostName} for ${normalizeDate(request.alternateTimes[0]?.proposedDate).toLocaleDateString("en-US", {
                                                year: "numeric", 
                                                month: "long", 
                                                day: "numeric"
                                            })}`}
                                        </span>
                                        <span style={{fontWeight: "normal"}}>
                                            Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </RequestButton>
                             ) : (
                                <RequestButton 
                                    key={request._id} 
                                    onClick={() =>
                                        openPopup({
                                            title: "Meeting Request", 
                                            height: "auto",
                                            buttons: [
                                                {text: "Accept", icon: FaCheckCircle},
                                                {text: "Deny", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"},
                                                {text: "Propose Different Time", icon: FaArrowRight, width: "300px", bgColor: "#620707", hoverColor: "#cd2222"},
                                            ],
                                            requestDetails: request 
                                        })
                                    }
                                >
            
                                    <div style={{display: "flex", justifyContent:"space-between", width:"100%", alignItems: "center" }}>
                                        <span style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                            <FaBell size={22} style={{ marginRight: "30px" }}/>
                                            {`New Request from ${request.requesterName} for ${normalizeDate(request.alternateTimes[0]?.proposedDate).toLocaleDateString("en-US", {
                                                year: "numeric", 
                                                month: "long", 
                                                day: "numeric"
                                            })}`}
                                        </span>
                                        <span style={{fontWeight: "normal"}}>
                                            Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </RequestButton>
                            )    
                                ))
                            ) : ( 
                                <p style={{marginLeft: "20px", marginTop: "0px"}}><b>No Incoming Requests</b></p>
                    )}
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleUpcomingDropdown}>
                    Upcoming
                    {UpcomingDropdownOpen ? <UpArrow /> : <DownArrow />}
                    </DropdownTitle>
                    <DropdownContents show={UpcomingDropdownOpen}>
                        {upcomingMeetings.length > 0 ? (
                            upcomingMeetings.map((meeting, index) => (
                                <UpdateButton
                                    key={meeting._id}
                                    onClick={() =>
                                        openPopup({
                                            title: "Upcoming Meeting",
                                            height: "auto",
                                            buttons: [
                                                {text: "Cancel", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"}
                                            ],
                                            requestDetails: meeting 
                                        })
                                    }
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <span style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                            <FaCalendarAlt size={22} style={{ marginRight: "30px" }} />
                                            {`Meeting with ${meeting.hostName} on ${normalizeDate(meeting.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}`}
                                        </span>
                                    </div>
                                </UpdateButton>
                            ))
                        ) : (
                            <p style={{marginLeft: "20px", marginTop: "0px"}}><b>No Upcoming Meetings</b></p>
                        )}
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleHistoryDropdown}>
                    History
                    {HistoryDropdownOpen ? <UpArrow /> : <DownArrow />}
                </DropdownTitle>
                <DropdownContents show={HistoryDropdownOpen}>
                    {pastMeetings.length > 0 ? (
                        pastMeetings.map((meeting, index) => (
                            <HistoryButton
                                key={meeting._id}
                                onClick={() =>
                                    openPopup({
                                        title: "Past Meeting",
                                        height: "275px",
                                        buttons: [],
                                        requestDetails: meeting,
                                    })
                                }
                            >
                                <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center",}}>
                                    <span style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
                                        <FaClock size={22} style={{ marginRight: "30px" }} />
                                        {`Past Appointment with ${meeting.hostName} on ${normalizeDate(
                                            meeting.date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}`}
                                    </span>
                                </div>
                            </HistoryButton>
                        ))
                    ) : (
                        <p style={{marginLeft: "20px", marginTop: "0px"}}><b>No Past Meetings</b></p>
                    )}
                </DropdownContents>
            </Dropdown>

            {showPopup && (
                <PopupBackground onClick={closePopup}>
                    <PopupContainer
                        height={popupData.height}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PopupHeader>
                                <PopupTitle>{popupData.requestDetails?.date ? popupData.requestDetails.title: "Meeting Request"}</PopupTitle>
                                <CloseButton onClick={closePopup}></CloseButton>
                            </PopupHeader>

                        {popupData.requestDetails && (
                            <>
                                {popupData.requestDetails.date ? (
                                    
                                    <>
                                        <b>With:</b> {popupData.requestDetails.hostName}<br /><br />
                                        <b>Date:</b> {normalizeDate(popupData.requestDetails.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}<br /><br />
                                        <b>Start Time:</b> {formatTime(popupData.requestDetails.startTime)}<br /><br />
                                        <b>End Time:</b> {formatTime(popupData.requestDetails.endTime)}<br /><br />
                                    </>
                                ) : (
                                    <>
                                        {popupData.requestDetails.alternateTimes && popupData.requestDetails.alternateTimes.length > 0 && (
                                            <>
                                                <b>From:</b> {popupData.requestDetails.requesterName}<br /><br />
                                                <b>For:</b> {popupData.requestDetails.hostName}<br /><br />
                                                <b>Date:</b> {normalizeDate(popupData.requestDetails.alternateTimes[0].proposedDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}<br /><br />
                                                <b>Start Time:</b> {formatTime(popupData.requestDetails.alternateTimes[0].proposedStartTime)}<br /><br />
                                                <b>End Time:</b> {formatTime(popupData.requestDetails.alternateTimes[0].proposedEndTime)}<br /><br />
                                                <b>Status:</b> {popupData.requestDetails.requestStatus}<br /><br />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        <PopupFooter>
                            {popupData.buttons.map((button, index) => (
                                <ControlButton
                                    key={index}
                                    bgColor={button.bgColor}
                                    hoverColor={button.hoverColor}
                                    style={{ width: button.width }}
                                >
                                    {button.text}
                                    <button.icon size={15} />
                                </ControlButton>
                            ))}
                        </PopupFooter>
                    </PopupContainer>
                </PopupBackground>
            )}


        </Container>
        </Bckgrnd>
        </>
    
    )
};

export default PrivAppointments;