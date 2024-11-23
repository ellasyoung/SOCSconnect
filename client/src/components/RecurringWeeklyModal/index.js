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
        console.log('Form submitted:', formData);
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
                                    min="0"
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
