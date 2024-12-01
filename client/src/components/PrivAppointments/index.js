import React, { useState } from "react";
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

import { FaBell, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';

const PrivAppointments = () => {
    
    const[RequestsDropdownOpen, setRequestsDropdownOpen] = useState(false);
    const[UpcomingDropdownOpen, setUpcomingDropdownOpen] = useState(false);
    const[HistoryDropdownOpen, setHistoryDropdownOpen] = useState(false);
    const[showPopup, setShowPopup] = useState(false);
    const[popupData, setPopupData] = useState({title: "", height: "", buttons:[]});

    const toggleRequestsDropdown = () => setRequestsDropdownOpen(!RequestsDropdownOpen); 
    const toggleUpcomingDropdown = () => setUpcomingDropdownOpen(!UpcomingDropdownOpen);
    const toggleHistoryDropdown = () => setHistoryDropdownOpen(!HistoryDropdownOpen);

    const openPopup = (data) => {
        setPopupData(data)
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

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
                <DropdownContents show={RequestsDropdownOpen}>
                    <RequestButton onClick={() => 
                        openPopup({
                            title: "Meeting Request", 
                            height: "auto",
                            buttons: [
                                {text: "Accept", icon: FaCheckCircle},
                                {text: "Deny", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"},
                                {text: "Propose Different Time", icon: FaArrowRight, width: "300px", bgColor: "#620707", hoverColor: "#cd2222"},],

                        })}>
                        <FaBell size={22} style={{ marginRight: "30px" }}/>
                        Request Made
                    </RequestButton>
                </DropdownContents>
            </Dropdown>

            <Dropdown>
                <DropdownTitle onClick={toggleUpcomingDropdown}>
                    Upcoming
                    {UpcomingDropdownOpen ? <UpArrow /> : <DownArrow />}
                    </DropdownTitle>
                    <DropdownContents show={UpcomingDropdownOpen}>
                        <UpdateButton onClick={() =>
                         openPopup({
                            title: "Upcoming Meeting",
                            height: "auto",
                            buttons: [ {text: "Cancel", icon: FaTimesCircle, bgColor: "black", hoverColor: "#cd2222"}]
                        })}>
                            <FaCalendarAlt size={22} style={{ marginRight: "30px" }} />
                        </UpdateButton>
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
                   <FaClock size={22} style={{ color:"#cd2222", marginRight: "30px" }} />
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
                            <PopupCloseButton onClick={closePopup}>X</PopupCloseButton>
                       </PopupHeader>
                        <b>From:</b> <br></br><br></br>
                        <b>For: </b><br></br><br></br>
                        <b>Date:</b> <br></br><br></br>
                        <b>Start Time:</b> <br></br><br></br>
                        <b>End Time:</b> <br></br><br></br>
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