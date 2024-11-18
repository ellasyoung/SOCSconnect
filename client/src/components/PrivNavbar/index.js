import React, { useState, useEffect } from "react";
import { Nav, NavLogo, NavLinks, NavLink, ProfLogo, NavItems, Hamburger, Dropdown, ButtonContainer,
ProfileDropdown} from "./PrivNavbarElements"; 
import SOCSLogo from "../../assets/images/navbar-logo.svg"; 
import ProfileLogo from "../../assets/images/profile-icon.svg";
import { Link } from "react-router-dom";
import NewApptDropdown from "../NewApptDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // toggle the profile dropdown
  };


  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 1000) {
        setIsMenuOpen(false);
        }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

  return (
    <Nav>
      <NavLogo src={SOCSLogo} alt="SOCS Logo" />
      
      <Hamburger onClick={toggleMenu}>☰</Hamburger>
      
      <Dropdown style={{ display: isMenuOpen && windowWidth < 1110 ? "flex" : "none" }}>
          <NavLink as={Link} to="/" className="top" href="#">Home</NavLink>
          <NavLink as={Link} to="/booking" href="#">Booking</NavLink>
          <NavLink as={Link} to="/my-appointments" href="#">My Appointments</NavLink>
          <ButtonContainer><NewApptDropdown/></ButtonContainer>

      </Dropdown>

      <NavItems>
        <NavLinks>
        <NavLink as={Link} to="/" href="#">Home</NavLink>
          <NavLink as={Link} to="/booking" href="#">Booking</NavLink>
          <NavLink as={Link} to="/my-appointments" href="#">My Appointments</NavLink>
          <NavLink as={Link} to="#" href="#">Request Time</NavLink>
        </NavLinks>
        <NewApptDropdown />
      </NavItems>
        <ProfLogo 
          src={ProfileLogo} 
          alt="ProfLogo" 
          onClick={toggleProfileMenu}
        />
        
        {isProfileMenuOpen && (
          <ProfileDropdown>
            <NavLink as={Link} to="#" href="#">Logout</NavLink> 
          </ProfileDropdown>
        )}
    </Nav>
  );
};

export default Navbar;
