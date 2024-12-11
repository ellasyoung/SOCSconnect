//Cienna Gin-Naccarato
import React, { useContext } from 'react';
import PrivNavbar from "../components/PrivNavbar";
import PubNavbar from "../components/PubNavbar";
import Footer from "../components/Footer";
import PrivAppointments from '../components/PrivAppointments';
import { AuthContext } from '../auth/AuthProvider'; 
import PubApptsModal from "../components/PubApptsModal";

const MyAppointments = () => {
  const { isLoggedIn, email } = useContext(AuthContext); 
  return(
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      {isLoggedIn ? 
      <>
         <PrivAppointments/>
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