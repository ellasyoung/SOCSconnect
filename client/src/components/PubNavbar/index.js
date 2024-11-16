import React, { useState, useEffect } from "react";
import { Nav, NavLogo, NavLinks, NavLink, Button, ButtonContainer, NavItems, Hamburger, Dropdown} from "./PubNavbarElements"; 
import SOCSLogo from "../../assets/images/navbar-logo.svg"; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        // Close the menu if the window width is greater than or equal to 1000px
        if (window.innerWidth >= 1000) {
        setIsMenuOpen(false);
        }
    };
    
    // Attach the resize event listener
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

  return (
    <Nav>
      <NavLogo src={SOCSLogo} alt="SOCS Logo" />
      
      <Hamburger onClick={toggleMenu}>☰</Hamburger>
      
      <Dropdown style={{ display: isMenuOpen && windowWidth < 1000 ? "flex" : "none" }}>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Booking</NavLink>
          <NavLink href="#">My Appointments</NavLink>
          <Button className="register">Register</Button>
          <Button className="sign-in">Sign in</Button>
      </Dropdown>

    {/* NavItems only visible when screen large */}
      <NavItems>
        <NavLinks>
        <NavLink href="#">Home</NavLink>
          <NavLink href="#">Booking</NavLink>
          <NavLink href="#">My Appointments</NavLink>
        </NavLinks>
        <ButtonContainer>
        <Button className="register">Register</Button>
          <Button className="sign-in">Sign in</Button>
        </ButtonContainer>
      </NavItems>
    </Nav>
  );
};

export default Navbar;
