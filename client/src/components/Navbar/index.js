// components/Navbar/index.js
import React from "react";
import { Nav, NavLogo, NavLinks, NavLink, Button, ButtonContainer, NavItems } from "./NavbarElements"; // Import styled components
import SOCSLogo from "../../assets/images/navbar-logo.svg"; // Your logo image path

const Navbar = () => {
    return (
        <Nav>
            <NavLogo src={SOCSLogo} alt="SOCS Logo" />
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

}

export default Navbar;
