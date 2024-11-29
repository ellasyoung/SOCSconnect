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
} from './RecurringWeeklyModalElements';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 

const RecurringWeeklyModal = () => {

    const { email } = useContext(AuthContext); 

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        dayOfWeek: '',
        attendees: '',
        startTime: '',
        endTime: '',
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

        const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayOfWeek = formData.dayOfWeek.toLowerCase();

        if (!validDays.includes(dayOfWeek)) {
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
                dayOfWeek,
                startDate: formData.startDate,
                endDate: formData.endDate,
                startTime: formData.startTime,
                endTime: formData.endTime,
                maxNumParticipants: formData.attendees,
            };

            const response = await axios.post('http://localhost:5001/api/new-weekly-meeting', requestData);

            console.log('Meeting created successfully:', response.data);
            alert('Recurring weekly meeting created successfully!');

            setFormData({
                hostEmail: '',
                startDate: '',
                endDate: '',
                dayOfWeek: '',
                attendees: '',
                startTime: '',
                endTime: '',
                title: '',
            });
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
                        </FormContainer>
                        
                        <FormContainer>
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
        </Bckgrnd>
    );
};

export default RecurringWeeklyModal;
