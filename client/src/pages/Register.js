import React from 'react';
import PubNavbar from "../components/PubNavbar";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal"

const Register = () => {
  return(
    <>
      <PubNavbar/>
      <RegisterModal/>
      <Footer />
    </>
  );
};

export default Register;