import React, { useContext } from "react";
import PubNavbar from "../components/PubNavbar"; 
import PrivNavbar from "../components/PrivNavbar"; 
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthProvider"; 

const Booking = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      <BookingModal />
      <Footer />
    </>
  );
};

export default Booking;
