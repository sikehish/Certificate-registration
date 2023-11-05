import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import RegistrationForm from './RegistrationForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Change the primary color
    },
    background: {
      default: '#FFEEF4'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationForm />
    </ThemeProvider>
  );
}

export default App;
