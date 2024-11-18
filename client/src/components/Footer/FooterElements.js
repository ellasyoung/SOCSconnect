import styled from "styled-components"; 

export const FooterCont = styled.div`
    background-color: #000000; 
    display: flex;
    height: 200px;
    color: white;
    
    padding: 50px;
    justify-content: space-between;
    align-items: flex-start;
    font-family: Arial, sans-serif;

    @media screen and (max-width: 900px){
        justify-content: space-between; 
        padding: 20px;
        flex-direction: column; 
        align-items: center; 
        height: auto;
    }
    `

export const FooterLogo = styled.img `
    width: 125x; 
    height: 125px;
    margin-right: 100px;

    @media screen and (max-width: 900px){
        display: none;
    }
    `

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 900px){
        align-items: center;
    }

`
export const LinksSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 50px;

    @media screen and (max-width: 768px){
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

    @media screen and (max-width: 768px){
        width: 100%;
        align-items: center; 
        text-align: center;
        margin-bottom: 30px;

        &:first-child{
            margin-left: 0px;
        }
    }
`
