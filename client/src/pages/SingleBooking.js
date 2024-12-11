//Natalie Doehla 
import React from 'react';
import PrivNavbar from "../components/PrivNavbar";
import SingleBookingModal from '../components/SingleBookingModal';
import Footer from "../components/Footer";

const RecurringWeekly = () => {
  return(
    <>
      <PrivNavbar/>
      <SingleBookingModal/>
      <Footer/>
    </>
  );
};

export default RecurringWeekly;