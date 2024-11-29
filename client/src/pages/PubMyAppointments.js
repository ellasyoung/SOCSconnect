import React from 'react';
import PubNavbar from "../components/PubNavbar";
import Footer from "../components/Footer";
import PubApptsModal from "../components/PubApptsModal";

const PubMyAppointments = () => {
  return(
    <>
      <PubNavbar/>
      <PubApptsModal/>
      <Footer />
    </>
  );
};

export default PubMyAppointments;