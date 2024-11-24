import React, { useState } from 'react';
import { Bckgrnd, OuterModal, InnerModal, Button, Form, Label, Input, FormGroup } from "./ReqTimeElements"

const ReqTimeModal = () => {

    const [formData, setFormData] = useState({
        recEmail: '',
        startTime: '',
        startPeriod: '', 
        endTime: '',
        endPeriod: '', 
        date: '',
        title: ''
    });


    return(
        <Bckgrnd>
            <OuterModal>
                <InnerModal>
                    
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default ReqTimeModal;