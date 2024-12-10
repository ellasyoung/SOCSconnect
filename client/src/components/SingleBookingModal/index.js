import React, { useState, useContext } from 'react';
import { 
    Bckgrnd,  
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
    SendIcon,
} from '../RecurringWeeklyModal/RecurringWeeklyModalElements';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecurringWeeklyModal = () => {

    const { email } = useContext(AuthContext); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [url, setURL] = useState('');
    const [confirmationDetails, setConfirmationDetails] = useState({
        date: '',
        attendees: '',
        startTime: '',
        endTime: '',
        title: '',
        location: '',
        notes: ''
    });

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

    const [formData, setFormData] = useState({
        date: '',
        attendees: '',
        startTime: '',
        endTime: '',
        title: '',
        location: '',
        notes: ''
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

        if (formData.startTime >= formData.endTime) {
            alert('Start time must be earlier than end time!');
            return; 
        }

        const now = new Date();
    
        const startDate = new Date(formData.startDate);
        const [startHours, startMinutes] = formData.startTime.split(':').map(num => parseInt(num, 10));
        startDate.setHours(startHours, startMinutes, 0, 0);
        startDate.setDate(startDate.getDate() + 1);
    
        if (startDate < now) {
            alert('The date and time cannot be in the past. Please select a future date and time.');
            return;
        }

        try {
            const requestData = {
                hostEmail: email,
                title: formData.title,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                maxNumParticipants: formData.attendees,
                location: formData.location,
                notes: formData.notes
            };

            setConfirmationDetails(formData);

            const response = await axios.post(`${backendUrl}/api/new-single-meeting`, requestData);
            console.log('Meeting created successfully:', response.data);
            setURL(response.data.url);
            

            setFormData({
                hostEmail: '',
                date: '',
                attendees: '',
                startTime: '',
                endTime: '',
                title: '',
                location: '',
                notes: ''
            });
            toggleConfirmation();
        } catch (error) {
            console.error('Error creating weekly meeting:', error.response?.data || error.message);
            alert('There was an error creating the meeting. Please try again.');
        }
    };

    

    return (
        <Bckgrnd>
            <ModalContainer>
                <UpperModal>
                    <Text>Single Meeting</Text>
                </UpperModal>
                <InnerModal>
                    <Form onSubmit={handleSubmit}>
                        <FormContainer>
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
                        
                        </FormContainer>

                        <FormContainer>
                            <FormGroup>
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    style={{fontFamily: 'Arial, sans-serif'}}
                                    placeholder="Optional"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Additional Notes</Label>
                                <Input
                                    type="text"
                                    name="notes"
                                    id="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    style={{fontFamily: 'Arial, sans-serif'}}
                                    placeholder="Optional"
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
                        
                        <Button style={{marginLeft: 'auto'}}type="submit">Create Meeting</Button>
                    </Form>
                </InnerModal>
            </ModalContainer>
            {isConfirmed && (
            <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Meeting Created!</ModalTitle>
                <ModalText>                
                    {`This meeting will occur on  ${confirmationDetails.date} from ${new Date(`1970-01-01T${confirmationDetails.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(`1970-01-01T${confirmationDetails.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.`}
                </ModalText>

                <Line>
                    <FormGroup className='conf'>
                        <Label className='label'>Booking Link: </Label>
                        <ModalLink href={`${frontendUrl}/${url}`} target='_blank'>                
                            {`${url}`}
                        </ModalLink>
                    </FormGroup>
                    <SendIcon link={`${frontendUrl}/${url}`}/>
                </Line>
                <Button className='seeApts' as={Link} to="/my-appointments">See Your Appointments <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/></Button>
                </ConfirmationModal>
            </Dim>
            )}
        </Bckgrnd>
    );
};

export default RecurringWeeklyModal;
