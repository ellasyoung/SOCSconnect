import React from 'react';
import PrivNavbar from "../components/PrivNavbar";
import Footer from "../components/Footer";
import MeetingPollModal from '../components/MeetingPollModal';

const MeetingPoll = () => {
    return(
      <>
        <PrivNavbar/>
        <MeetingPollModal/>
        <Footer />
        
      </>
    );
  };
  
  export default MeetingPoll;