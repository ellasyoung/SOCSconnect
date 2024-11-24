import React from 'react';
import PrivNavbar from "../components/PrivNavbar";
import RecurringWeeklyModal from '../components/RecurringWeeklyModal';
import Footer from "../components/Footer";

const RecurringWeekly = () => {
  return(
    <>
      <PrivNavbar/>
      <RecurringWeeklyModal/>
      <Footer/>
    </>
  );
};

export default RecurringWeekly;