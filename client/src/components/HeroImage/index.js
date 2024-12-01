import React, { useContext } from "react";
import { Bckgrnd, BirdComputer, HeroDescription, Title, Title2, Blurb, Button } from './HeroImageElements';
import HeroImg from '../../assets/images/hero-img.svg';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider"; 

const HeroImage = () => {
  const { isLoggedIn } = useContext(AuthContext); 
  return(
    <Bckgrnd> 
      <HeroDescription>
        <Title className='line1'>Your one-stop shop for</Title>
        <Title className='line2'>Meeting Management</Title>
        <Title2>McGill University School of Computer Science</Title2>
        <Blurb>
          Effortlessly book appointments and manage schedules with our user-friendly booking system, designed specifically for students, professors, and TAs. 
          Stay organized with a centralized dashboard that lets you view all your active and historical appointments at a glance.
        </Blurb>
        {isLoggedIn ? 
          (<Button as={Link} to="/my-appointments"> 
            See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
          </Button>)
        : 
          (<Button as={Link} to="/sign-in"> 
            Get Started <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
          </Button>)
        }
      </HeroDescription>
      <BirdComputer src={HeroImg} alt="SOCS Computer Logo"/>
      {isLoggedIn ? 
        (<Button className='mobile-button' as={Link} to="/my-appointments"> 
          See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
        </Button>)
      : 
        (<Button className='mobile-button' as={Link} to="/sign-in"> 
          Get Started <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/>
        </Button>)
      }
    </Bckgrnd>
  );
};

export default HeroImage;