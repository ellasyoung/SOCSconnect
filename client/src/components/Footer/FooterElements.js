import styled from "styled-components"; 

export const FooterCont = styled.div`
    background-color: #000000; 
    display: flex;
    height: 200px;
    color: white;
    position: relative;
    z-index: 7;
    
    padding: 40px;
    padding-bottom: 60px;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, sans-serif;

    @media screen and (max-width: 1100px){
        justify-content: space-between; 
        padding: 20px;
        flex-direction: column; 
        align-items: center; 
        height: auto;
    }
    `

export const FooterLinksCont = styled.div`
    width: 35%;
    display: flex;
    align-itms: flex-start;
    justify-content: space-between;
    margin-right: 10%;
    @media screen and (max-width: 1100px){
        width: 50%;
        justify-content: space-between; 
        padding: 20px;
        flex-direction: column; 
        align-items: center; 
        height: auto;
        margin-right: 0%;
    }
`

export const FooterLogo = styled.img `
    width: 125x; 
    height: 125px;
    margin-left: 10%;

    @media screen and (max-width: 1100px){
        display: none;
    }
    `

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1100px){
        align-items: center;
    }

`
export const LinksSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 50px;

    @media screen and (max-width: 900px){
        flex-direction: column; 
        width: 100%;
        font-size: 10px;
        margin-left: 0px;
        align-items: center;
    }
`

export const ExternalLink = styled.a`
    margin-bottom: 10px;
    color: white;
    text-decoration: underline;
    font-size: 12px;

    &:hover {
        color: #cd2222;
    }
`
export const Column = styled.div`
    display: flex;
    flex-direction: column

    &:first-child{
        margin-left: 75px;
    }

    h3 {
        margin-bottom: 1rem;
        
    }

    @media screen and (max-width: 900px){
        width: 100%;
        align-items: center; 
        text-align: center;
        margin-bottom: 30px;

        &:first-child{
            margin-left: 0px;
        }
    }
`
