import React, { useContext } from "react";
import { FooterCont, FooterLogo, LinksContainer, ExternalLink, FooterLinksCont} from "./FooterElements";
import SOCSLogo from "../../assets/images/footer-logo.svg"; 
import { AuthContext } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";

const Footer = () => {
    const { isLoggedIn } = useContext(AuthContext); 
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
    return (
        <FooterCont>
            <FooterLogo src={SOCSLogo} alt="SOCS Logo"/>
                <FooterLinksCont>
                    <div className="Column">
                        <h3 style={{fontSize: "16px"}}>SOCS Connect</h3>
                        <LinksContainer>
                            <ExternalLink href="/">Home</ExternalLink>
                            <ExternalLink as={Link} to="/booking">Booking</ExternalLink>

                            {isLoggedIn ? 
                                (<>
                                    <ExternalLink as={Link} to="/my-appointments">My Appointments</ExternalLink>
                                    <ExternalLink as={Link} to="/request-time">Request Time</ExternalLink>
                                </>)
                            : 
                                (<>
                                    <ExternalLink as={Link} to="/register">Register</ExternalLink>
                                    <ExternalLink as={Link} to="/sign-in">Sign In</ExternalLink>
                                </>)
                            }
                        </LinksContainer>   
                    </div>
                    <div className="Column">
                        <h3 style={{fontSize: "16px", textAlign: "center"}}>School of Computer Science</h3> 
                        <LinksContainer>
                            <ExternalLink href="https://www.cs.mcgill.ca/" target="_blank">McGill SOCS</ExternalLink>
                            <ExternalLink href="https://www.cs.mcgill.ca/undergrad/future/general/" target="_blank">
                                Programs & Admissions</ExternalLink>
                            <ExternalLink href="https://www.cs.mcgill.ca/about/" target="_blank">About</ExternalLink>
                        </LinksContainer> 
                    </div>   
                </FooterLinksCont>    
        </FooterCont>

    );
}; 

export default Footer;