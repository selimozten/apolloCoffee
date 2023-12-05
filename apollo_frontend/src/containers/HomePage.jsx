// src/containers/HomePage.jsx
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Apollo Coffee
      </Typography>
      <Typography variant="h6">
        The best coffee in town delivered right to your door.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/account')}>
        Login/Register
      </Button>
    </Container>
  );
};

export default HomePage;
