import React from "react";
import { FooterCont, FooterLogo, LinksContainer, ExternalLink, FooterLinksCont} from "./FooterElements";
import SOCSLogo from "../../assets/images/footer-logo.svg"; 

const Footer = () => {
    return (
        <FooterCont>
            <FooterLogo src={SOCSLogo} alt="SOCS Logo"/>
                <FooterLinksCont>
                    <div className="Column">
                        <h3 style={{fontSize: "16px"}}>SOCS Connect</h3>
                        <LinksContainer>
                            <ExternalLink href="/">Home</ExternalLink>
                            <ExternalLink href="/booking">Booking</ExternalLink>
                            <ExternalLink href="/register">Register</ExternalLink>
                            <ExternalLink href="/sign-in">Sign In</ExternalLink>
                        </LinksContainer>   
                    </div>
                    <div className="Column">
                        <h3 style={{fontSize: "16px"}}>School of Computer Science</h3> 
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