// src/containers/CustomerAccountPage.jsx
import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    // Customize your theme here
});

const CustomerAccountPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={6} style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                    <Typography component="h1" variant="h5">
                        LOG IN
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
                        <Button
                            variant="outlined"
                            onClick={() => setShowLogin(!showLogin)}
                            style={{ margin: '20px' }}
                        >
                            {showLogin ? 'Need to register?' : 'Already registered?'}
                        </Button>
                        {showLogin ? <LoginForm /> : <RegistrationForm />}
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default CustomerAccountPage;
