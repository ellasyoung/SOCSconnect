//Natalie Doehla
import React, { useState, useEffect, useContext } from "react";
import { 
  Nav, NavLogo, NavLinks, NavLink, ProfLogo, NavItems, Hamburger, Dropdown, ButtonContainer, LogoutBtn, ProfileDropdown , Dim, CloseButton
} from "./PrivNavbarElements"; 
import SOCSLogo from "../../assets/images/navbar-logo.svg"; 
import ProfileLogo from "../../assets/images/profile-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import NewApptDropdown from "../NewApptDropdown";
import { AuthContext } from "../../auth/AuthProvider"; 
import axios from "axios"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.post(
        `${backendUrl}/api/logout`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      logout(); 
      navigate("/sign-in"); 
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
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
          <NavLink as={Link} to="/dashboard" className="top" href="#">Home</NavLink>
          <NavLink as={Link} to="/booking" href="#">Booking</NavLink>
          <NavLink as={Link} to="/my-appointments" href="#">My Appointments</NavLink>
          <NavLink as={Link} to="/request-time" href="#">Request Time</NavLink>
          <ButtonContainer><NewApptDropdown/></ButtonContainer>
      </Dropdown>

      <NavItems>
        <NavLinks>
          <NavLink as={Link} to="/dashboard" href="#">Home</NavLink>
          <NavLink as={Link} to="/booking" href="#">Booking</NavLink>
          <NavLink as={Link} to="/my-appointments" href="#">My Appointments</NavLink>
          <NavLink as={Link} to="/request-time" href="#">Request Time</NavLink>
        </NavLinks>
        <NewApptDropdown />
      </NavItems>
        <ProfLogo 
          src={ProfileLogo} 
          alt="ProfLogo" 
          onClick={toggleProfileMenu}
        />
        
        {isProfileMenuOpen && (
          <Dim>
            <ProfileDropdown>
              <CloseButton onClick={toggleProfileMenu} />
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn> 
            </ProfileDropdown>
          </Dim>
        )}
    </Nav>
  );
};

export default Navbar;
