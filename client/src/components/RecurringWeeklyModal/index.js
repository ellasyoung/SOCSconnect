//Natalie Doehla
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
} from './RecurringWeeklyModalElements';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecurringWeeklyModal = () => {

    const { email } = useContext(AuthContext); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [url, setURL] = useState('');
    const [confirmationDetails, setConfirmationDetails] = useState({
        startDate: '',
        endDate: '',
        dayOfWeek: '',
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
        startDate: '',
        endDate: '',
        dayOfWeek: '',
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

        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayOfWeek = formData.dayOfWeek;

        if (!validDays.includes(dayOfWeek)) {
            alert('Please enter a valid day of the week (e.g., Monday, Tuesday, etc.)');
            return;
        }

        const now = new Date();
    
        const startDate = new Date(formData.startDate);
        const [startHours, startMinutes] = formData.startTime.split(':').map(num => parseInt(num, 10));
        startDate.setHours(startHours, startMinutes, 0, 0);
        startDate.setDate(startDate.getDate()+1);    
        if (startDate < now) {
            alert('The start date and time cannot be in the past. Please select a future date and time.');
            return;
        }
        const endDate = new Date(formData.endDate);
        const [endHours, endMinutes] = formData.endTime.split(':').map(num => parseInt(num, 10));
        endDate.setDate(endDate.getDate()+1);
        endDate.setHours(endHours, endMinutes, 0, 0);

        if (startDate > endDate) {
            alert('The end date cannot be earlier than the start date. Please correct it.');
            return;
        }

        if (formData.startTime >= formData.endTime) {
            alert('The meeting cannot start later than it is supposed to end.');
            return;
        }

        try {
            const requestData = {
                hostEmail: email,
                title: formData.title,
                dayOfWeek: formData.dayOfWeek,
                startDate: formData.startDate,
                endDate: formData.endDate,
                startTime: formData.startTime,
                endTime: formData.endTime,
                maxNumParticipants: formData.attendees,
                location: formData.location,
                notes: formData.notes
            };

            setConfirmationDetails(formData);

            const response = await axios.post(`${backendUrl}/api/new-weekly-meeting`, requestData);
            //console.log('Meeting created successfully:', response.data);
            setURL(response.data.url);
            //alert('Recurring weekly meeting created successfully!');

            setFormData({
                hostEmail: '',
                startDate: '',
                endDate: '',
                dayOfWeek: '',
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
                    <Text>Recurring Weekly Meeting</Text>
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
                            <FormGroup>
                                <Label>Day of the Week</Label>
                                <Input 
                                    type="text" 
                                    id="dayOfWeek"
                                    name="dayOfWeek"
                                    placeholder="Monday"
                                    value={formData.dayOfWeek}
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                        </FormContainer>
                        
                        <FormContainer>
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
                                id="location"
                                name="location"
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
                                id="notes"
                                name="notes"
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
                        
                        <Button type="submit">Create Weekly Meeting</Button>
                    </Form>
                </InnerModal>
            </ModalContainer>
            {isConfirmed && (
            <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Meeting Created!</ModalTitle>
                <ModalText>                
                    {`This meeting will occur on  ${confirmationDetails.dayOfWeek} of each week at ${new Date(`1970-01-01T${confirmationDetails.startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(`1970-01-01T${confirmationDetails.endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} from ${confirmationDetails.startDate} until ${confirmationDetails.endDate}.`}
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
