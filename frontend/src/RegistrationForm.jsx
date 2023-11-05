import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, Typography, Container, Box, Avatar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    usn: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      // Implement your validation and database logic here
      // Display success message if registration is successful
      toast.success("Successfully registered");
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex',flexDirection:"column",  alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin:"auto" }}>
      <Box mt={4} display="flex" alignItems="center" justifyContent="center">
        <Avatar src="/gdsc-logo.png" alt="GDSC Logo" sx={{ width: 100, height: 100 }} />
        <Box ml={2}>
          <Typography variant="h4">GDSC JSSSTU</Typography>
          <Typography variant="h5">Certificate Registration</Typography>
        </Box>
      </Box>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="usn"
                  label="USN"
                  fullWidth
                  value={formData.usn}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleRegistration}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default RegistrationForm;
