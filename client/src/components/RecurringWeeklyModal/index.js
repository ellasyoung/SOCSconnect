import React, { useState } from 'react';
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

const RecurringWeeklyModal = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation for day of the week
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

        if (startDate.toDateString() === endDate.toDateString()) {
            alert('The start date and end date cannot be the same day for a weekly recurring meeting. Please choose different dates.');
            return;
        }

        console.log('Form submitted:', formData);
        
        // Clear the form by resetting the state
        setFormData({
            startDate: '',
            endDate: '',
            dayOfWeek: '',
            attendees: '',
            startTime: '',
            endTime: '',
            title: ''
        });
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
                                <Label>Start Date:</Label>
                                <Input 
                                    type="date" 
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>End Date:</Label>
                                <Input 
                                    type="date" 
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormContainer>
                        
                        <FormContainer>
                            <FormGroup>
                                <Label>Day of the Week:</Label>
                                <Input 
                                    type="text" 
                                    id="dayOfWeek"
                                    name="dayOfWeek"
                                    placeholder="Monday"
                                    value={formData.dayOfWeek}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Attendees Allowed:</Label>
                                <Input 
                                    type="number" 
                                    min="1"
                                    id="attendees"
                                    name="attendees"
                                    value={formData.attendees}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormContainer>

                        
                        <FormContainer>

                        <FormGroup>
                            <Label>Start Time:</Label>
                            <Input 
                                    type="time" 
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                        </FormGroup>

                        <FormGroup>
                            <Label>End Time:</Label>
                            <Input 
                                    type="time" 
                                    id="endTime"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    required
                                />
                        </FormGroup>
                        </FormContainer>

                        

                        <TitleContainer>
                            <Title>Title: </Title>
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
