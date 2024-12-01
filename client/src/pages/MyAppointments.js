import React from 'react';
import PubNavbar from "../components/PubNavbar";
import Footer from "../components/Footer";
import PrivAppointments from '../components/PrivAppointments';

const MyAppointments = () => {
  return(
    <>
      <PubNavbar/>
      <PrivAppointments/>
      <Footer />
    </>
  );
};

export default MyAppointments;