//Natalie Doehla
import React, { useState, useContext } from 'react';
import { 
    Bckgrnd,  
    Select,
    ModalContainer,
    InnerModal,
    UpperModal
} from './RecurringMonthlyModalElements';

import {
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
        dayOfWeek: '',
        weekOfMonth: '',
        dayOfMonth: '',
        location: '',
        notes: ''
    });

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

    const [url, setURL] = useState('');

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
        dayOfWeek: '',
        location: '',
        notes: ''
    });

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };
    
    const isValidDayOfMonth = (dayOfMonth, startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let currentDate = new Date(start);
        while (currentDate <= end) {
            const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
            if (dayOfMonth > daysInMonth) {
                return false; 
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return true; 
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

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
    
    
        if (formData.repeatOn === 'date' && formData.dayOfMonth) {
            const dayOfMonth = parseInt(formData.dayOfMonth, 10);
            const startDate = formData.startDate;
            const endDate = formData.endDate;
    
            if (!isValidDayOfMonth(dayOfMonth, startDate, endDate)) {
                alert('The selected day does not exist in one or more months between the start and end dates.');
                return;
            }
        }
    
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
                title: formData.title,
                hostEmail: email,
                schedule: {
                    day: formData.dayOfWeek,
                    week: formData.weekOfMonth,
                    date: formData.dayOfMonth,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                },
                maxNumParticipants: formData.attendees || 1,
                location: formData.location,
                notes: formData.notes
            };
    
            const response = await axios.post(`${backendUrl}/api/monthly-meeting`, requestData);
    
            if (response.status === 201) {
                setConfirmationDetails(formData);
                setIsConfirmed(true);
                setURL(response.data.url);
    
                setFormData({
                    startDate: '',
                    endDate: '',
                    repeatOn: '',
                    attendees: '',
                    startTime: '',
                    endTime: '',
                    title: '',
                    dayOfWeek: '',
                    weekOfMonth: '',
                    dayOfMonth: '',
                    location: '',
                    notes: ''
                });
            }
        } catch (error) {
            console.error('Error creating meeting:', error.response?.data || error.message);
            alert('Failed to create the meeting. Please try again.');
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
                                <Label>Repeat On </Label>
                                <Select 
                                    id="repeatOn"
                                    name="repeatOn"
                                    value={formData.repeatOn}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled selected>Select option...</option>
                                    <option value="date">Specific Date</option>
                                    <option value="day">Day of the Week</option>
                                </Select>
                            </FormGroup>

                            {formData.repeatOn === 'day' && (
                                <>
                                    <FormGroup>
                                        <Label>Day of the Week</Label>
                                        <Select 
                                            id="dayOfWeek"
                                            name="dayOfWeek"
                                            value={formData.dayOfWeek}
                                            onChange={handleChange}
                                            required={formData.repeatOn === 'day'}
                                        >
                                            <option value="" disabled selected>Select day...</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Week of the Month</Label>
                                        <Select 
                                            id="weekOfMonth"
                                            name="weekOfMonth"
                                            value={formData.weekOfMonth}
                                            onChange={handleChange}
                                            required={formData.repeatOn === 'day'}
                                        >
                                            <option value="" disabled selected>Select week...</option>
                                            <option value="first">First {formData.dayOfWeek} of each month</option>
                                            <option value="second">Second {formData.dayOfWeek} of each month</option>
                                            <option value="third">Third {formData.dayOfWeek} of each month</option>
                                            <option value="fourth">Fourth {formData.dayOfWeek} of each month</option>
                                            <option value="last">Last {formData.dayOfWeek} of each month</option>
                                        </Select>
                                    </FormGroup>
                                </>
                                
                        )}
                        {formData.repeatOn === 'date' && (
                         <FormGroup>
                         <Label>Day of the Month</Label>
                         <Select 
                             id="dayOfMonth"
                             name="dayOfMonth"
                             value={formData.dayOfMonth}
                             onChange={handleChange}
                             required={formData.repeatOn === 'date'}
                         >
                             <option value="" disabled selected>Select day...</option>
                             {Array.from({ length: 31 }, (_, i) => (
                                 <option key={i + 1} value={i + 1}>
                                     {i + 1}
                                 </option>
                             ))}
                         </Select>
                     </FormGroup>
                        )}
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
                    `This meeting will occur on the ${confirmationDetails.dayOfMonth} of each month at 
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

export default RecurringMonthlyModal;
