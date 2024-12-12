//Cienna Gin-Naccarato
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
import { FaBell, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, FaVoteYea } from 'react-icons/fa';
import Loading from "../Loading";
import { AuthContext } from '../../auth/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

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
    const [pollDropdownOpen, setPollDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({title: "", height: "", buttons:[]});
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [pastMeetings, setPastMeetings] = useState([]);
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toggleRequestsDropdown = () => setRequestsDropdownOpen(!RequestsDropdownOpen); 
    const toggleUpcomingDropdown = () => setUpcomingDropdownOpen(!UpcomingDropdownOpen);
    const toggleHistoryDropdown = () => setHistoryDropdownOpen(!HistoryDropdownOpen);
    const togglePollDropdown = () => setPollDropdownOpen(!pollDropdownOpen); 


    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;


    const { email } = useContext(AuthContext)

    const openPopup = (data) => {
        setPopupData(data)
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const acceptRequest = async (requestId, requesterEmail, title) => {
        try {
            const response = await fetch(`${backendUrl}/api/priv-appointments/accept-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId, requesterEmail, title }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept request');
            }
    
            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const denyRequest = async (requestId) => {
        try {
            const response = await axios.put(`${backendUrl}/api/priv-appointments/deny-request/${requestId}`, {
                status: 'Denied',
            });
    
            if (response.status === 200) {
                console.log('Request denied successfully');
            } else {
                console.error('Failed to deny request:', response.status);
            }
            window.location.reload();
        } catch (error) {
            console.error('Error denying request:', error);
        }
    };
    
    const cancelBooking = async (meetingId, requesterEmail, cancelDate) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/priv-appointments/cancel-booking`, {
                data: { meetingId, requesterEmail, cancelDate },
            });

            if (response.status === 200) {
                console.log('Booking cancelled successfully');
                alert(
                    `The booking was cancelled successfully in ${response.data.meetingType}.`
                );
            } else {
                console.error('Failed to cancel booking:', response.status);
                alert('Failed to cancel the booking.');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('An error occurred while cancelling the booking.');
        }
    };

    useEffect(() => {

        const reqfetchUserDetails = async (userId) => {
            if (!userId) {
                console.error("Invalid user ID:", userId);
                return "Unknown User";
            }
    
            try {
                const response = await fetch(`${backendUrl}/api/user-info/${userId}`);
    
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
    
        const reqfetchUserEmail = async (userId) => {
            try {
                const response = await axios.get(`${backendUrl}/api/user-info/user-email/${userId}`);
                
                if (response.status === 200) {
                    return response.data.email; 
                } else {
                    console.error(`Failed to fetch email for userId ${userId}. Status: ${response.status}`);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching user email:', error);
                return null; 
            }
        };
    
        const fetchRequestsWithNames = async () => {
            if (email) {
                try {
                    const response = await fetch(
                            `${backendUrl}/api/priv-appointments/incoming-requests?requesterEmail=${encodeURIComponent(email)}`
                        );
                        const requests = await response.json();
    
                        const requestsWithNames = await Promise.all(
                            requests.map(async (request) => {
                                const requesterName = await reqfetchUserDetails(request.requesterId);
                                const requesterEmail = await reqfetchUserEmail(request.requesterId);
                                const hostName = await reqfetchUserDetails(request.hostId);
                                const hostEmail = await reqfetchUserEmail(request.requesterId);
                                
                                return {
                                    ...request,
                                    requesterName,
                                    hostName,
                                    requesterEmail,
                                    hostEmail
                                };
                           })
                        );
    
                        setIncomingRequests(requestsWithNames);
                    } catch (error) {
                        console.error("Error fetching requests:", error);
                    }
                }
            };
    
            const fetchMeetingsWithNames = async () => {
                if (email) {
                    try {
                       
                        const response = await fetch(
                            `${backendUrl}/api/priv-appointments/meetings?requesterEmail=${encodeURIComponent(email)}`
                        );
                        const { upcomingMeetings, pastMeetings } = await response.json();
       
        
                        setUpcomingMeetings(upcomingMeetings);
                        setPastMeetings(pastMeetings);
                    } catch (error) {
                        console.error("Error fetching meetings:", error);
                    }
                }
            };
    
            const fetchPollsByEmail = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/api/polls-by-email/${encodeURIComponent(email)}`);
                    setPolls(response.data.polls); 
                } catch (err) {
                    console.error("Error fetching polls:", err);
                    alert("Failed to fetch polls. Please try again later.");
                }
            };
    
            fetchRequestsWithNames();
            fetchMeetingsWithNames();
            setLoading(false); 
            if (email) {
                fetchPollsByEmail();
            }
        }, [email, backendUrl]);

    if (loading) {
        return <Loading />; 
    }
    
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
                            request.requestStatus === "Denied" ? (
                            <RequestButton
                                key={index}
                                className="mine greyed"
                                onClick={() =>
                                openPopup({
                                    title: "Meeting Request Denied",
                                    height: "auto",
                                    buttons: [],
                                    requestDetails: request,
                                })
                                }
                            >
                                <div style={{display: "flex",justifyContent: "space-between",width: "100%",alignItems: "center",}}>
                                    <span  style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                        <FaArrowRight size={22} style={{ marginRight: "30px" }} />
                                        {`Request made with ${request.hostName} for ${normalizeDate(
                                        request.alternateTimes[0]?.proposedDate
                                        ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        })} has been denied`}
                                    </span>
                                <span style={{ padding: "20px" }}></span>
                                <span style={{ fontWeight: "normal" }}>
                                    Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                </span>
                                </div>
                            </RequestButton>
                            ) : (
                            <RequestButton
                                key={index}
                                className="mine"
                                onClick={() =>
                                openPopup({
                                    title: "Meeting Request Made",
                                    height: "auto",
                                    buttons: [],
                                    requestDetails: request,
                                })
                                }
                            >
                                <div style={{display: "flex",justifyContent: "space-between",width: "100%",alignItems: "center",}}>
                                <span  style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                    <FaArrowRight size={22} style={{ marginRight: "30px" }} />
                                    {`Request made with ${request.hostName} for ${normalizeDate(
                                    request.alternateTimes[0]?.proposedDate
                                    ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    })}`}
                                </span>
                                <span style={{ padding: "20px" }}></span>
                                <span style={{ fontWeight: "normal" }}>
                                    Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                </span>
                                </div>
                            </RequestButton>
                            )
                        ) : request.requestStatus === "Pending" ? (
                            <RequestButton
                            key={index}
                            onClick={() =>
                                openPopup({
                                title: "Meeting Request",
                                height: "auto",
                                buttons: [
                                    { text: "Accept", icon: FaCheckCircle },
                                    {text: "Deny",icon: FaTimesCircle,bgColor: "black",hoverColor: "#cd2222"},
                                    {text: "Propose Different Time", icon: FaArrowRight,width: "300px", bgColor: "#620707", hoverColor: "#cd2222"},
                                ],
                                requestDetails: request,
                                })
                            }
                            >
                            <div style={{display: "flex",justifyContent: "space-between",width: "100%",alignItems: "center",}}>
                            <span  style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                <FaBell size={22} style={{ marginRight: "30px" }} />
                                {`New Request from ${request.requesterName} for ${normalizeDate(
                                    request.alternateTimes[0]?.proposedDate
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}`}
                                </span>
                                <span style={{ padding: "20px" }}></span>
                                <span style={{ fontWeight: "normal" }}>
                                Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            </RequestButton>
                        ) : request.requestStatus === "Approved" ? (
                            <RequestButton
                            key={index}
                            className="greyed"
                            onClick={() =>
                                openPopup({
                                title: "Meeting Request",
                                height: "auto",
                                buttons: [],
                                requestDetails: request,
                                })
                            }
                            >
                            <div style={{display: "flex",justifyContent: "space-between",width: "100%",alignItems: "center",}}>
                            <span  style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                <FaBell size={22} style={{ marginRight: "30px" }} />
                                {`Request from ${request.requesterName} for ${normalizeDate(
                                    request.alternateTimes[0]?.proposedDate
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })} has been approved`}
                                </span>
                                <span style={{ padding: "20px" }}></span>
                                <span style={{ fontWeight: "normal" }}>
                                Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            </RequestButton>
                        ) : (
                            <RequestButton
                            key={index}
                            className="greyed"
                            onClick={() =>
                                openPopup({
                                title: "Meeting Request",
                                height: "auto",
                                buttons: [],
                                requestDetails: request,
                                })
                            }
                            >
                            <div style={{display: "flex",justifyContent: "space-between",width: "100%",alignItems: "center",}}>
                            <span  style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                <FaBell size={22} style={{ marginRight: "30px" }} />
                                {`Request from ${request.requesterName} for ${normalizeDate(
                                    request.alternateTimes[0]?.proposedDate
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })} has been denied`}
                                </span>
                                <span style={{ padding: "20px" }}></span>
                                <span style={{ fontWeight: "normal" }}>
                                Request Made: {normalizeDate(request.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            </RequestButton>
                        )
                        ))
                ) : (
                    <p style={{ marginLeft: "20px", marginTop: "0px" }}>
                    <b>No Incoming Requests</b>
                    </p>
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
                                meeting.mine ? (
                                    <UpdateButton
                                    onClick={() =>
                                        openPopup({
                                            title: "Upcoming Meeting",
                                            height: "auto",
                                            buttons: [],
                                            requestDetails: meeting 
                                        })
                                    }
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <span style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                            <FaArrowRight size={22} style={{ marginRight: "30px" }} />
                                            {`Meeting with ${meeting.requesterName} on ${normalizeDate(meeting.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}`}
                                        </span>
                                    </div>
                                </UpdateButton>
                                ) : (
                                    <UpdateButton
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
                                )
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
                                        {`Past Appointment with ${meeting.mine ? (meeting.requesterName) : (meeting.hostName)} on ${normalizeDate(
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
            
            <Dropdown>
                <DropdownTitle onClick={togglePollDropdown}>
                    My Polls
                    {pollDropdownOpen ? <UpArrow /> : <DownArrow />}
                </DropdownTitle>
                <DropdownContents show={pollDropdownOpen}>
                    {polls.length > 0 ? (
                        polls.map((poll, index) => (
                            <UpdateButton as={Link} to={`/${poll.url}`} className="polls">
                                <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center",}}>
                                    <span style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
                                        <FaVoteYea size={22} style={{ marginRight: "30px" }} />
                                        {`${poll.title}`}
                                    </span>
                                </div>
                            </UpdateButton>
                        ))
                    ) : (
                        <p style={{marginLeft: "20px", marginTop: "0px"}}><b>No Polls Created</b></p>
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
                                        <b>With:</b> {popupData.requestDetails.mine ? (popupData.requestDetails.requesterName) : (popupData.requestDetails.hostName)}<br /><br />
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

                                                {popupData.requestDetails.alternateTimes[0].title && (
                                                <>
                                                    <b>Title:</b> {popupData.requestDetails.alternateTimes[0].title}<br /><br />
                                                </>
                                                )}
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
                                    onClick={() => {
                                        if (button.text === 'Accept') {
                                            acceptRequest(popupData.requestDetails._id, popupData.requestDetails.requesterEmail, popupData.requestDetails.alternateTimes[0].title);
                                            closePopup();
                                            alert(`Successfully accepted meeting request with ${popupData.requestDetails.requesterEmail}. View it under Upcoming Appointments.`);
                                        } else if (button.text === 'Deny') {
                                            denyRequest(popupData.requestDetails._id);
                                            closePopup();
                                            alert(`Successfully denied meeting request with ${popupData.requestDetails.requesterEmail}.`);
                                        } else if (button.text === 'Propose Different Time') {
                                            navigate('/request-time', {
                                                state: { requestDetails: popupData.requestDetails },
                                            });
                                        } else if (button.text === 'Cancel') {
                                        cancelBooking(
                                            popupData.requestDetails._id, 
                                            popupData.requestDetails.requesterEmail,
                                            popupData.requestDetails.date
                                        );
                                        closePopup();
                                    }
                                    }}
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