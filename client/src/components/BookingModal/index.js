import React, { useState, useEffect } from "react";
import {
    Bckgrnd,
    OuterModal,  
    InnerModal, 
    Title, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
} from './BookingModalElements';

import { FaSearch } from 'react-icons/fa'; 



const BookingModal = () => {
    const [url, setUrl] = useState("");
    const [searchIconSize, setSearchIconSize] = useState(20);

    useEffect(()=>{
        const handleResize = () => {
        if(window.innerWidth < 720){
            setSearchIconSize(15);
        }else if(window.innerWidth < 550){
            setSearchIconSize(0.25);
        }else{
            setSearchIconSize(20);
        }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

    //to handle search icon click 
    const handleSearchClick = () => {
        if(url.trim()) {
            window.open(url);
        }
    };

    return (
        <Bckgrnd>
            <OuterModal>
                <InnerModal>
                    <Title>Book an Appointment</Title>
                    <Form>
                        <FormGroup>
                            <Label>
                                <Input
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.socsconnect.com/"/>

                                    
                                    {/*Search Icon*/}
                                    <button
                                        onClick={handleSearchClick}
                                        style={{
                                            background:"transparent", 
                                            border:"none", 
                                            position:"absolute",
                                            right:"7px", 
                                            top:"50%", 
                                            transform:"translateY(-50%)", 
                                            cursor:"pointer",
                                            transition: "color 03.s ease"
                                            
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#620707")}
                                        onMouseLeave={(e) => (e.target.style.color = "#cd2222")}
                                        aria-label="Search"
                                        >
                                
                                        <FaSearch size={searchIconSize} color="#cd2222" />        
                                
                                    </button>

                            </Label>
                        </FormGroup>
                    </Form>
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default BookingModal;