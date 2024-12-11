//Natalie Doehla
import React from 'react';
import PrivNavbar from "../components/PrivNavbar";
import RecurringWeeklyModal from '../components/RecurringMonthlyModal';
import Footer from "../components/Footer";

const RecurringMonthly = () => {
  return(
    <>
      <PrivNavbar/>
      <RecurringWeeklyModal/>
      <Footer/>
    </>
  );
};

export default RecurringMonthly;