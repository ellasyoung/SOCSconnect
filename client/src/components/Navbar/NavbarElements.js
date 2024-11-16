// components/Navbar/NavbarElements.js
import styled from "styled-components";

// Navbar container (flexbox layout)
export const Nav = styled.nav`
    height: 80px; 
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 12;
    position: sticky;
    top: 0;
    font-size: 18px;
    background-color: white;
    justify-content: space-between; // Add this to space out the logo and the rest

    @media screen and (max-width: 768px) {
        background: white;
    }
`;

export const NavLogo = styled.img`
    width: 300px;
    height: auto;
    display: flex;
`;

export const NavItems = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; // Ensure it aligns to the right
    gap: 50px;
`;

export const NavLinks = styled.div`
    display: flex;
    gap: 50px;

    @media screen and (max-width: 768px) {
        display: none; 
    }
`;

export const NavLink = styled.a`
    color: black;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    font-family: Arial;

    &:hover {
        text-decoration: underline;
        color: #cd2222;
    }
`;

export const ButtonContainer = styled.div`
    display: flex; 
    gap: 20px;
`;

export const Button = styled.button`
    padding: 15px 30px;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 8px;
    display: block;
    font-family: Arial;
    font-weight: bold;

    &:hover {
        opacity: 0.8;
    }

    // Register button - black background
    &.register {
        background-color: black;
    }

    // Sign In button - red background
    &.sign-in {
        background-color: #cd2222;
    }
`;
