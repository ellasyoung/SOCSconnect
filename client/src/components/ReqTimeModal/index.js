import React, { useState, useContext } from 'react';
import { Bckgrnd, OuterModal, InnerModal, Title, FormRow, Button, Form, Label, Input, FormGroup, TitleContainer, TitleInput, Title2,
    ConfirmationModal, Dim, CloseButton, ModalText, ModalTitle, Line,
} from "./ReqTimeElements";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReqTimeModal = () => {

    const { email } = useContext(AuthContext); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [recInfo, setRecInfo] = useState({
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleFetchUserInfo = async () => {
        try {
            const data = await getUserInfo(formData.recEmail);
            setRecInfo(data);
            setError(null); 
        } catch (err) {
            setError(err.message);
            console.log(error);
            setRecInfo(null); 
        }
    };

    const getUserInfo = async (email) => {
        try {
            const response = await fetch(`${backendUrl}/api/user-info?email=${encodeURIComponent(email)}`);
    
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
    
            const data = await response.json();
            console.log('User Info:', data);
            return data; 
        } catch (error) {
            console.error('Error fetching user info:', error.message);
            throw error;
        }
    };

    const [confirmationDetails, setConfirmationDetails] = useState({
        recEmail: '',
        startTime: '',
        startPeriod: '', 
        endTime: '',
        endPeriod: '', 
        date: '',
        title: ''
    });

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

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
    
            const response = await axios.post(`${backendUrl}/api/alternate-request`, data);
            console.log("Request submitted successfully:", response.data);

            setConfirmationDetails(formData);
            handleFetchUserInfo();
    
            setFormData({
                recEmail: '',
                startTime: '',
                endTime: '',
                date: '',
                title: ''
            });
            toggleConfirmation();
            //alert("Meeting request submitted successfully!");
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
            {isConfirmed && (
            <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Request Sent!</ModalTitle>
                <ModalText>                
                    {`Your request to meet with ${recInfo.firstName} ${recInfo.lastName} on ${confirmationDetails.date} from
                     ${new Date(`1970-01-01T${confirmationDetails.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                     ${new Date(`1970-01-01T${confirmationDetails.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} has been 
                     successfully sent. You can see the request's status under My Appointments.`}
                </ModalText>
                <Line>
                    
                </Line>
                <Button className='seeApts' as={Link} to="/my-appointments">See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/></Button>
                </ConfirmationModal>
            </Dim>
            )}
        </Bckgrnd>
    );
};

export default ReqTimeModal;