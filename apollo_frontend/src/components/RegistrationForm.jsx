// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure ToastContainer is used once in a higher level component like App.js
import Box from '@mui/material/Box'; // Import Box from MUI

const RegistrationForm = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUser({ ...user, email: email });
  };

  const handleEmailBlur = () => {
    if (!validateEmail(user.email)) {
      toast.warn('Please enter a valid email address.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(user.email)) {
      toast.warn('Please enter a valid email address before submitting.', {
        position: "top-center",
        // ...other toast options
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/register', user);
      console.log(response.data);
      toast.success('Registration successful :)', {
        position: "top-center",
        // ...other toast options
      });
    } catch (error) {
      console.error('Error registering user', error);
      toast.warn('Error registering user!', {
        position: "top-center",
        // ...other toast options
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stacks the children vertically
        alignItems: 'center', // Centers the children horizontally
        '& > *': {
          width: '100%', // Full width for children
          marginBottom: '10px', // Spacing between each field
        },
      }}
      noValidate
      autoComplete="off"
    >
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={user.email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </Box>
  );
};

export default RegistrationForm;
