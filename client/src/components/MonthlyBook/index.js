import React, { useContext } from 'react';
import PrivNavbar from "../PrivNavbar";
import PubNavbar from "../PubNavbar";
import Footer from "../Footer";
import { AuthContext } from '../../auth/AuthProvider'; 
import PubApptsModal from "../PubApptsModal";


const MonthlyBook = () => {
  const { isLoggedIn, email } = useContext(AuthContext); 
  return(
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      {isLoggedIn ? 
      <>
        <h1>woooo monthly meeting</h1>
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

export default MonthlyBook;