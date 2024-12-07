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


    //current user's email 
    const { email } = useContext(AuthContext)

    
    const fetchUserDetails = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return "Unknown User"; // Return fallback if userId is invalid
        }
    
        try {
            const response = await fetch(`http://localhost:5001/api/users/${userId}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch user details, status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('User details:', data);
    
            if (data && data.firstName && data.lastName) {
                return `${data.firstName} ${data.lastName}`;
            } else {
                throw new Error('User data is incomplete');
            }
    
        } catch (error) {
            console.error("Error fetching user details:", error);
            return "Unknown User"; // Return fallback if any error occurs
        }
    };

    // fetching incoming requests from the backend 
    useEffect(() => {
        
        if (email){
            fetch(`http://localhost:5001/api/priv-appointments/incoming-requests?requesterEmail=${encodeURIComponent(email)}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => setIncomingRequests(data))
                .catch((error) => console.error("Error fetching requests:", error));
        }
    }, [email]); //re-runs every time user logged in changes 

 /*useEffect(() => {
        const fetchRequestsWithNames = async () => {
            if (email) {
                try {
                    const response = await fetch(`http://localhost:5001/api/incoming-requests?requesterEmail=${encodeURIComponent(email)}`);
                    const requests = await response.json();
    
                    const requestsWithNames = await Promise.all(
                        requests.map(async (request) => {
                          
                            //console.log("requester: ", request.requesterId)
                            //console.log("host: ", request.hostId)
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
    }, [email]);*/


    //fetch meetings from backend 
    useEffect(() => {
        fetch(`http://localhost:5001/api/priv-appointments/meetings?requesterEmail=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                setUpcomingMeetings(data.upcomingMeetings);
                setPastMeetings(data.pastMeetings);
            })
            .catch(error => {
                console.error('Error fetching meetings:', error);
            });
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
                            <RequestButton 
                                key={request._id || index} 
                                onClick={() =>
                                    openPopup({
                                        title: "Meeting Request", 
                                        height: "auto",
                                        buttons: [
                                            {text: "Accept", icon: FaCheckCircle},
                                            {text: "Deny", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"},
                                            {text: "Propose Different Time", icon: FaArrowRight, width: "300px", bgColor: "#620707", hoverColor: "#cd2222"},
                                        ],
                                        requestDetails: request //passes indiv request details 
                                    })
                                }
                            >
            
                            <div style={{display: "flex", justifyContent:"space-between", width:"100%", alignItems: "center" }}>
                            <span>
                                <FaBell size={22} style={{ marginRight: "30px" }}/>
                                {`New Request from ${request.requesterId} for ${new Date(request.alternateTimes[0]?.proposedDate).toLocaleDateString("en-US", {
                                    year: "numeric", 
                                    month: "long", 
                                    day: "numeric"
                                })}`}
                            </span>
                            <span style={{fontWeight: "normal"}}>
                                Request Made: {new Date (request.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                            </RequestButton>
                                ))
                            ) : ( 
                                <p><b>No Incoming Requests</b></p>
                    )}
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleUpcomingDropdown}>
                    Upcoming
                    {UpcomingDropdownOpen ? <UpArrow /> : <DownArrow />}
                    </DropdownTitle>
                    <DropdownContents show={UpcomingDropdownOpen}>
                    {upcomingMeetings && upcomingMeetings.length > 0 ? (
                        upcomingMeetings.map((meeting, index) => (
                            <UpdateButton
                                key={meeting._id || index}
                                onClick={() =>
                                    openPopup({
                                        title: "Upcoming Meeting",
                                        height: "auto",
                                        buttons: [
                                            {text: "Cancel", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"}
                                        ],
                                        requestDetails: meeting // Pass the meeting details for the popup
                                    })
                                }
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                    <span>
                                        <FaCalendarAlt size={22} style={{ marginRight: "30px" }} />
                                        {`Meeting with ${meeting.requesterId} on ${new Date(meeting.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}`}
                                    </span>
                                </div>
                            </UpdateButton>
                        ))
                    ) : (
                        <p><b>No Upcoming Meetings</b></p>
                    )}
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleHistoryDropdown}>
                    History
                    {HistoryDropdownOpen ? <UpArrow /> : <DownArrow />}
                </DropdownTitle>
                <DropdownContents show={HistoryDropdownOpen}>
                   <HistoryButton onClick={() => 
                        openPopup({
                            title: "Past Meeting",
                            height: "275px",
                            buttons: [],
                    
                   })}>
                   <FaClock size={22} style={{ marginRight: "30px" }} />
                        Past Appointment
                   </HistoryButton>
                </DropdownContents>
            </Dropdown>

            {showPopup && (
                <PopupBackground onClick={closePopup}>
                    <PopupContainer
                        height={popupData.height}
                        onClick={(e) => e.stopPropagation()}>   
                        <PopupHeader>
                            <PopupTitle>{popupData.title}</PopupTitle>
                            <CloseButton onClick={closePopup}></CloseButton>
                       </PopupHeader>
                       {popupData.requestDetails && (
                        <>
                            <b>From:</b> {popupData.requestDetails.requesterName}<br></br><br></br>
                            <b>For:</b> {popupData.requestDetails.hostName}<br></br><br></br>
                            <b>Date:</b> {new Date(popupData.requestDetails.alternateTimes[0]?.proposedDate).toLocaleDateString()}<br></br><br></br>
                            <b>Start Time:</b> {popupData.requestDetails.alternateTimes[0]?.proposedStartTime}<br /><br />
                            <b>End Time:</b> {popupData.requestDetails.alternateTimes[0]?.proposedEndTime}<br /><br />
                        </>
                        )}

                        <PopupFooter>
                           {popupData.buttons.map((button, index) => (
                                <ControlButton 
                                key={index}
                                bgColor={button.bgColor}
                                hoverColor={button.hoverColor}
                                style={{width: button.width}}
                            >

                            {button.text}
                            <button.icon size={15}/>
                            </ControlButton>
                        ))}
                        </PopupFooter>
                    </PopupContainer>
            </PopupBackground>)} 

        </Container>
        </Bckgrnd>
        </>
    
    )
};

export default PrivAppointments;