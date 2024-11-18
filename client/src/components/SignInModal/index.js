import React from 'react';
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Form submitted:');
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