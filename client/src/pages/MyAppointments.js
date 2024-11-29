import React, { useContext } from 'react';
import PrivNavbar from "../components/PrivNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../auth/AuthProvider'; 

const MyAppointments = () => {
  const { email } = useContext(AuthContext); 
  return(
    <>
      <PrivNavbar/>
      <h1>My Appointments</h1>
      <p>{email}</p>
      <Footer />
    </>
  );
};

export default MyAppointments;