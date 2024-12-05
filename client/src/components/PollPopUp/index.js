import React, { useState } from 'react';
import { 
    CloseButton,
    ConfirmationModal,
    Dim,
    Title,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Button,
    Times,
    Trash,
} from './PollPopUpElements';
import { FaPlusSquare } from "react-icons/fa";

const PollPopUp = ({ toggleAddDate, onAddDate, initialData }) => {

    const [date, setDate] = useState(initialData ? initialData.date : '')
    const [timeOptions, setTimeOptions] = useState(initialData ? initialData.timeOptions : [{ startTime: '', endTime: '' }]);

    const addTimeOption = () => {
        setTimeOptions([...timeOptions, { startTime: '', endTime: '' }]);
    };

    const handleTimeChange = (index, field, value) => {
        const updatedOptions = [...timeOptions];
        updatedOptions[index][field] = value;
        setTimeOptions(updatedOptions);
    };

    const deleteTimeOption = (index) => {
        const updatedOptions = timeOptions.filter((_, i) => i !== index); 
        setTimeOptions(updatedOptions);
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        if (!date) {
            alert("Please select a date.");
            return;
        }
    
        if (timeOptions.some((time) => !time.startTime || !time.endTime)) {
            alert("Please fill in all time options or delete the empty ones.");
            return;
        }
    
        if (onAddDate) {
            onAddDate({ date, timeOptions });
        }
        toggleAddDate();
    };
    
    return (
        <Dim>
            <ConfirmationModal>
                <CloseButton onClick={toggleAddDate} />
                <Title>New Date</Title>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="date">
                        <Label>Date</Label>
                        <Input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ fontFamily: 'Arial, sans-serif' }}
                            required
                        />
                    </FormGroup>
                    <Times>
                    {timeOptions.map((time, index) => (
                        <Row key={index}>
                            <FormGroup>
                                <Label>Start Time</Label>
                                <Input 
                                    type="time" 
                                    id={`startTime-${index}`}
                                    name={`startTime-${index}`}
                                    value={time.startTime}
                                    onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>End Time</Label>
                                <Input 
                                    type="time" 
                                    id={`endTime-${index}`}
                                    name={`endTime-${index}`}
                                    value={time.endTime}
                                    onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                    required
                                />
                            </FormGroup>
                            {index > 0 && ( 
                                <Trash onClick={() => deleteTimeOption(index)} />
                            )}
                            {index === 0 && (<div style={{ width: "100px", height: "30px"}}></div>)}
                        </Row>
                    ))}
                    <Button type="button" onClick={addTimeOption} className='add'>
                        Add Meeting Time Option
                        <FaPlusSquare style={{ color:"white" }} />
                    </Button>
                    </Times>
                    <Button type="submit" className='sub'>Add to Poll</Button>
                </Form>
            </ConfirmationModal>
        </Dim>
    );
};

export default PollPopUp;
