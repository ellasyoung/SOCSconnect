import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    BckgrndBar,
    OuterModal,
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
    PopupCloseButton, 
    PopupFooter,
    ControlButton
  
} from './PrivAppointments';

import { AuthContext } from '../../auth/AuthProvider'; 
import { FaBell, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';

const PrivAppointments = () => {
    
    //dropdown states determine if dropdown is open or closed 
    const[RequestsDropdownOpen, setRequestsDropdownOpen] = useState(false);
    const[UpcomingDropdownOpen, setUpcomingDropdownOpen] = useState(false);
    const[HistoryDropdownOpen, setHistoryDropdownOpen] = useState(false);

    //actually toggle dropdowns open and closed 
    const toggleRequestsDropdown = () => setRequestsDropdownOpen(!RequestsDropdownOpen); 
    const toggleUpcomingDropdown = () => setUpcomingDropdownOpen(!UpcomingDropdownOpen);
    const toggleHistoryDropdown = () => setHistoryDropdownOpen(!HistoryDropdownOpen);


    //controls whether popup displayed 
    const[showPopup, setShowPopup] = useState(false);

    const { isLoggedin, email } = useContext(AuthContext); //for user currently logged in 

    //sets popup data 
    const[popupData, setPopupData] = useState({
        title: "", height: "", buttons:[], 
        data: {
            requesterEmail: "", 
            date: "", 
            startTime: "", 
            endTime: "",
            createdAt: "",
            hostId: ""

        }
    });

    //stores data fetched from the backend 
    const [requests, setRequests] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [history, setHistory] = useState([]);

    const openPopup = (data) => {
        setPopupData(data)
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    console.log(email);

    //fetch requests from backend 
    const fetchRequests = useCallback (async () => {
        if (isLoggedin){
            try {
                const response = await fetch(`http://localhost:5001/api/requests/${email}`); 
                if (!response.ok) throw new Error("Failed to fetch request");
                const data = await response.json();
                setRequests(data);
            } catch(error){
                console.error("Error fetching requests", error);
            }
        } 
    },[isLoggedin, email]); 

    const fetchUpcoming = useCallback (async () => {
        if(isLoggedin){
            try {
                const response = await fetch(`http://localhost:5001/api/upcoming/${email}`); 
                if (!response.ok) throw new Error("Failed to fetch upcoming");
                const data = await response.json();
                console.log("Fetched upcoming appointments", data);
                setUpcoming(data);
            } catch(error){
                console.error("Error fetching upcoming", error);
            }
        }
    },[isLoggedin, email]); 

    const fetchHistory = useCallback (async () => {
        if(isLoggedin){
            try {
                const response = await fetch(`http://localhost:5001/api/history/${email}`); 
                if (!response.ok) throw new Error("Failed to fetch history");
                const data = await response.json();
                setHistory(data);
            } catch(error){
                console.error("Error fetching history", error);
            }
        }
    },[isLoggedin, email]); 
    
    useEffect (() => {
        if(isLoggedin){
            fetchRequests();
            fetchUpcoming();
            fetchHistory();
        }

    }, [isLoggedin, email, fetchRequests, fetchUpcoming, fetchHistory]);

    /*
    useEffect (() => {
        setRequests([{_id: "1", requesterEmail: "test1@email.com", date: "2024-12-05", startTime: "3:00", 
            endTime: "4:00", createdAt: "2024-12-01"}]);
        setUpcoming([
            { _id: "2", hostId: "host1", date: "2024-12-10", startTime: "10:00 AM", endTime: "11:00 AM" },
        ]);
        setHistory([
            { _id: "3", hostId: "host2", date: "2024-11-30", startTime: "2:00 PM", endTime: "3:00 PM" },
        ]);
    }, [currentUser]);
    */

    return (
        <>
        <BckgrndBar />

        <OuterModal>
            <Title>My Appointments</Title>
            
            <Dropdown>
                <DropdownTitle onClick={toggleRequestsDropdown}>
                    Requests
                    {RequestsDropdownOpen ? <UpArrow /> : <DownArrow />}

                </DropdownTitle>
                <DropdownContents $show={RequestsDropdownOpen ? "true" : undefined }>
                    {requests && requests.map((request) => (
                        <RequestButton 
                            key={request.email}
                            onClick={() => 
                                openPopup({
                                    title: "Meeting Request", 
                                    height: "auto",
                                    buttons: [
                                        {text: "Accept", icon: FaCheckCircle},
                                        {text: "Deny", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"},
                                        {text: "Propose Different Time", icon: FaArrowRight, width: "300px", bgColor: "#620707", hoverColor: "#cd2222"}
                                    ],
                                    data: request
                                })
                            }
                        >
                            <FaBell size={22} style={{ marginRight: "30px" }}/>
                                New Meeting Request from {request.requesterEmail} on {request.date}
                                Requested On {request.createdAt}
                        </RequestButton>
                    ))}
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleUpcomingDropdown}>
                    Upcoming
                    {UpcomingDropdownOpen ? <UpArrow /> : <DownArrow />}
                    </DropdownTitle>
                    <DropdownContents $show={UpcomingDropdownOpen ? "true" : undefined}>
                        {upcoming && upcoming.map(upcoming =>
                            <UpdateButton key={upcoming.email} onClick={() =>
                                openPopup({
                                title: "Upcoming Meeting",
                                height: "auto",
                                buttons: [ {text: "Cancel", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"}], 
                                data: upcoming
                            })}>
                                <FaCalendarAlt size={22} style={{ marginRight: "30px" }} />
                                Meeting with {upcoming.hostId} at {upcoming.date}
                            </UpdateButton>
                        )}
                        
                    </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleHistoryDropdown}>
                    History
                    {HistoryDropdownOpen ? <UpArrow /> : <DownArrow />}
                </DropdownTitle>
                <DropdownContents $show={HistoryDropdownOpen ? "true" : undefined}>
                    {history && history.map(history => 
                        <HistoryButton key={email} onClick={() => 
                                openPopup({
                                    title: "Past Meeting",
                                    height: "275px",
                                    buttons: [],
                                    data: history
                            
                        })}>
                        <FaClock size={22} style={{ color:"#cd2222", marginRight: "30px" }} />
                                Meeting with {history.hostId} on {history.date}
                        </HistoryButton>
                    )}
                </DropdownContents>
            </Dropdown>

            {showPopup && (
                <PopupBackground onClick={closePopup}>
                    <PopupContainer
                        height={popupData.height}
                        onClick={(e) => e.stopPropagation()}>   
                        <PopupHeader>
                            <PopupTitle>{popupData.title}</PopupTitle>
                            <PopupCloseButton onClick={closePopup}>X</PopupCloseButton>
                       </PopupHeader>
                        <b>From:</b>{popupData.data.requesterEmail}<br></br><br></br>
                        <b>For: </b>{popupData.data.hostId}<br></br><br></br>
                        <b>Date:</b>{popupData.data.date}<br></br><br></br>
                        <b>Start Time:</b>{popupData.data.startTime} <br></br><br></br>
                        <b>End Time:</b>{popupData.data.endTime} <br></br><br></br>
                        <PopupFooter>
                           {popupData.buttons.map((button, index) => (
                                <ControlButton 
                                key={index}
                                bgColor={button.bgColor}
                                hoverColor={button.hoverColor}
                                style={{width: button.width}}
                            >

                            {button.text}
                            <button.icon size={20}/>
                            </ControlButton>
                        ))}
                        </PopupFooter>
                    </PopupContainer>
            </PopupBackground>

            )}; 
    
        </OuterModal>
        </>
    
    )
};

export default PrivAppointments;