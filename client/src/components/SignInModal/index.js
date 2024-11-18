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
} from './SignInModalElements';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const SignInModal = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

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
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <div style={{ position: 'relative', width: 'fit-content' }}>
                                <Input
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingRight: '40px' }} // Add space for the icon
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
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default SignInModal;
