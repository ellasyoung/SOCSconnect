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

const SignInModal = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
    // Handle sign-in logic here
    console.log('Form submitted:', formData);
    };


  return(
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
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </FormGroup>
                <Button type="submit">Sign In</Button>
            </Form>
        </InnerModal>
      </OuterModal>
    </Bckgrnd>
  );
};

export default SignInModal;