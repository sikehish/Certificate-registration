import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, Typography, Container, Box, Avatar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAT40Ds2iJYrwMpB9LvZAhrFu0pylUIPQ",
  authDomain: "certificate-registration.firebaseapp.com",
  databaseURL: "https://certificate-registration-default-rtdb.firebaseio.com",
  projectId: "certificate-registration",
  storageBucket: "certificate-registration.appspot.com",
  messagingSenderId: "417408201765",
  appId: "1:417408201765:web:2d8150e290580e7e137bcc"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

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


  const storeUserDataInFirestore = async (userId, formData) => {
    // Store user-related data in Firestore
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      email: formData.email,
      usn: formData.usn,
      password: formData.password,
      confirmPassword: formData.confirmPassword
      // Add other fields as needed
    });
  };

  const handleRegistration = async (e) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Use Firebase Authentication to register the user
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        // User has been successfully registered
        const user = userCredential.user;
        toast.success("Successfully registered");

         //reset input field

        setFormData({
          email: '',
          usn: '',
          password: '',
          confirmPassword: '',
        })

        // Store user-related data in Firestore if needed
        await storeUserDataInFirestore(user.uid, formData);
      } catch (error) {
        console.error('Error registering the user:', error);
        toast.error("Registration failed ,Invalid Email or Email already exist");
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: "auto" }}>
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
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="usn"
                  label="USN"
                  fullWidth
                  value={formData.usn}
                  onChange={handleInputChange}
                  required
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
                  required
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
                  required
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
