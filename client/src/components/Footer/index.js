import React from "react";
import { FooterCont, FooterLogo, LinksContainer, ExternalLink} from "./FooterElements";
import SOCSLogo from "../../assets/images/footer-logo.svg"; 

const Footer = () => {
    return (
        <FooterCont>
            <FooterLogo src={SOCSLogo} alt="SOCS Logo"/>
                <div className="Column">
                    <h3>SOCS Connect</h3>
                    <LinksContainer>
                        <ExternalLink href="">Home</ExternalLink>
                        <ExternalLink href="">Booking</ExternalLink>
                        <ExternalLink href="">Register</ExternalLink>
                        <ExternalLink href="">Sign In</ExternalLink>
                    </LinksContainer>   
                </div>
                <div className="Column">
                    <h3>School of Computer Science</h3> 
                    <LinksContainer>
                        <ExternalLink href="">McGill SOCS</ExternalLink>
                        <ExternalLink href="https://www.cs.mcgill.ca/undergrad/future/general/">
                            Programs & Admissions</ExternalLink>
                        <ExternalLink href="https://www.cs.mcgill.ca/about/">About</ExternalLink>
                    </LinksContainer> 
                </div>       
        </FooterCont>

    );
}; 

export default Footer;