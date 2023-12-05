// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Ensure you have this context set up
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'; // Import Box from MUI

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/login', credentials);
            console.log('Login response:', response.data); // Debug log
            // The backend response should now include an is_admin flag
            login({ ...response.data, isAdmin: response.data.is_admin });

            // Redirect the user based on the is_admin flag
            if (response.data.is_admin) {
                navigate('/admin');
            } else {
                navigate('/order');
            }
        } catch (error) {
            console.log('Login error:', error.response || error); // Debug log
            setError('Invalid credentials');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // This aligns items horizontally in the center
                width: '100%', // Ensures the Box takes the full width
                '& > *': { // Applies styles to all direct children
                    width: '80%', // Ensures full width for children, like input fields
                    margin: '10px', // Adds vertical margin
                },
            }}
            noValidate
            autoComplete="off"
        >
            <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Email"
                style={{ padding: '10px' }}
            />
            <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Password"
                style={{ padding: '10px' }}
            />
            {error && <p style={{ color: 'red', width: '100%' }}>{error}</p>}
            <button type="submit" style={{ padding: '10px' }}>Login</button>
        </Box>
    );
};

export default LoginForm;
