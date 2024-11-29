import React, { useState, useContext } from 'react';
import { Bckgrnd, OuterModal, InnerModal, Title, FormRow, Button, Form, Label, Input, FormGroup, TitleContainer, TitleInput, Title2 } from "./ReqTimeElements";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 

const ReqTimeModal = () => {

    const { email } = useContext(AuthContext); 

    const [formData, setFormData] = useState({
        recEmail: '',
        startTime: '',
        startPeriod: '', 
        endTime: '',
        endPeriod: '', 
        date: '',
        title: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const emailRegex = /@(mail\.mcgill\.ca|mcgill\.ca)$/;
        if (!emailRegex.test(formData.recEmail)) {
            alert("Please enter a valid McGill email ending with @mail.mcgill.ca or @mcgill.ca.");
            return;
        }
    
        try {
            const data = {
                requesterEmail: email,
                hostEmail: formData.recEmail,
                alternateTimes: [
                    {
                        proposedDate: formData.date,
                        proposedStartTime: formData.startTime,
                        proposedEndTime: formData.endTime,
                    }
                ],
                requestStatus: 'Pending',
            };
    
            const response = await axios.post("http://localhost:5001/api/alternate-request", data);
            console.log("Request submitted successfully:", response.data);
    
            setFormData({
                recEmail: '',
                startTime: '',
                endTime: '',
                date: '',
                title: ''
            });
    
            alert("Meeting request submitted successfully!");
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("There was an error submitting your request. Please try again.");
        }
    };
    

    return(
        <Bckgrnd>
            <OuterModal>
                <InnerModal>
                    <Title>Request Meeting Time</Title>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Recipient Email</Label>
                            <Input 
                                type="text"  
                                id="recEmail"
                                name="recEmail"
                                placeholder="first.last@mcgill.ca"
                                value={formData.recEmail}
                                onChange={handleChange}
                                required>
                            </Input>
                        </FormGroup>

                        <FormRow>
                        <FormGroup>
                            <Label>Start Time</Label>
                            <Input 
                                    type="time" 
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label>End Time</Label>
                            <Input 
                                    type="time" 
                                    id="endTime"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                        </FormGroup>
                        </FormRow>
                        <FormGroup>
                            <Label>Date</Label>
                            <Input 
                                type="date" 
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                style={{ fontFamily: 'Arial, sans-serif' }}
                                required
                            />
                        </FormGroup>
                        <TitleContainer>
                            <Title2>Title:</Title2>
                            <TitleInput 
                                type="text"  
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </TitleContainer>
                        <Button type="submit">Send Request</Button>
                    </Form>
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default ReqTimeModal;