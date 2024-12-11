//Natalie Doehla
import React, { useState, useContext } from 'react';
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
} from './SignInModalElements';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider'; 
import { useNavigate } from 'react-router-dom';

const SignInModal = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/login`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const { token, email } = response.data;
    
            if (token && email) {
                console.log("Login successful:", { token, email });
                login(token, email); 
                navigate("/dashboard");
            } else {
                console.error("Invalid response data:", response.data);
                alert("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Bckgrnd> 
            <OuterModal>
                <InnerModal>
                    <Title>Sign In</Title>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="email">McGill Email</Label>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your McGill email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <div style={{ position: 'relative', width: 'fit-content' }}>
                                <Input
                                    type={showPassword ? "text" : "password"} 
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingRight: '40px' }} 
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
                            </div>
                        </FormGroup>
                        <Button type="submit">Sign In</Button>
                    </Form>
                    <Text>No account? Register <a style={{color: '#cd2222'}} href="/register">here</a></Text>
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default SignInModal;
