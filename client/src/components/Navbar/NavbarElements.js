import styled from "styled-components";

export const Nav = styled.nav`
    height: 80px; 
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 12;
    position: sticky;
    top: 0;
    font-size: 14px;
    background-color: white;
    justify-content: space-between; 

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
    font-size: 14px;

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
    font-size: 14px;

    &:hover {
        text-decoration: underline;
        color: #cd2222;
    }
`;

export const ButtonContainer = styled.div`
    margin-right: 40px;
    display: flex; 
    gap: 40px;
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
    font-size: 14px;
    transition: background-color 0.3s ease;

    &.register:hover {
        background-color: #620707;
    }

    &.sign-in:hover {
        background-color: #620707;
    }

    &.register {
        background-color: black;
    }

    &.sign-in {
        background-color: #cd2222;
    }
`;
