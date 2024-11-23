import React, { useState } from "react";
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
                                            right:"10px", 
                                            top:"50%", 
                                            transform:"translateY(-50%)", 
                                            cursor:"pointer",
                                            transition: "color 03.s ease"
                                            
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#620707")}
                                        onMouseLeave={(e) => (e.target.style.color = "#cd2222")}
                                        aria-label="Search"
                                        >
                                
                                        <FaSearch size={20} color="#cd2222" />        
                                
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