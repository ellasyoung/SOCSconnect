//Ella Young
import React, { useState } from 'react';
import { 
    Bckgrnd, 
    OuterModal, 
    InnerModal, 
    Title, 
    Form,
    FormGroup,
    Label,
    Input,
    Button, 
    Text,
    Col,
    PwdCont,
    ConfirmationModal, 
    CloseButton,
    ModalText,
    ModalTitle,
    Dim,
} from './RegisterModalElements';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegisterModal = () => {

    const [isConfirmed, setIsConfirmed] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
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
        const emailRegex = /@(mail\.mcgill\.ca|mcgill\.ca)$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid McGill email ending with @mail.mcgill.ca or @mcgill.ca.");
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toggleConfirmation();
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Bckgrnd> 
            <OuterModal>
                <InnerModal>
                    <Title>Register</Title>
                    <Form onSubmit={handleSubmit}>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="firstname"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="lastname"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="email">McGill Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="first.last@mcgill.ca"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup style={{width: '100%' }}>
                                <Label htmlFor="password">Password</Label>
                                <PwdCont>
                                    <Input
                                        type={showPassword ? "text" : "password"} 
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{ paddingRight: '40px' }}
                                        required
                                    />
                                    <span 
                                        onClick={togglePasswordVisibility} 
                                        style={{
                                            position: 'absolute',
                                            top: '55%',
                                            right: '15px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: '#cd2222',
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </span>
                                </PwdCont>
                            </FormGroup>
                            <Button type="submit">Register</Button>
                            <Text>Already have an account? Sign in <a style={{color: '#cd2222'}} href="/sign-in">here</a></Text>
                        </Col>
                    </Form>
                </InnerModal>
            </OuterModal>
            {isConfirmed && (
            <Dim>
                <ConfirmationModal>
                <CloseButton onClick={toggleConfirmation} />
                <ModalTitle>Registration Successful!</ModalTitle>
                <ModalText>                
                    {`You have registered with SOCSconnect.`}
                </ModalText>
                <Button className='seeApts' as={Link} to="/sign-in">Sign In Now <FaAngleRight size="1em" style={{ marginLeft: "8px" }}/></Button>
                </ConfirmationModal>
            </Dim>
            )}
        </Bckgrnd>
    );
};

export default RegisterModal;