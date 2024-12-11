//Ella Young
import React from 'react';
import PrivNavbar from "../components/PrivNavbar"
import Footer from "../components/Footer";
import ReqTimeModal from '../components/ReqTimeModal';

const RequestTime = () => {
  return(
    <>
      <PrivNavbar/>
      <ReqTimeModal/>
      <Footer />
    </>
  );
};

export default RequestTime;