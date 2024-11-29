import React, { useContext } from 'react';
import PrivNavbar from "../components/PrivNavbar";
import PubNavbar from "../components/PubNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../auth/AuthProvider'; 
import PubApptsModal from "../components/PubApptsModal";

const MyAppointments = () => {
  const { isLoggedIn, email } = useContext(AuthContext); 
  return(
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      {isLoggedIn ? 
      <>
        <h1>My Appointments</h1>
        <p>{email}</p>
      </> 
      : 
      <>
        <PubApptsModal/>
      </>}
      <Footer />
    </>
  );
};

export default MyAppointments;