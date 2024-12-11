//Ella Young 
import React, { useContext } from "react";
import PubNavbar from "../components/PubNavbar"; 
import PrivNavbar from "../components/PrivNavbar"; 
import HeroImage from '../components/HeroImage';
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthProvider"; 

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext); 
  return(
    <>
      {isLoggedIn ? <PrivNavbar /> : <PubNavbar />}
      <HeroImage/>
      <Footer />
    </>
  );
};

export default Home;