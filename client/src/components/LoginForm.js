// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';


import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const [loginUser, {error}] = useMutation(LOGIN_USER);






  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {

      const { data } = await loginUser({
        variables: {...userFormData}
      });

      console.log(data)

    //   {
    //     login: {
    //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiamFuZWRvZSIsImVtYWlsIjoiamFuZWRvZUBnbWFpbC5jb20iLCJfaWQiOiI2MTkwODMzNjU5NDM4OTJlMDlkYjE3OWMifSwiaWF0IjoxNjM2ODYxNjY1LCJleHAiOjE2MzY4Njg4NjV9.yRK1kGNvc75SsUfxQiIm6bpBEYGYJ3WY7bM3otKYhjo',
    // [0]   user: {
    // [0]     _id: 619083365943892e09db179c,
    // [0]     username: 'janedoe',
    // [0]     email: 'janedoe@gmail.com',
    // [0]     password: '$2b$10$CFsVvKXLZk1zFE.yuGYumO8qcXGxbu4jfClBCyqU5oEvG8Hv2EXpC',
    // [0]     savedBooks: [],
    // [0]     __v: 0
    // [0]   }
    //     }
    //   }
      Auth.login(data.login.token);
      // console.log(anything)





      // const response = await loginUser(userFormData);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const { token, user } = await response.json();
      // console.log(user);
      // Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
