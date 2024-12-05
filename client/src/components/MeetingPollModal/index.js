import React, { useState, useContext } from 'react';
import { 
    Bckgrnd,  
    InnerModal, 
    UpperModal,
    ModalContainer,
    Text,
    Form,
    TitleCont,
    Title,
    TitleInput,
    ColCont,
    Center,
    Col,
    Button,
    Dropdown,
    DropTitle,
    Time,
    Trash,
    DropRow,
    Edit,
    Dim,
    ConfirmationModal,
    ModalLink,
    ModalTitle,
    CloseButton,
    Line,
    FormGroup,
    Label,
    SendIcon,
} from './PollElements';
import { AuthContext } from '../../auth/AuthProvider';
import { FaPlusSquare } from "react-icons/fa";
import PollPopUp from '../PollPopUp';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const formatTime = (time) => {
    const [hour, minute] = time.split(':').map(Number); 
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; 
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`; 
};


const MeetingPollModal = () => {

    const { email } = useContext(AuthContext); 
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [url, setURL] = useState('');
    const [pollOptions, setPollOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [addDate, setAddDate] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const toggleAddDate = (e) => {
        setAddDate(!addDate);
    };

    const toggleDropdown = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

    const handleAddDate = (pollOption) => {
        console.log("Received Poll Option: ", pollOption); 
        if (pollOption) {
            setPollOptions([...pollOptions, pollOption]);
        }
        toggleAddDate();
    };

    const handleDeleteDate = (index) => {
        const updatedOptions = pollOptions.filter((_, i) => i !== index); 
        setPollOptions(updatedOptions);
    };    

    const handleEditDate = (updatedOption) => {
        const updatedOptions = [...pollOptions];
        if (editIndex !== null) {
            updatedOptions[editIndex] = updatedOption;
        }
        setPollOptions(updatedOptions);
        setEditIndex(null);
        toggleAddDate();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pollData = {
            title,
            pollOption: pollOptions,
            hostEmail: email
        };

        console.log(pollData);

        try {
            const response = await fetch('http://localhost:5001/api/new-poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            });
            const result = await response.json();
            setURL(result.url);
            toggleConfirmation();
            setPollOptions([]);
            setTitle('');
            //console.log('Poll created:', result);
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <Bckgrnd>
            <ModalContainer>
                <UpperModal>
                    <Text>Meeting Poll</Text>
                </UpperModal>
                <InnerModal>
                    <Form onSubmit={handleSubmit}>
                        <TitleCont>
                            <Title>Title:</Title>
                            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
                        </TitleCont>
                        <ColCont>
                            <Col>
                                {pollOptions && pollOptions.map((option, index) => (
                                <DropRow>
                                <Dropdown key={index}>
                                    <DropTitle onClick={() => toggleDropdown(index)}>
                                        {option.date}
                                        {expanded === index ?  <FaAngleUp style={{ marginRight: "10px"}} /> : <FaAngleDown style={{ marginRight: "10px"}}/>}
                                    </DropTitle>
                                    {expanded === index && (
                                        <div style={{ marginLeft: "20px", marginBottom: "-10px" }}>
                                            {option.timeOptions.map((time, i) => (
                                                <Time key={i}>
                                                    {formatTime(time.startTime)} - {formatTime(time.endTime)}
                                                </Time>
                                            ))}
                                        </div>
                                    )}
                                </Dropdown>
                                <div style={{display: "flex", marginLeft: "10px"}}>
                                    <Trash onClick={() => handleDeleteDate(index)} />
                                    <Edit onClick={() => {
                                        setEditIndex(index); 
                                        toggleAddDate(); 
                                    }} />
                                </div>
                                </DropRow>
                                ))}
                                <Button type="button" onClick={toggleAddDate}>Add New Date
                                    <FaPlusSquare/>
                                </Button>
                            </Col>
                            <Center/>
                            <Col>
                                <Button type="submit">Create Meeting Poll</Button>
                            </Col>
                        </ColCont>
                    </Form>
                </InnerModal>
            </ModalContainer>
            {addDate && (
                <PollPopUp 
                    toggleAddDate={toggleAddDate} 
                    onAddDate={editIndex === null ? handleAddDate : handleEditDate} 
                    initialData={editIndex !== null ? pollOptions[editIndex] : null} 
                />
            )}
            {isConfirmed && (
                <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Poll Created!</ModalTitle>
                <Line>
                    <FormGroup className='conf'>
                        <Label className='label'>Booking Link: </Label>
                        <ModalLink href={`http://localhost:3000/${url}`} target='_blank'>                
                            {`http://localhost:3000/${url}`}
                        </ModalLink>
                    </FormGroup>
                    <SendIcon link={`http://localhost:3000/${url}`}/>
                </Line>
                </ConfirmationModal>
            </Dim>
            )}
        </Bckgrnd>
    );
};

export default MeetingPollModal;
