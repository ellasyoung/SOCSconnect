import React, { useState, useEffect } from "react";
import { Nav, NavLogo, NavLinks, NavLink, Button, ButtonContainer, NavItems, Hamburger, Dropdown} from "./PubNavbarElements"; 
import SOCSLogo from "../../assets/images/navbar-logo.svg"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
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
      
      <Dropdown style={{ display: isMenuOpen && windowWidth < 1000 ? "flex" : "none" }}>
          <NavLink as={Link} to="/" className="top" href="#">Home</NavLink>
          <NavLink as={Link} to="/booking" href="#">Booking</NavLink>
          <NavLink as={Link} to="/my-appointments" href="#">My Appointments</NavLink>
          <Button as={Link} to="/register" className="register">Register</Button>
          <Button as={Link} to="/sign-in" className="sign-in">Sign in</Button>
      </Dropdown>

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
