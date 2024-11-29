import React, { useState, useContext } from 'react';
import { 
    Bckgrnd,  
    Select
} from './RecurringMonthlyModalElements';

import {
    InnerModal, 
    UpperModal,
    ModalContainer,
    Title, 
    Form,
    FormGroup,
    Label,
    Input,
    Button, 
    Text,
    TitleInput,
    FormContainer,
    TitleContainer,
    Dim,
    ConfirmationModal,
    CloseButton,
    ModalTitle,
    ModalText,
    ModalLink,
    Line,
    SendIcon
} from '../RecurringWeeklyModal/RecurringWeeklyModalElements';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecurringMonthlyModal = () => {

    const { email } = useContext(AuthContext); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [confirmationDetails, setConfirmationDetails] = useState({
        startDate: '',
        endDate: '',
        repeatOn: '',
        attendees: '',
        startTime: '',
        endTime: '',
        title: '',
        dayOfWeek: ''
    });

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        repeatOn: '',
        attendees: '',
        startTime: '',
        endTime: '',
        title: '',
        dayOfWeek: ''
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

        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Only validate dayOfWeek if repeatOn is 'day'
        if (formData.repeatOn === 'day' && !validDays.includes(formData.dayOfWeek)) {
            alert('Please enter a valid day of the week (e.g., Monday, Tuesday, etc.)');
            return;
        }

        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (startDate > endDate) {
            alert('The end date cannot be earlier than the start date. Please correct it.');
            return;
        }

        try {
            const requestData = {
                hostEmail: email,
                title: formData.title,
                repeatOn: formData.repeatOn,
                startDate: formData.startDate,
                endDate: formData.endDate,
                startTime: formData.startTime,
                endTime: formData.endTime,
                maxNumParticipants: formData.attendees,
            };

            if (formData.repeatOn=== 'day') {
                requestData.dayOfWeek = formData.dayOfWeek;
            }

            setConfirmationDetails(formData);
            console.log("Request Data: ", requestData); // Log request data for debugging

            console.log('Success')

            /*const response = await axios.post('http://localhost:5001/api/new-monthly-meeting', requestData);
            console.log('Meeting created successfully:', response.data);*/

            setFormData({
                hostEmail: '',
                startDate: '',
                endDate: '',
                repeatOn: '',
                attendees: '',
                startTime: '',
                endTime: '',
                title: '',
                dayOfWeek: ''
            });
            toggleConfirmation();
        } catch (error) {
            console.error('Error creating monthly meeting:', error.response?.data || error.message);
            alert('There was an error creating the meeting. Please try again.');
        }
    };

    

    return (
        <Bckgrnd>
            <ModalContainer>
                <UpperModal>
                    <Text>Recurring Monthly Meeting</Text>
                </UpperModal>
                <InnerModal>
                    <Form onSubmit={handleSubmit}>
                        <FormContainer>
                            <FormGroup>
                                <Label>Start Date</Label>
                                <Input 
                                    type="date" 
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>End Date</Label>
                                <Input 
                                    type="date" 
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                        </FormContainer>
                        
                        <FormContainer>
                            <FormGroup>
                                <Label>Repeat On </Label>
                                <Select 
                                    id="repeatOn"
                                    name="repeatOn"
                                    value={formData.repeatOn}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled selected>Select an option</option>
                                    <option value="date">Date Selected</option>
                                    <option value="day">Day of the Week</option>
                                </Select>
                            </FormGroup>

                            {formData.repeatOn === 'day' && (
                                <FormGroup>
                                    <Label>Day of the Week</Label>
                                    <Input 
                                        type="text"
                                        id="dayOfWeek"
                                        name="dayOfWeek"
                                        placeholder="Monday"
                                        value={formData.dayOfWeek}
                                        onChange={handleChange}
                                        required={formData.repeatOn === 'day'}
                                    />
                                </FormGroup>
                        )}
                        </FormContainer>

                        
                        <FormContainer>

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

                        <FormGroup>
                                <Label>Attendees Allowed</Label>
                                <Input 
                                    type="number" 
                                    min="1"
                                    id="attendees"
                                    name="attendees"
                                    value={formData.attendees}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                        </FormContainer>

                        <TitleContainer>
                            <Title>Title:</Title>
                            <TitleInput 
                                type="text"  
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </TitleContainer>
                        
                        <Button type="submit">Create Monthly Meeting</Button>
                    </Form>
                </InnerModal>
            </ModalContainer>
            {isConfirmed && (
            <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Meeting Created!</ModalTitle>
                <ModalText>
                    {confirmationDetails.repeatOn === 'date' ? (
                    `This meeting will occur on the ${confirmationDetails.startDate.split('-')[2]} of each month at 
                    ${new Date(`1970-01-01T${confirmationDetails.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} 
                    from ${confirmationDetails.startDate} to ${confirmationDetails.endDate}.`
                    ) : (
                    `This meeting will occur on ${confirmationDetails.dayOfWeek} of each month at 
                    ${new Date(`1970-01-01T${confirmationDetails.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    to ${new Date(`1970-01-01T${confirmationDetails.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    on ${confirmationDetails.startDate} until ${confirmationDetails.endDate}.`
                    )}
                </ModalText>

                <Line>
                    <FormGroup className='conf'>
                        <Label className='label'>Booking Link: </Label>
                        <ModalLink href='https://www.google.com' target='_blank'>                
                            {`https://www.socsconnect.com/wsetdrytfuygiu23456789`}
                        </ModalLink>
                    </FormGroup>
                    <SendIcon link="https://www.socsconnect.com/wsetdrytfuygiu23456789"/>
                </Line>
                <Button className='seeApts' as={Link} to="/my-appointments">See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/></Button>
                </ConfirmationModal>
            </Dim>
            )}
        </Bckgrnd>
    );
};

export default RecurringMonthlyModal;
