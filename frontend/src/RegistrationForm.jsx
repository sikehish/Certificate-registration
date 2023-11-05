import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Alert, AlertTitle } from '@mui/material/Alert';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    usn: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = () => {
    setError(null);

    // Check if email or USN exists
    const data = require('./data.json');
    const { email, usn } = formData;
    if (data.registrations.find((reg) => reg.email === email || reg.usn === usn)) {
      setError('Email or USN already exists.');
      return;
    }

    // Check if password matches confirmPassword
    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    // Save the registration data to the JSON file
    data.registrations.push(formData);
    // Save the updated data back to the JSON file

    Toastify({
      text: 'Successfully registered',
      duration: 3000,
      backgroundColor: 'green',
    }).showToast();

    setFormData({
      email: '',
      usn: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container maxWidth="sm">
      <h1>GDSC JSS STU Certificate Registration</h1>
      <Box mt={3}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </Box>
      <Box mt={2}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleFormChange}
        />
      </Box>
      <Box mt={2}>
        <TextField
          name="usn"
          label="USN"
          variant="outlined"
          fullWidth
          value={formData.usn}
          onChange={handleFormChange}
        />
      </Box>
      <Box mt={2}>
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleFormChange}
        />
      </Box>
      <Box mt={2}>
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleFormChange}
        />
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegistration}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
